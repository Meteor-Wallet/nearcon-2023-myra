import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function getPrisma(): PrismaClient {
    if (prisma) return prisma;

    prisma = new PrismaClient();

    return prisma;
}
