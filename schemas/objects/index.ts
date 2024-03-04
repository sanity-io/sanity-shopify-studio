// Directory Objects
import {collection} from './collection'
import {customProductOption} from './customProductOption'
import {global} from './global'
import {hero} from './hero'
import {hotspot} from './hotspot'
import {module} from './module'
import {seoObj} from './seo'
import {shopify} from './shopify'

const directories = [
  ...collection,
  ...customProductOption,
  ...global,
  ...hero,
  ...hotspot,
  ...module,
  ...seoObj,
  ...shopify,
]

export const objects = [...directories]
