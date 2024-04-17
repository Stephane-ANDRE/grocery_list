import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash"

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);

            const { listId } = req.body;

            const existingList = await prismadb.list.findUnique({
                where: {
                    id: listId,
                }
            });

            if (!existingList) {
                throw new Error('Invalid ID');
            }

            const updatedRegisteredListIds = without(currentUser.registeredListIds, listId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    registeredListIds: updatedRegisteredListIds,
                }
            });

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}