import S from '@sanity/desk-tool/structure-builder'
import { articles } from './desk/articles'
import { collections } from './desk/collections'
import { debug } from './desk/debug'
import { home } from './desk/home'
import { navigation } from './desk/navigation'
import { products } from './desk/products'

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
        navigation,
      ])
  )
}
