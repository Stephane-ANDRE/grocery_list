import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure only GET requests are allowed
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        // Authenticate the user
        await serverAuth(req, res);
        
        // Extract the listId from the query parameters
        const { listId } = req.query;

        // Check if listId is not a string or is undefined
        if (typeof listId !== "string" || !listId) {
            throw new Error("Invalid Id");
        }

        // Find the list with the provided listId
        const list = await prismadb.list.findUnique({
            where: {
                id: listId
            }
        });
console.log("listFound:", list);

        // If no list found with the provided listId, throw an error
        if (!list) {
            throw new Error("Invalid Id");
        }

        // Return the list details in the response
        return res.status(200).json(list);
    } catch (error) {
        // Log any errors and return a 400 status code in case of failure
        console.log(error);
        return res.status(400).end();
    }
}
