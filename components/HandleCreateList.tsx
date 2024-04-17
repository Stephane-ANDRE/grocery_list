import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const HandleCreate = () => {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const { data: currentUserData } = useCurrentUser(); // Utilisation du hook useCurrentUser

  // Logging current user data for debugging
  console.log("data:", currentUserData);

  const handleCreateList = async () => {
    try {
      // Vérifier que les données de l'utilisateur sont disponibles et que la liste a un nom
      if (currentUserData && listName.trim() !== "") {
        // Envoyer les données au backend pour créer la liste
        console.log("Creating list with name:", listName);
        const response = await fetch("/api/user/createList", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: listName.trim(),
            products: [], // Ajustez cette partie en fonction de vos besoins
            userId: currentUserData.id // Ajouter l'ID de l'utilisateur à la création de la liste
          }),
        });

        if (response.ok) {
          // Extraire les données de la réponse
          const responseData = await response.json();
          console.log("List created successfully:", responseData);

          // Rediriger l'utilisateur ou effectuer d'autres actions après la création de la liste
          router.push(`/${responseData.id}`);
        } else {
          console.error('Failed to create list:', response.status, response.statusText);
        }
      } else {
        console.warn("No current user data available or list name is empty."); // Warning if current user data is not available or list name is empty
      }
    } catch (error) {
      console.error('Error creating list:', error); // Logging errors encountered during list creation
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
      {/* Button to create the list */}
      <button
        className=" bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md"
        onClick={handleCreateList}
      >
        Créer la liste
      </button>
    </div>
  );
};

export default HandleCreate;
