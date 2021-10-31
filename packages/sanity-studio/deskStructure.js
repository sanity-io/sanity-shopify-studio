import S from '@sanity/desk-tool/structure-builder'
import { articles } from './desk/articles'
import { collections } from './desk/collections'
import { debug } from './desk/debug'
import { home } from './desk/home'
import { products } from './desk/products'
import { settings } from './desk/settings'

export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Menu')
      .items([
        home,
        articles,
        S.divider(),
        collections,
        products,
        S.divider(),
        debug,
        S.divider(),
        settings,
      ])
  )
}
