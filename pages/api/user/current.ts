import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure only GET requests are allowed
    if (req.method !== "GET") {
        return res.status(405).send("Wrong Method");
    }

    try {
        // Authenticate the user and retrieve currentUser
        const { currentUser } = await serverAuth(req, res);

        // Return currentUser details in the response
        return res.status(200).json(currentUser);
    } catch (error) {
        // Log any errors and return a 400 status code in case of failure
        console.log(error);
        return res.status(400).end();
    }
}



