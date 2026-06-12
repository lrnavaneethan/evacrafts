import { CheckCircle2 } from 'lucide-react'

const features = [
  { title: '100% Handmade', description: 'Each gift is crafted by hand with dedication' },
  { title: 'Customized Designs', description: 'Fully personalized to your specifications' },
  { title: 'Premium Materials', description: 'Only finest quality materials are used' },
  { title: 'Made with Love', description: 'Every piece created with passion and care' },
  { title: 'Unique Gift Ideas', description: 'One-of-a-kind creations you won\'t find elsewhere' },
  { title: 'Attention to Detail', description: 'Meticulous craftsmanship in every creation' },
  { title: 'Personalized Experience', description: 'Direct communication and custom consultation' },
  { title: 'High Satisfaction', description: '95% of customers rate us 5 stars' },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Why Choose Eva Crafts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of authentic handmade gifts crafted with passion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
