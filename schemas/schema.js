// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

// Document types
import collection from './documents/collection'
import colorTheme from './documents/colorTheme'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'

// Singleton document types
import home from './singletons/home'
import settings from './singletons/settings'

// Block content
import body from './blocks/body'

// Object types
import blockImage from './objects/blockImage'
import blockInlineProduct from './objects/blockInlineProduct'
import blockInlineProductMarginalia from './objects/blockInlineProductMarginalia'
import blockProduct from './objects/blockProduct'
import collectionHero from './objects/hero/collection'
import collectionRule from './objects/collectionRule'
import customProductOptionColor from './objects/customProductOption/color'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import pageHero from './objects/hero/page'
import placeholderString from './objects/placeholderString'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoProduct from './objects/seo/product'
import seoSingleton from './objects/seo/singleton'
import seoStandard from './objects/seo/standard'
import shopifyCollection from './objects/shopifyCollection'
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
    annotationProduct,
    // Document types
    collection,
    page,
    product,
    productVariant,
    // Singleton document types
    home,
    settings,
    // Block content
    body,
    // Objects
    blockImage,
    blockInlineProduct,
    blockInlineProductMarginalia,
    blockProduct,
    collectionHero,
    collectionRule,
    colorTheme,
    customProductOptionColor,
    linkExternal,
    linkInternal,
    pageHero,
    placeholderString,
    productOption,
    productWithVariant,
    proxyString,
    seoProduct,
    seoSingleton,
    seoStandard,
    shopifyCollection,
    shopifyProduct,
    shopifyProductVariant
  ])
})
