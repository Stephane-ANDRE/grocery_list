import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineEdit } from "react-icons/ai"
import useCurrentUser from "@/hooks/useCurrentUser";

export default function NewList() {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const [isListNamed, setIsListNamed] = useState(false); // Ajout d'un état pour vérifier si le nom de la liste est donné
  const [isEditingListName, setIsEditingListName] = useState(false); // Ajout d'un état pour activer le mode d'édition du nom de la liste
  const [editingProduct, setIsEditingProduct] = useState<string | null>(null);
  const { data: currentUserData } = useCurrentUser(); // Utilisation du hook useCurrentUser

  const handleAddProduct = () => {
    if (product.trim() !== "") {
      setProducts([...products, product.trim()]);
      setProduct(""); // Réinitialise le champ de saisie du produit
    }
  };

  const handleEdit = (index: number) => {
    // Récupérer le produit à éditer
    const editingProduct = products[index];
    // Mettre à jour le champ de saisie avec le produit à éditer
    setProduct(editingProduct);
    // Supprimer le produit de la liste
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    // Mettre à jour l'état pour indiquer que nous sommes en mode édition
    setIsEditingProduct(editingProduct);
  };

  const handleRemoveProduct = (index: number) => {
    // Copier le tableau des produits
    const updatedProducts = [...products];
    // Supprimer le produit à l'index spécifié
    updatedProducts.splice(index, 1);
    // Mettre à jour l'état des produits avec le nouveau tableau sans le produit supprimé
    setProducts(updatedProducts);
  };

  function handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  }

  const handleCreateList = async () => {
    try {
      // Vérifier que les données de l'utilisateur sont disponibles et que la liste a un nom
      if (currentUserData && listName.trim() !== "") {
        // Envoyer les données au backend pour créer la liste
        console.log("Creating list with name:", listName, "and products:", products);
        const response = await fetch("/api/user/createList", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: listName.trim(),
            products: products,
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
          console.error('Failed to create list:', response.status, response.statusText);
        }
      } else {
        console.warn("No current user data available or list name is empty.");
      }
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };
  
  // Ajout de consoles log pour afficher le titre de la liste et les produits saisis par l'utilisateur
  console.log("List name:", listName);
  console.log("Products:", products);

  return (
    <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <nav className="p-10 flex justify-center"></nav>
      <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-xl font-semibold mb-4">Créer une nouvelle liste</h2>
          <div className="flex flex-col gap-4">
            {isListNamed ? ( // Condition pour afficher le nom de la liste
              <div className="flex items-center gap-2">
                {isEditingListName ? ( // Condition pour activer le mode d'édition du nom de la liste
                  <Input
                    type="text"
                    value={listName}
                    onChange={(e: any) => setListName(e.target.value)}
                    onKeyDown={(e:any) => {
                      if (e.key === 'Enter') {
                        setIsEditingListName(false); // Désactive le mode d'édition lorsque l'utilisateur appuie sur "Enter"
                      }
                    } }
                    autoFocus // Focus automatique sur le champ lorsqu'il est en mode d'édition
                    id={""} label={""}                  />
                ) : (
                  <p className="text-white uppercase font-bold">{listName}</p>
                )}
                <AiOutlineEdit
                  className="text-blue-500 cursor-pointer "
                  onClick={() => setIsEditingListName(true)} // Active le mode d'édition lorsque l'utilisateur clique sur l'icône d'édition
                />
              </div>
            ) : (
              <Input
                label="Nom de la liste"
                type="text"
                value={listName}
                onChange={(e: any) => setListName(e.target.value)}
                id="text"
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    setIsListNamed(true); // L'utilisateur a donné un nom à la liste
                  }
                }}
              />
            )}
            <div className="flex gap-4 items-center mb-4">
              <Input
                label="Produit"
                type="text"
                value={product}
                onChange={(e: any) => setProduct(e.target.value)}
                id="text"
                onKeyDown={handleKeyDown}
              />
              <AiOutlinePlus className="text-white mr-2" size={25} onClick={handleAddProduct} />
            </div>
          </div>

          <ul>
            {products.map((item, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-white ">{item}</span>
                  <div className="flex">
                    <AiOutlineEdit className="text-blue-500 mr-2 cursor-pointer" size={25} onClick={() => handleEdit(index)} />
                    <AiOutlineDelete className="text-red-500 mr-2 cursor-pointer" size={25} onClick={() => handleRemoveProduct(index)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
          <button
            className=" bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md"
            onClick={handleCreateList}
          >
            Créer la liste
          </button>
          <button
            className=" bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/")}
          >
            Retour
          </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}
