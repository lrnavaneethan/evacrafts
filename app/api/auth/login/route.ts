import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const validEmail = email === process.env.ADMIN_EMAIL
  const validPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)

  if (!validEmail || !validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const cookie = await createSessionCookie()
  return new NextResponse(null, {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  })
}
