import Link from 'next/link'
import { Heart, Share2, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">EC</span>
              </div>
              <span className="font-bold text-lg">Eva Crafts</span>
            </div>
            <p className="text-sm text-white/60">
              Handmade gifts crafted with love for every special occasion
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#custom" className="hover:text-white transition-colors">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wedding Gifts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Birthday Gifts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Romantic Gifts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Custom Gifts
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Socials"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@evacrafts.com"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-white/60">hello@evacrafts.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; 2024 Eva Crafts. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
