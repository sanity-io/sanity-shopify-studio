// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'
import annotationProductMarginalia from './annotations/productMarginalia'

// Document types
import articleEditorial from './documents/article/editorial'
import articleInfo from './documents/article/info'
import collection from './documents/collection'
import product from './documents/product'
import productVariant from './documents/productVariant'

// Singleton document types
import home from './singletons/home'
import settings from './singletons/settings'

// Object types
import blockImage from './objects/blockImage'
import blockProduct from './objects/blockProduct'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import productOption from './objects/productOption'
import proxyString from './objects/proxyString'
import seo from './objects/seo'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'

// Build the schemas and export to the Sanity Studio app
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
        // Document types
        annotationProduct,
        annotationProductMarginalia,
        // Documents
        articleEditorial,
        articleInfo,
        collection,
        product,
        productVariant,
        // Singleton document types
        home,
        settings,
        // Objects
        blockImage,
        blockProduct,
        linkExternal,
        linkInternal,
        productOption,
        proxyString,
        seo,
        shopifyProduct,
        shopifyProductVariant,
    ])
})
