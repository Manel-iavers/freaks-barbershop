import HeroSection from '@/components/sections/HeroSection'
import GallerySection from '@/components/sections/GallerySection'
import LocationSection from '@/components/sections/LocationSection'
import FooterSection from '@/components/sections/FooterSection'
import JsonLd from '@/components/layout/JsonLd'

export default function Home() {
  return (
    <>
      <JsonLd />
      <main>
        <HeroSection />
        <GallerySection />
        <LocationSection />
      </main>
      <FooterSection />
    </>
  )
}
