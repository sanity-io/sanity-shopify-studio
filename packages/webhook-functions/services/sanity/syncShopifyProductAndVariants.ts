import { IdentifiedSanityDocumentStub, Transaction } from '@sanity/client'
import { uuid } from '@sanity/uuid'
import groq from 'groq'
import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE
} from '../../constants'
import { sanityClient } from '../../lib/sanity'
import fetchProductListingStatus from '../shopify/fetchProductListing'
// import fetchProductMetafields from '../shopify/fetchProductMetafields'
import { ShopifyWebhookBody } from './types'

type VariantPriceRange = {
  maxVariantPrice?: number
  minVariantPrice?: number
}

const createProductAndOptions = async (
  transaction: Transaction,
  document: IdentifiedSanityDocumentStub
) => {
  const publishedId = document._id
  const draftId = `drafts.${document._id}`

  // Fetch existing products
  const { draft, published } = await sanityClient.fetch(
    groq`{
      "draft": *[_id == $draftId][0]._id,
      "published": *[_id == $publishedId][0]._id,
    }
  `,
    { draftId, publishedId }
  )

  // Create new product if none found
  if (!published) {
    transaction.createIfNotExists(document)
    return
  }

  // Patch existing published document
  transaction.patch(publishedId, patch => {
    return patch.set({ shopify: document.shopify })
  })

  // Patch existing draft (if present)
  if (draft) {
    transaction.patch(draftId, patch => {
      return patch.set({ shopify: document.shopify })
    })
  }

  return transaction
}

const createProductVariant = async (
  transaction: Transaction,
  document: IdentifiedSanityDocumentStub
) => {
  const publishedId = document._id
  const draftId = `drafts.${document._id}`

  // Create document if it doesn't exist, otherwise patch with existing content
  transaction.createIfNotExists(document).patch(publishedId, patch => patch.set(document))

  // Also check for and patch draft document, if present
  const draft = await sanityClient.getDocument(draftId)
  if (draft) {
    const documentDraft = Object.assign({}, document, {
      _id: draftId
    })

    transaction.patch(draftId, patch => patch.set(documentDraft))
  }
}

const syncShopifyProductAndVariants = async (body: ShopifyWebhookBody) => {
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
  // We assign _key values of product option name and values since they're guaranteed unique in Shopify
  const shopifyProduct: IdentifiedSanityDocumentStub = {
    _id: `shopifyProduct-${id}`, // Shopify product ID
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
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
      options: options.map(option => ({
        _type: 'option',
        _key: option.name,
        name: option.name,
        values: option.values
      })),
      priceRange,
      productType: product_type,
      slug: {
        _type: 'slug',
        current: handle
      },
      status,
      tags,
      title,
      updatedAt: updated_at,
      variants: shopifyProductVariants?.map(variant => {
        return {
          _key: uuid(),
          _type: 'reference',
          _ref: variant._id,
          _weak: true
        }
      })
    }
  }

  const transaction = sanityClient.transaction()

  // Create product and merge options
  await createProductAndOptions(transaction, shopifyProduct)

  // Create / update product variants
  for (let i = 0; i < shopifyProductVariants.length; i++) {
    await createProductVariant(transaction, shopifyProductVariants[i])
  }

  await transaction.commit()
}

export default syncShopifyProductAndVariants
