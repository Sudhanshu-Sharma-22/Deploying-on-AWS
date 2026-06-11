// import { PrismaClient } from "@prisma/client";

// export const client = new PrismaClient();


import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";

import fs from "fs";

// @ts-ignore
if (!process.env.DATABASE_URL) {
    const possiblePaths = [];
    const cwd = process.cwd();
    possiblePaths.push(path.resolve(cwd, ".env"));
    possiblePaths.push(path.resolve(cwd, "../../.env"));
    possiblePaths.push(path.resolve(cwd, "packages/prisma/.env"));
    possiblePaths.push(path.resolve(cwd, "../../packages/prisma/.env"));
    possiblePaths.push(path.resolve(cwd, "../packages/prisma/.env"));

    for (const envPath of possiblePaths) {
        try {
            if (fs.existsSync(envPath)) {
                dotenv.config({ path: envPath });
                if (process.env.DATABASE_URL) {
                    console.log("Successfully loaded .env from:", envPath);
                    break;
                }
            }
        } catch (e) {
        }
    }
}

const getPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    console.log("Initializing Prisma with URL:", connectionString ? "FOUND" : "MISSING");

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};
// did an update because http server was not able to talk to this prisma client
// pg.Pool: Manages the collection of connections to database.
// PrismaPg: An "adapter" that tells Prisma how to use that pool to talk to Postgres.

export const client = getPrismaClient();