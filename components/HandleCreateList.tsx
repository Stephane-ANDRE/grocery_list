import { useState } from "react";
import Modal from "@/components/Modal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

interface Props {
  listName: string;
  products: string[];
}

const HandleCreate = ({ listName, products }: Props) => {
  const router = useRouter();
  const { data: currentUserData } = useCurrentUser(); // Utilisation du hook useCurrentUser
  const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur
  const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer la modal

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
            products: products, // Utiliser la variable products transmise depuis le composant parent
            userId: currentUserData.id // Ajouter l'ID de l'utilisateur à la création de la liste
          }),
        });
  
        if (response.ok) {
          // Extraire les données de la réponse
          const responseData = await response.json();
          console.log("List created successfully:", responseData);
  
          // Rediriger l'utilisateur ou effectuer d'autres actions après la création de la liste
          router.push(`/${responseData.newList.id}`);
        } else {
          if (response.status === 400) {
            // Si la création de liste échoue avec un statut 400 (Bad Request)
            const errorData = await response.json();
            setErrorMessage(errorData.message);
            setShowModal(true);
          } else {
            console.error('Failed to create list:', response.status, response.statusText);
          }
        }
      } else {
        console.warn("No current user data available or list name is empty."); // Warning if current user data is not available or list name is empty
      }
    } catch (error) {
      console.error('Error creating list:', error); // Logging errors encountered during list creation
    }
  };
  

  return (
    <div>
      {/* Button to create the list */}
      <button
        className=" bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md"
        onClick={handleCreateList}
      >
        Créer la liste
      </button>
      
      {/* Modal for displaying error message */}
      {showModal && <Modal onClose={handleCloseModal} message={errorMessage} />}
    </div>
  );
};

export default HandleCreate;
