import { getCurrentUser } from '@/lib/auth'
import { NavigationClient } from './navigation-client'

export async function Navigation() {
  const user = await getCurrentUser()
  return <NavigationClient user={user} />
}
