import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Invalid request method. Only POST requests are allowed." });
    }

    const { currentUser } = await serverAuth(req, res);

    if (!currentUser) {
      console.log("Error: User is not authenticated");
      return res.status(401).json({ error: "User is not authenticated" });
    }

    const { name, products } = req.body;

    if (typeof name !== "string") {
      console.log("Error: List name should be a string");
      return res.status(400).json({ error: "List name should be a string" });
    }

    // Assurez-vous que products est une liste
    const productsList = Array.isArray(products) ? products : [products];

    // Crée la liste seulement si l'utilisateur est authentifié
    const newList = await prismadb.list.create({
      data: {
        name,
        image: "",
        products: productsList,
        userId: currentUser.id, // Associe la liste à l'utilisateur authentifié
      },
    });

    // Met à jour l'utilisateur en ajoutant l'ID de la nouvelle liste à la liste des listes enregistrées
const user = await prismadb.user.update({
  where: {
    id: currentUser.id,
  },
  data: {
    registeredListIds: {
      push: newList.id,
    }
  }
});

return res.status(200).json({newList, user});
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Something went wrong" });
  }
}