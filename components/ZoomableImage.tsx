'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'

interface Props {
  src: string
  alt: string
  sizes?: string
  objectFit?: 'contain' | 'cover'
}

export default function ZoomableImage({ src, alt, sizes = '100vw', objectFit = 'contain' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ position: 'absolute', inset: 0, cursor: 'zoom-in' }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit }} />
      </div>
      {open && <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
