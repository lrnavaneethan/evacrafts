import { cookies } from 'next/headers'

const SECRET = process.env.SESSION_SECRET!
const SECURE = process.env.NODE_ENV === 'production' ? '; Secure' : ''
const MAX_AGE = 60 * 60 * 8 // 8 hours

// ── Crypto helpers ────────────────────────────────────────────────

async function getKey() {
  const raw = new TextEncoder().encode(SECRET.padEnd(32).slice(0, 32))
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

async function signToken(payload: object): Promise<string> {
  const key = await getKey()
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = Buffer.from(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  ).toString('base64url')
  return `${data}.${sig}`
}

async function verifyToken<T>(token: string): Promise<T | null> {
  try {
    const dot = token.indexOf('.')
    if (dot === -1) return null
    const data = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const key = await getKey()
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      Buffer.from(sig, 'base64url'),
      new TextEncoder().encode(data)
    )
    if (!valid) return null
    const parsed = JSON.parse(Buffer.from(data, 'base64url').toString()) as T & { exp: number }
    if (Date.now() > parsed.exp) return null
    return parsed
  } catch {
    return null
  }
}

// ── Admin session ─────────────────────────────────────────────────

export async function createAdminCookie(): Promise<string> {
  const token = await signToken({ role: 'admin', exp: Date.now() + MAX_AGE * 1000 })
  return `ec_session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${MAX_AGE}${SECURE}`
}

export async function validateAdminCookie(cookieHeader: string | null): Promise<boolean> {
  if (!cookieHeader) return false
  const match = cookieHeader.match(/ec_session=([^;]+)/)
  if (!match) return false
  const payload = await verifyToken<{ role: string }>(match[1])
  return payload?.role === 'admin'
}

export function clearAdminCookie(): string {
  return `ec_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`
}

// ── User session (Google OAuth) ───────────────────────────────────

export type SessionUser = {
  id: string
  googleId: string
  email: string
  name: string
  image: string
}

export async function createUserCookie(user: SessionUser): Promise<string> {
  const token = await signToken({ ...user, exp: Date.now() + MAX_AGE * 1000 })
  return `ec_user=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE}${SECURE}`
}

export async function validateUserCookie(cookieHeader: string | null): Promise<SessionUser | null> {
  if (!cookieHeader) return null
  const match = cookieHeader.match(/ec_user=([^;]+)/)
  if (!match) return null
  return verifyToken<SessionUser>(match[1])
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieHeader = (await cookies()).toString()
  return validateUserCookie(cookieHeader)
}

export function clearUserCookie(): string {
  return `ec_user=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
}
