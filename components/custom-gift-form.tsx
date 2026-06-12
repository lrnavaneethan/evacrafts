'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export function CustomGiftForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    budget: '',
    message: '',
    image: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', phone: '', email: '', occasion: '', budget: '', message: '', image: null })
  }

  return (
    <section id="custom" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Custom Gift Request</h2>
          <p className="text-lg text-muted-foreground">
            Have a unique idea in mind? Tell us about your custom gift request
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-border shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your phone number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="your@email.com"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Gift Occasion</label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select an occasion</option>
                <option value="wedding">Wedding</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="romantic">Romantic</option>
                <option value="corporate">Corporate</option>
                <option value="custom">Custom/Other</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Budget Range</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select budget</option>
                <option value="below-1000">Below ₹1,000</option>
                <option value="1000-2000">₹1,000 - ₹2,000</option>
                <option value="2000-5000">₹2,000 - ₹5,000</option>
                <option value="above-5000">Above ₹5,000</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Inspiration Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.image ? formData.image.name : 'Upload image'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary mb-2">Gift Details & Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Describe your custom gift idea, preferences, colors, themes, or any special requirements..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white">
              Send Inquiry
            </Button>
            <Button type="button" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">
              Order via WhatsApp
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            We&apos;ll get back to you within 24 hours to discuss your custom gift request
          </p>
        </form>
      </div>
    </section>
  )
}
