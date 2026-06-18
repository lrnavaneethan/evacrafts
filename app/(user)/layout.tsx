import { Navigation } from '@/components/navigation'

export const dynamic = 'force-dynamic'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
