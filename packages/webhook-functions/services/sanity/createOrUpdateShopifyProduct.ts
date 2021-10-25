import { IdentifiedSanityDocumentStub, Transaction } from '@sanity/client'
import { uuid } from '@sanity/uuid'
import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE
} from '../../constants'
import { sanityClient } from '../../lib/sanity'
import fetchProduct from '../shopify/fetchProduct'
import fetchProductListingStatus from '../shopify/fetchProductListing'
// import fetchProductMetafields from '../shopify/fetchProductMetafields'
import { ShopifyWebhookBody } from './types'

type VariantPriceRange = {
  maxVariantPrice?: number
  minVariantPrice?: number
}

const createOrUpdateDocumentAndDraft = async (
  transaction: Transaction,
  document: IdentifiedSanityDocumentStub
) => {
  // Create document if it doesn't exist, otherwise patch
  transaction.createIfNotExists(document).patch(document._id, patch => patch.set(document))

  // Also check for and patch draft document, if present
  const draftId = `drafts.${document._id}`
  const draft = await sanityClient.getDocument(draftId)
  if (draft) {
    const documentDraft = Object.assign({}, document, {
      _id: draftId
    })

    transaction.patch(draftId, patch => patch.set(documentDraft))
  }
}

const createOrUpdateProduct = async (body: ShopifyWebhookBody) => {
  const {
    created_at,
    handle,
    id,
    images,
    options,
    product_type,
    status,
    tags,
    title,
    updated_at,
    variants
  } = body

  // Fetch this product listing on Shopify Admin API
  // If this returns 404, it means the product is not on our sales channel and can be marked as not enabled
  const shopifyProductListingStatus = await fetchProductListingStatus(id)
  let isEnabled = true
  if (shopifyProductListingStatus !== 200) {
    // TODO: log errors with a 3P service if we get a non-404 response
    isEnabled = false
  }

  // TODO: Fetch product metafields from Shopify Admin API and store in Sanity
  // await fetchProductMetafields(id)

  // Fetch product data from SFAPI.
  // We store this as a serialized string in our sanity documents as a temporary workaround
  // TODO: remove once data connector is in place
  const shopifyProductData = await fetchProduct(id)

  const firstImage = images?.[0]

  // Generate price (regular + compare at) price ranges across all variants
  // This is purely for the benefit of editors in the studio
  const compareAtPriceRange = variants.reduce(
    (acc: VariantPriceRange, val) => {
      const compareAtPrice = Number(val.compare_at_price)
      if (!acc.minVariantPrice || compareAtPrice < acc.minVariantPrice) {
        acc.minVariantPrice = compareAtPrice
      }
      if (!acc.maxVariantPrice || compareAtPrice > acc.maxVariantPrice) {
        acc.maxVariantPrice = compareAtPrice
      }
      return acc
    },
    {
      maxVariantPrice: undefined,
      minVariantPrice: undefined
    }
  )

  const priceRange = variants.reduce(
    (acc: VariantPriceRange, val) => {
      const price = Number(val.price)
      if (!acc.minVariantPrice || price < acc.minVariantPrice) {
        acc.minVariantPrice = price
      }
      if (!acc.maxVariantPrice || price > acc.maxVariantPrice) {
        acc.maxVariantPrice = Number(val.price)
      }
      return acc
    },
    {
      maxVariantPrice: undefined,
      minVariantPrice: undefined
    }
  )

  // Map images by variant ID
  // (In Shopify variants can only have one image assigned)
  const imagesByVariant = images?.reduce((acc: Record<string, string>, image) => {
    image?.variant_ids?.forEach(id => {
      acc[id] = image.src
    })
    return acc
  }, {})

  // Build `shopify.productVariant` array
  const shopifyProductVariants: IdentifiedSanityDocumentStub[] = variants.map(variant => ({
    _id: `shopifyProductVariant-${variant.id}`, // Shopify variant ID
    _type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
    shopify: {
      compareAtPrice: Number(variant.compare_at_price),
      createdAt: variant.created_at,
      id: variant.id,
      isDeleted: false,
      isEnabled,
      // inStock: !!variant.inventory_management
      //   ? variant.inventory_policy === 'continue' ||
      //     variant.inventory_quantity > 0
      //   : true,
      option1: variant.option1 || '',
      option2: variant.option2 || '',
      option3: variant.option3 || '',
      previewImageUrl: imagesByVariant?.[variant.id],
      price: Number(variant.price),
      productId: variant.product_id,
      sku: variant.sku,
      status,
      title: variant.title,
      updatedAt: variant.updated_at
    }
  }))

  // Build `shopify.product`
  const shopifyProduct: IdentifiedSanityDocumentStub = {
    _id: `shopifyProduct-${id}`, // Shopify product ID
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    options: options.map((option, index) => ({
      _type: 'option',
      _key: `product-option-${index}`,
      name: option.name,
      // position: option.position,
      values: option.values?.map(value => ({
        _key: uuid(),
        _type: 'value',
        value
      }))
    })),
    shopify: {
      compareAtPriceRange,
      createdAt: created_at,
      id,
      isDeleted: false,
      isEnabled,
      ...(firstImage
        ? {
            previewImageUrl: firstImage.src
          }
        : {}),
      priceRange,
      productType: product_type,
      // TODO: remove once data connector is in place
      provider: JSON.stringify(shopifyProductData?.data?.product),
      slug: {
        _type: 'slug',
        current: handle
      },
      status,
      tags,
      title,
      updatedAt: updated_at
    },
    variants: shopifyProductVariants?.map(variant => {
      return {
        _key: uuid(),
        _type: 'reference',
        _ref: variant._id,
        _weak: true
      }
    })
  }

  const transaction = sanityClient.transaction()

  // Create / update product
  await createOrUpdateDocumentAndDraft(transaction, shopifyProduct)

  // Create / update product variants
  for (let i = 0; i < shopifyProductVariants.length; i++) {
    await createOrUpdateDocumentAndDraft(transaction, shopifyProductVariants[i])
  }

  await transaction.commit()
}

export default createOrUpdateProduct
