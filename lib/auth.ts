const SESSION_COOKIE = 'ec_session'
const SECRET = process.env.SESSION_SECRET!

async function getKey() {
  const enc = new TextEncoder()
  const raw = enc.encode(SECRET.padEnd(32).slice(0, 32))
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

async function sign(payload: string): Promise<string> {
  const key = await getKey()
  const enc = new TextEncoder()
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  const b64 = Buffer.from(sig).toString('base64url')
  return `${payload}.${b64}`
}

async function verify(token: string): Promise<string | null> {
  const last = token.lastIndexOf('.')
  if (last === -1) return null
  const payload = token.slice(0, last)
  const expected = await sign(payload)
  return expected === token ? payload : null
}

const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours
const SECURE = process.env.NODE_ENV === 'production' ? '; Secure' : ''

export async function createSessionCookie(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE * 1000
  const token = await sign(`admin:${expires}`)
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${SESSION_MAX_AGE}${SECURE}`
}

export async function validateSessionCookie(cookieHeader: string | null): Promise<boolean> {
  if (!cookieHeader) return false
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))
  if (!match) return false
  const result = await verify(match[1])
  if (!result || !result.startsWith('admin:')) return false
  const expires = parseInt(result.split(':')[1])
  return Date.now() < expires
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`
}
