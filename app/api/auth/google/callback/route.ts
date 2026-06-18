import { OAuth2Client } from 'google-auth-library'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createUserCookie } from '@/lib/auth'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const origin = new URL(req.url).origin

  if (!code) return NextResponse.redirect(`${origin}/`)

  try {
    const client = new OAuth2Client(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      process.env.OAUTH_REDIRECT_URI
    )

    const { tokens } = await client.getToken(code)

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.OAUTH_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload?.sub) return NextResponse.redirect(`${origin}/`)

    const { sub: googleId, email, name, picture } = payload

    let user = await prisma.user.findUnique({
      where: { googleId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { googleId, email: email ?? null, name: name ?? null, image: picture ?? null },
      })
    } else {
      console.log('[Google OAuth] Existing user logged in:', user.id)
    }

    const cookie = await createUserCookie({
      id: user.id,
      googleId: user.googleId!,
      email: user.email ?? '',
      name: user.name ?? '',
      image: user.image ?? '',
    })

    return new NextResponse(null, {
      status: 302,
      headers: { 'Set-Cookie': cookie, Location: origin },
    })
  } catch (err) {
    console.error('[Google OAuth Error]', err)
    return NextResponse.redirect(`${origin}/`)
  }
}
