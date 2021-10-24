import { CloseIcon, ImageIcon, LinkRemovedIcon } from '@sanity/icons'
import React, { forwardRef } from 'react'

type Props = {
  isActive: boolean
  isDeleted: boolean
  isEnabled: boolean
  url: string
}

const ProductPreview = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isActive, isEnabled, isDeleted, url } = props

  return (
    <div
      ref={ref}
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '5em',
        justifyContent: 'center',
        position: 'relative',
        width: '5em',
      }}
    >
      {url ? (
        <img
          src={`${url}&width=400`}
          style={{
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        />
      ) : (
        <ImageIcon
          style={{
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
        />
      )}
      {isDeleted && (
        <CloseIcon
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'rgba(255, 255, 255, 0.85)',
            height: '100%',
            position: 'relative',
            width: '100%',
          }}
        />
      )}

      {!isDeleted && (!isActive || !isEnabled) && (
        <LinkRemovedIcon
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'rgba(255, 255, 255, 0.85)',
            height: '100%',
            position: 'relative',
            width: '100%',
          }}
        />
      )}
    </div>
  )
})

export default ProductPreview
