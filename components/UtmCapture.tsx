'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureUtmParams } from '@/lib/sendLead'

export default function UtmCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUtmParams()
  }, [pathname, searchParams])

  return null
}
