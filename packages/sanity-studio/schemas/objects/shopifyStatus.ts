import ShopifyStatus from '../../components/ShopifyStatus'

export default {
  name: 'shopifyStatus',
  title: 'Shopify status',
  type: 'string',
  inputComponent: ShopifyStatus,
  hidden: ({ parent }) => {
    // TODO: add helper
    const isActive = parent?.shopify?.status === 'active'
    const isEnabled = parent?.shopify?.isEnabled
    const isDeleted = parent?.shopify?.isDeleted

    return isActive && !isDeleted && isEnabled
  }
}
