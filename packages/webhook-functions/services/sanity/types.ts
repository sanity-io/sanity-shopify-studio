export type ShopifyImage = {
  admin_graphql_api_id: string
  alt?: string
  created_at?: string
  height: number
  id: number
  position: number
  product_id: number
  src: string
  updated_at?: string
  variant_ids: number[]
  width: number
}

export type ShopifyOption = {
  id: number
  name: string
  position: number
  values: string[]
}

export type ShopifyVariant = {
  admin_graphql_api_id: string
  barcode: string
  compare_at_price?: string
  created_at: string
  fulfillment_service: string
  grams: number
  id: number
  image_id?: string
  inventory_item_id: number
  inventory_management: string
  inventory_quantity: number
  inventory_policy: string
  old_inventory_quantity: number
  option1?: string
  option2?: string
  option3?: string
  position: number
  price: string
  product_id: number
  requires_shipping: boolean
  sku: string
  taxable: boolean
  title: string
  updated_at: string
  weight: number
  weight_unit: string
}

export type ShopifyWebhookBody = {
  created_at: string
  handle: string
  id: number
  images: ShopifyImage[]
  options: ShopifyOption[]
  product_type: string
  status: 'active' | 'archived' | 'draft'
  tags: string
  title: string
  updated_at: string
  variants: ShopifyVariant[]
}
