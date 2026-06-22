import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  })
  return new PrismaClient({
    adapter,
    transactionOptions: { timeout: 30000 },
  })
}

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
