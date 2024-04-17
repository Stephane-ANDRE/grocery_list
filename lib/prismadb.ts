import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient and store it in the 'client' variable.
// If a global 'prismadb' instance exists, use it. Otherwise, create a new instance.
const client = global.prismadb || new PrismaClient();

// If the environment is set to production, store the 'client' instance in a global variable 'prismadb'
// to avoid creating a new instance every time this module is imported.
if (process.env.NODE_ENV === "production") global.prismadb = client;

// Export the PrismaClient instance for use in other parts of the application.
export default client;
