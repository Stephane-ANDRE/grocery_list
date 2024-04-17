// Importing modules
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

// Handling POST request for user registration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Checking if the request method is not POST
    if (req.method !== "POST") {
        return res.status(405).send("Wrong Method"); 
    }
    
    try {
        // Extracting email, name, and password from the request body
        const { email, name, password } = req.body;

        // Checking if the user with the provided email already exists in the database
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        // Returning a 422 status code if the user already exists
        if (existingUser) {
            return res.status(422).json({ error: "Ce mail est déjà utilisé" });
        }

        // Hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creating a new user in the database
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: "",
                emailVerified: new Date(),
            }
        });

        return res.status(200).json({ message: "Yes! Bien joué!", user });
    } catch (error) { 
        console.log(error);
        return res.status(400).send("humm ce n'est pas bon"); 
    }
}
