import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if the request method is POST
        if (req.method === "POST") {
            // Authenticate the user
            const { currentUser } = await serverAuth(req, res);
            
            // Extract the listId from the request body
            const { listId } = req.body;
console.log("listId:", listId);

            // Check if the list with the given ID exists
            const existingList = await prismadb.list.findUnique({
                where: {
                    id: listId,
                }
            });

            // Throw an error if the list does not exist
            if (!existingList) {
                throw new Error("Invalid ID");
            }

            
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    registeredListIds: {
                        push: listId,
                    }
                }
            });
console.log("userUpdated:", user);

            // Return the updated user as JSON response
            return res.status(200).json(user);        
        }

        // If the request method is npt POST, return a 405 Method Not Allowed status
        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }  
}
