'use client'

import { Button } from '@/components/ui/button'

const categories = [
  { id: 1, name: 'Wedding Gifts', description: 'Celebrate love with beautiful personalized wedding memories' },
  { id: 2, name: 'Birthday Gifts', description: 'Make birthdays special with unique handcrafted presents' },
  { id: 3, name: 'Anniversary Gifts', description: 'Honor milestones with meaningful gift creations' },
  { id: 4, name: 'Surprise Gifts', description: 'Delight loved ones with unexpected special gifts' },
  { id: 5, name: 'Romantic Gifts', description: 'Express love and affection through thoughtful presents' },
  { id: 6, name: 'Farewell Gifts', description: 'Create lasting memories during transitions' },
  { id: 7, name: 'Friendship Gifts', description: 'Celebrate bonds with personalized friend gifts' },
  { id: 8, name: 'Baby Shower Gifts', description: 'Welcome new arrivals with handmade creations' },
  { id: 9, name: 'Housewarming Gifts', description: 'Warm new homes with beautiful gift ideas' },
  { id: 10, name: 'Corporate Gifts', description: 'Strengthen business relationships with premium gifts' },
  { id: 11, name: 'Customized Gifts', description: 'Design your own unique personalized gift' },
  { id: 12, name: 'Festival Gifts', description: 'Celebrate festivals with special handmade presents' },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Gift Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of handmade gifts for every occasion and celebration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg p-6 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-40 mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300" />
              <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10">
                View Products
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
