import S from '@sanity/desk-tool/structure-builder'
import { debug } from './desk/debug'
import { home } from './desk/home'
import { navigation } from './desk/navigation'
import { pages } from './desk/pages'
import { products } from './desk/products'

export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Menu')
      .items([
        home,
        pages,
        S.divider(),
        products,
        S.divider(),
        debug,
        S.divider(),
        navigation,
      ])
  )
}
