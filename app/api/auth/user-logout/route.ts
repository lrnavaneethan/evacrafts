import { NextResponse } from 'next/server'
import { clearUserCookie } from '@/lib/auth'

export async function POST() {
  return new NextResponse(null, {
    status: 200,
    headers: { 'Set-Cookie': clearUserCookie() },
  })
}
