import { PrismaClient } from "@prisma/client";
//declares a global variable prismadb of type PrismaClient, 
//which can be used to access the instance of PrismaClient throughout the application
declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}