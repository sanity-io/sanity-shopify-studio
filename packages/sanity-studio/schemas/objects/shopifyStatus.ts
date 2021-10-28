import ShopifyStatus from '../../components/ShopifyStatus'

export default {
  name: 'shopifyStatus',
  title: 'Shopify status',
  type: 'string',
  inputComponent: ShopifyStatus,
  hidden: ({ parent }) => {
    // TODO: add helper
    const isActive = parent?.store?.status === 'active'
    const isEnabled = parent?.store?.isEnabled
    const isDeleted = parent?.store?.isDeleted

    return isActive && !isDeleted && isEnabled
  }
}
