import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden h-80 md:h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">Eva - Founder & Artist</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">About Eva Crafts</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since childhood, I&apos;ve been passionate about creating handmade gifts that bring joy to people&apos;s lives. What started as making personalized gifts for friends and family has blossomed into Eva Crafts—a business dedicated to crafting meaningful, heartfelt presents.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                Every gift I create is made with love and careful attention to detail. I believe that handmade gifts are more than just objects—they&apos;re expressions of care and thoughtfulness. Using premium materials and traditional techniques, I ensure each piece is unique and special.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                Whether it&apos;s a wedding memory album, a personalized scrapbook, or a completely custom creation, my mission is to help you celebrate life&apos;s precious moments with gifts that truly matter.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="flex-1">
                <div className="text-2xl font-bold text-primary">100%</div>
                <p className="text-sm text-muted-foreground">Handmade</p>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-primary">Premium</div>
                <p className="text-sm text-muted-foreground">Materials</p>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-primary">Custom</div>
                <p className="text-sm text-muted-foreground">Designs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
