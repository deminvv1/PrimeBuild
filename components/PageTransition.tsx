'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import TileWipe, { TilePhase, TILE_WIPE_MS } from './TileWipe'

/**
 * Перехватывает клики по внутренним ссылкам, проигрывает волну квадратов
 * (закрыть → навигация → открыть), синхронно с App Router.
 */
export default function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<TilePhase>('hidden')
  const pendingHref = useRef<string | null>(null)
  const isTransitioning = useRef(false)

  // Экран только что открылся после навигации, инициированной кликом
  useEffect(() => {
    if (pendingHref.current === null) return
    pendingHref.current = null
    setPhase('out')
    const t = setTimeout(() => {
      setPhase('hidden')
      isTransitioning.current = false
    }, TILE_WIPE_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isTransitioning.current) return
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      if (/^(mailto:|tel:)/.test(href)) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      e.preventDefault()
      isTransitioning.current = true
      pendingHref.current = url.pathname + url.search
      setPhase('in')
      setTimeout(() => {
        setPhase('covered')
        router.push(url.pathname + url.search)
      }, TILE_WIPE_MS)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  return <TileWipe phase={phase} />
}
