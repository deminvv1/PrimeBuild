'use client'

import { useMemo, useState } from 'react'
import HouseConfigurator from './HouseConfigurator'
import FullscreenGallery from './FullscreenGallery'
import ContactSplit from './ContactSplit'
import SectionLines from './SectionLines'
import VerticalRevealLine from './VerticalRevealLine'
import AnimatedLine from './AnimatedLine'
import { DEFAULT_CONFIG, HouseConfig, describeConfig, getExteriorGallery } from '@/data/houseConfigurator'

interface ContactProps {
  source: string
  photo?: string
  quoteText?: string
  title?: string
}

interface Props {
  exteriorHeading?: React.ReactNode
  children?: React.ReactNode
  contactProps: ContactProps
  initialConfig?: Partial<HouseConfig>
}

export default function PodborDomaClient({ exteriorHeading, children, contactProps, initialConfig }: Props) {
  const [config, setConfig] = useState<HouseConfig>({ ...DEFAULT_CONFIG, ...initialConfig })
  const exteriorGallery = useMemo(() => getExteriorGallery(config), [config])
  const configSummary = useMemo(() => describeConfig(config), [config])

  return (
    <>
      <section style={{ position: 'relative' }}>
        <SectionLines delay={200} threshold={0.1} />
        <VerticalRevealLine left="50%" delay={150} color="rgba(255,255,255,0.18)" threshold={0.1} className="konstruktor-vline" />
        <HouseConfigurator config={config} onChange={setConfig} />
      </section>

      <div style={{ padding: '0 24px' }}>
        <AnimatedLine length="100%" delay={0} />
      </div>

      {exteriorHeading}
      <FullscreenGallery images={exteriorGallery} />

      {children}

      <div style={{ height: 64 }} />
      <div style={{ padding: '0 24px' }}>
        <AnimatedLine length="100%" delay={0} />
      </div>

      <section id="podbor-contact" style={{ position: 'relative', scrollMarginTop: 80 }}>
        <SectionLines delay={200} threshold={0.1} />
        <ContactSplit {...contactProps} configSummary={configSummary} />
      </section>
    </>
  )
}
