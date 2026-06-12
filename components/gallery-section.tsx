const galleryItems = [
  { id: 1, category: 'Wedding Gifts', title: 'Elegant Wedding Album' },
  { id: 2, category: 'Romantic Gifts', title: 'Couple Memory Display' },
  { id: 3, category: 'Birthday Gifts', title: 'Explosion Box Surprise' },
  { id: 4, category: 'Custom Crafts', title: 'Personalized Scrapbook' },
  { id: 5, category: 'Packaging', title: 'Premium Gift Wrapping' },
  { id: 6, category: 'Decorations', title: 'Handmade Embellishments' },
]

export function GallerySection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of beautiful handmade creations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-lg cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div
                className={`bg-gradient-to-br from-primary/30 to-accent/30 w-full h-64 md:h-72 ${
                  index === 0 ? 'md:h-96' : ''
                } flex items-center justify-center group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-300`}
              >
                <div className="text-center">
                  <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">{item.category}</p>
                  <p className="text-lg font-semibold text-secondary">{item.title}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-6 py-2 bg-white rounded-lg text-secondary font-semibold hover:bg-muted transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
