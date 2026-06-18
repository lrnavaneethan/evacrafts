'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

export default function InquiryPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Handmade Explosion Box', price: 2499, quantity: 1 },
    { id: 2, name: 'Personalized Scrapbook', price: 1999, quantity: 2 },
  ])

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-secondary mb-8">Gift Inquiry Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <div className="bg-white rounded-lg p-12 text-center border border-border">
                  <p className="text-muted-foreground mb-4">Your inquiry cart is empty</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-6 border border-border flex gap-6">
                    {/* Item Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex-shrink-0" />

                    {/* Item Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-secondary">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Premium handmade gift</p>
                      <p className="font-bold text-primary text-lg">₹{item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex flex-col justify-between items-end gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>

                      <div className="flex items-center gap-2 bg-muted rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-border rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-bold text-secondary">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 border border-border h-fit sticky top-20 space-y-6">
              <h2 className="text-xl font-bold text-secondary">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Customization</span>
                  <span>Negotiable</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery (7-14 days)</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-border pt-3 flex justify-between font-bold text-secondary">
                  <span>Estimated Total</span>
                  <span className="text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Send Inquiry
                </Button>

                <Button size="lg" variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                  Order via WhatsApp
                </Button>

                <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/10">
                  Continue Shopping
                </Button>
              </div>

              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>💡 Tip:</strong> Include customization details in the inquiry message for accurate quotes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
