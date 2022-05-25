import React, { forwardRef } from 'react'

type Props = {
  background?: string
  text?: string
}

const ColorThemePreview = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { background, text } = props

  return (
    <div
      ref={ref}
      style={{
        alignItems: 'center',
        backgroundColor: background || 'white',
        borderRadius: 'inherit',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {text && <span style={{ color: text, fontSize: '1.5em', fontWeight: 600 }}>T</span>}
    </div>
  )
})

export default ColorThemePreview
