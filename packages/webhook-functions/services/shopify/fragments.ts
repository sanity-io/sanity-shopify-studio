// Lifted from:
// https://github.com/Shopify/hydrogen/blob/main/packages/hydrogen/src/graphql/graphql-constants.ts

export const ProductProviderFragment = `
  fragment ProductProviderFragment on Product  {
    compareAtPriceRange {
      maxVariantPrice {
        ...MoneyFragment
      }
      minVariantPrice {
        ...MoneyFragment
      }
    }
    descriptionHtml
    handle
    id
    media(first: $numProductMedia) {
      edges {
        node {
          ...MediaFileFragment
        }
      }
    }
    metafields(first: $numProductMetafields) {
      edges {
        node {
          ...MetafieldFragment
        }
      }
    }
    priceRange {
      maxVariantPrice {
        ...MoneyFragment
      }
      minVariantPrice {
        ...MoneyFragment
      }
    }
    title
    variants(first: $numProductVariants) {
      edges {
        node {
          ...VariantFragment
        }
      }
    }
    sellingPlanGroups(first: $numProductSellingPlanGroups) {
      edges {
        node {
          ...SellingPlanGroupsFragment
        }
      }
    }
  }
  fragment MediaFileFragment on Media {
    ... on MediaImage {
      mediaContentType
      image {
        ...ImageFragment
      }
    }
    ... on Video {
      mediaContentType
      ...VideoFragment
    }
    ... on ExternalVideo {
      mediaContentType
      ...ExternalVideoFragment
    }
    ... on Model3d {
      mediaContentType
      ...Model3DFragment
    }
  }
  fragment MetafieldFragment on Metafield {
    id
    type
    namespace
    key
    value
    createdAt
    updatedAt
    description
  }
  fragment VariantFragment on ProductVariant {
    id
    title
    availableForSale
    image {
      ...ImageFragment
    }
    ...UnitPriceFragment
    priceV2 {
      ...MoneyFragment
    }
    compareAtPriceV2 {
      ...MoneyFragment
    }
    selectedOptions {
      name
      value
    }
    metafields(first: $numProductVariantMetafields) {
      edges {
        node {
          ...MetafieldFragment
        }
      }
    }
    sellingPlanAllocations(first: $numProductVariantSellingPlanAllocations) {
      edges {
        node {
          priceAdjustments {
            compareAtPrice {
              ...MoneyFragment
            }
            perDeliveryPrice {
              ...MoneyFragment
            }
            price {
              ...MoneyFragment
            }
            unitPrice {
              ...MoneyFragment
            }
          }
          sellingPlan {
            ...SellingPlanFragment
          }
        }
      }
    }
  }
  fragment SellingPlanGroupsFragment on SellingPlanGroup {
    sellingPlans(first: $numProductSellingPlans) {
      edges {
        node {
          ...SellingPlanFragment
        }
      }
    }
    appName
    name
    options {
      name
      values
    }
  }
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    originalSrc
    altText
  }
  fragment VideoFragment on Video {
    id
    previewImage {
      originalSrc
    }
    sources {
      mimeType
      url
    }
  }
  fragment ExternalVideoFragment on ExternalVideo {
    id
    embeddedUrl
    host
  }
  fragment Model3DFragment on Model3d {
    id
    alt
    mediaContentType
    previewImage {
      originalSrc
    }
    sources {
      url
    }
  }
  fragment SellingPlanFragment on SellingPlan {
    id
    description
    name
    options {
      name
      value
    }
    priceAdjustments {
      orderCount
      adjustmentValue {
        ...on SellingPlanFixedAmountPriceAdjustment {
          adjustmentAmount {
            ...MoneyFragment
          }
        }
        ...on SellingPlanFixedPriceAdjustment {
          price {
            ...MoneyFragment
          }
        }
        ...on SellingPlanPercentagePriceAdjustment {
          adjustmentPercentage
        }
      }
    }
    recurringDeliveries
  }
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    originalSrc
    altText
  }
  fragment UnitPriceFragment on ProductVariant {
    unitPriceMeasurement {
      measuredType
      quantityUnit
      quantityValue
      referenceUnit
      referenceValue
    }
    unitPrice {
      ...MoneyFragment
    }
  }
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment SellingPlanFragment on SellingPlan {
    id
    description
    name
    options {
      name
      value
    }
    priceAdjustments {
      orderCount
      adjustmentValue {
        ...on SellingPlanFixedAmountPriceAdjustment {
          adjustmentAmount {
            ...MoneyFragment
          }
        }
        ...on SellingPlanFixedPriceAdjustment {
          price {
            ...MoneyFragment
          }
        }
        ...on SellingPlanPercentagePriceAdjustment {
          adjustmentPercentage
        }
      }
    }
    recurringDeliveries
  }
  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
`
