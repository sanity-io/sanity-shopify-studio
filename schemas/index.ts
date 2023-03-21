// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

const annotations = [
  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
  annotationProduct,
]

// Document types
import collection from './documents/collection'
import colorTheme from './documents/colorTheme'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'

const documents = [collection, colorTheme, page, product, productVariant]

// Singleton document types
import footer from './singletons/footer'
import home from './singletons/home'
import links from './singletons/links'
import menu from './singletons/menu'
import settings from './singletons/settings'

const singletons = [footer, home, links, menu, settings]

// Block content
import body from './blocks/body'

const blocks = [body]

// Object types
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionHeight from './objects/customProductOption/height'
import customProductOptionSize from './objects/customProductOption/size'
import customProductOptionSizeObject from './objects/customProductOption/sizeObject'
import customProductOptionTitle from './objects/customProductOption/title'
import customProductOptionWidth from './objects/customProductOption/width'
import imageWithProductHotspots from './objects/imageWithProductHotspots'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import heroCollection from './objects/hero/collection'
import heroHome from './objects/hero/home'
import heroPage from './objects/hero/page'
import moduleAccordion from './objects/module/accordion'
import accordionBody from './objects/module/accordionBody'
import accordionGroup from './objects/module/accordionGroup'
import moduleCallout from './objects/module/callout'
import moduleCallToAction from './objects/module/callToAction'
import moduleCollection from './objects/module/collection'
import moduleGrid from './objects/module/grid'
import gridItems from './objects/module/gridItems'
import moduleImage from './objects/module/image'
import moduleImageAction from './objects/module/imageCallToAction'
import moduleImages from './objects/module/images'
import moduleInstagram from './objects/module/instagram'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import placeholderString from './objects/placeholderString'
import spot from './objects/spot'
import productHotspots from './objects/productHotspots'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoHome from './objects/seo/home'
import seoPage from './objects/seo/page'
import seoDescription from './objects/seo/description'
import seoShopify from './objects/seo/shopify'
import shopifyCollection from './objects/shopifyCollection'
import shopifyCollectionRule from './objects/shopifyCollectionRule'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'

// Collections

import collectionGroup from './objects/collection/group'
import collectionLinks from './objects/collection/links'

const objects = [
  customProductOptionColor,
  customProductOptionHeight,
  customProductOptionSize,
  customProductOptionSizeObject,
  customProductOptionTitle,
  customProductOptionWidth,
  imageWithProductHotspots,
  linkExternal,
  linkInternal,
  heroCollection,
  heroHome,
  heroPage,
  moduleAccordion,
  accordionBody,
  accordionGroup,
  moduleCallout,
  moduleCallToAction,
  moduleCollection,
  moduleGrid,
  gridItems,
  moduleImage,
  moduleImageAction,
  moduleImages,
  moduleInstagram,
  moduleProduct,
  moduleProducts,
  placeholderString,
  spot,
  productHotspots,
  productOption,
  productWithVariant,
  proxyString,
  seoHome,
  seoPage,
  seoDescription,
  seoShopify,
  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,
  collectionGroup,
  collectionLinks,
]

export const schemaTypes = [...annotations, ...documents, ...singletons, ...objects, ...blocks]
