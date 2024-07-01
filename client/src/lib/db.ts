import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// we are doind this because of next js hot reload if if save everytime mony prisma client will be created due to multiple call of function so using this will check snd keep only one instance
