import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Wedding Customer',
    text: 'Eva\'s wedding album is absolutely stunning! Every page tells our love story beautifully. Her attention to detail is unmatched.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'Anniversary Gift',
    text: 'I surprised my wife with the couple memory frame. She cried happy tears! It\'s the most thoughtful gift I could have given.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anjali Desai',
    role: 'Birthday Gift',
    text: 'The explosion box was the highlight of my birthday party. Everyone loved it! Thank you for creating something so special.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Arjun Singh',
    role: 'Corporate Gift',
    text: 'Eva crafted custom corporate gifts for our team. The quality and presentation exceeded our expectations. Highly recommended!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Neha Verma',
    role: 'Personalized Scrapbook',
    text: 'The scrapbook is a masterpiece. Eva\'s creativity and execution are phenomenal. Worth every penny!',
    rating: 5,
  },
  {
    id: 6,
    name: 'Vikram Gupta',
    role: 'Farewell Gift',
    text: 'Created a beautiful memory jar for my friend\'s goodbye party. It perfectly captured all our memories together.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Customer Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our happy customers about their experiences with Eva Crafts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300">
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-4 leading-relaxed italic">"{testimonial.text}"</p>

              {/* Author */}
              <div>
                <p className="font-semibold text-secondary">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
