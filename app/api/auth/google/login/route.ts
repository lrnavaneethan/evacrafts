import { NextResponse } from 'next/server'

export async function GET() {
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(process.env.OAUTH_CLIENT_ID!)}` +
    `&redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URI!)}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`

  return NextResponse.redirect(url)
}
