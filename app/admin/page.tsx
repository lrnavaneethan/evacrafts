import Link from 'next/link'
import { Package, Tag, ArrowRight } from 'lucide-react'

const stats = [
  { label: 'Total Products', value: '8', icon: Package, href: '/admin/products' },
  { label: 'Collections', value: '12', icon: Tag, href: '/admin/collections' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your products and collections</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-lg border border-border p-6 hover:border-primary hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-3xl font-bold text-secondary">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
