// import { PrismaClient } from "@prisma/client";

// export const client = new PrismaClient();


import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from 'dotenv'
import path from 'path'
//@ts-ignore
const envPath = path.resolve(import.meta.dirname, "../.env");

dotenv.config({ path: envPath });

const { PrismaClient } = pkg;

const getPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    console.log("Initializing Prisma with URL:", connectionString ? "FOUND" : "MISSING");

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};
// did an update because http server was not able to talk to this prisma client
// pg.Pool: Manages the collection of connections to your database.
// PrismaPg: An "adapter" that tells Prisma how to use that pool to talk to Postgres.

export const client = getPrismaClient();