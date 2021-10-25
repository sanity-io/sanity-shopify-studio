// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Annotations
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationShopify from './annotations/shopify'
import annotationShopifyMargin from './annotations/shopifyMargin'
// Documents
import page from './documents/page'
import shopifyProduct from './documents/shopify/product'
import shopifyProductVariant from './documents/shopify/productVariant'
// Objects
import blockImage from './objects/blockImage'
import blockProduct from './objects/blockProduct'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import productOption from './objects/productOption'
import shopifyProductSync from './objects/shopifyProductSync'
import shopifyProductVariantSync from './objects/shopifyProductVariantSync'
import shopifyStatus from './objects/shopifyStatus'
// Singletons
import home from './singletons/home'
import navigation from './singletons/navigation'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Annotations
    annotationLinkEmail,
    annotationLinkExternal,
    annotationLinkInternal,
    annotationShopify,
    annotationShopifyMargin,
    // Documents
    page,
    shopifyProduct,
    shopifyProductVariant,
    // Objects
    blockImage,
    blockProduct,
    linkExternal,
    linkInternal,
    productOption,
    shopifyProductSync,
    shopifyProductVariantSync,
    shopifyStatus,
    // Singletons
    home,
    navigation
  ])
})
