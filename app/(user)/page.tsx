import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { CategoriesSection } from '@/components/categories-section'
import { FeaturedProducts } from '@/components/featured-products'
import { WhyChooseSection } from '@/components/why-choose-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CustomGiftForm } from '@/components/custom-gift-form'
import { GallerySection } from '@/components/gallery-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseSection />
      <TestimonialsSection />
      <CustomGiftForm />
      <GallerySection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
