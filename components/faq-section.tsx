'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'Do you make custom gifts?',
    answer:
      'Absolutely! Custom gifts are our specialty. We work closely with you to bring your unique vision to life. Every custom order is treated with the utmost care and attention to detail.',
  },
  {
    id: 2,
    question: 'How long does production take?',
    answer:
      'Standard orders typically take 7-14 days for production and delivery. Custom orders may require 2-3 weeks depending on complexity. Rush orders can be arranged with additional charges.',
  },
  {
    id: 3,
    question: 'Can I request a specific design?',
    answer:
      'Yes! We encourage you to share your design ideas, references, color preferences, and any specific requirements. Send us inspiration images or detailed descriptions, and we\'ll create exactly what you envision.',
  },
  {
    id: 4,
    question: 'Do you offer gift wrapping?',
    answer:
      'Yes, we offer premium gift wrapping services for all orders. Choose from our signature wrapping styles or request something specific. Gift wrapping is available at an additional charge.',
  },
  {
    id: 5,
    question: 'How can I place an order?',
    answer:
      'You can place an order through our website by browsing products, or submit a custom request form. You can also reach out via WhatsApp, email, or phone. Our team will guide you through the entire process.',
  },
  {
    id: 6,
    question: 'What is your return and refund policy?',
    answer:
      'We guarantee 100% satisfaction with all our handmade gifts. If you&apos;re not satisfied, we offer returns within 14 days. Since items are handmade, custom orders are typically non-refundable unless there&apos;s a defect.',
  },
]

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Find answers to common questions about our products and services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-left font-semibold text-secondary">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/20">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
