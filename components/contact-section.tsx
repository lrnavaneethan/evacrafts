import { Phone, Mail, MapPin, Clock, MessageCircle, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have questions or ready to order? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href="tel:+919876543210" className="text-white/80 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex gap-4">
              <MessageCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <a href="https://wa.me/919876543210" className="text-white/80 hover:text-white transition-colors">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:hello@evacrafts.com" className="text-white/80 hover:text-white transition-colors">
                  hello@evacrafts.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-white/80">
                  Eva Crafts Studio<br />
                  Bangalore, India
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-white/80 text-sm">
                  Monday - Friday: 10:00 AM - 6:00 PM<br />
                  Saturday: 11:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-secondary font-semibold">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
