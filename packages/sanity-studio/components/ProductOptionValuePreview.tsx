import React, { forwardRef } from 'react'

type Props = {
  color?: string
}

const ColorPreview = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { color } = props

  if (!color) {
    return null
  }

  return (
    <div
      ref={ref}
      style={{
        alignItems: 'center',
        background: color,
        display: 'flex',
        height: '5em',
        justifyContent: 'center',
        position: 'relative',
        width: '5em',
      }}
    />
  )
})

export default ColorPreview
