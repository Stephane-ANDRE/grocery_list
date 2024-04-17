import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse)  {
// Checking if the HTTP method is not GET
if (req.method !== "GET") { 
    // Returning a 'Method Not Allowed' response
   return res.status(405).send("Wrong Method");
}
try {
    await serverAuth(req, res);

    const lists = await prismadb.list.findMany()
console.log("lists:", lists);

    return res.status(200).json(lists);

} catch (error) {
    console.log(error); 
        return res.status(400).end();
}
}