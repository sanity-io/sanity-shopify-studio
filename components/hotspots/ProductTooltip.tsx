import { Box, Text } from '@sanity/ui'
import Preview from 'part:@sanity/base/preview'
import schema from 'part:@sanity/base/schema'
import React from 'react'

const ProductTooltip = ({ spot }) => {
  const productRef = spot?.productWithVariant?.product?._ref

  return (
    <Box padding={2}>
      {productRef ? (
        <Preview value={{ _id: productRef }} type={schema.get(`product`)} />
      ) : (
        <Text muted size={1}>
          No product selected
        </Text>
      )}
    </Box>
  )
}

export default ProductTooltip
