import React, { useState } from "react";
import Input from "@/components/Input";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface HandleProductProps {
  products: string[]; // Liste des produits
  setProducts: React.Dispatch<React.SetStateAction<string[]>>; // Fonction pour mettre à jour la liste de produits
}

const HandleProduct: React.FC<HandleProductProps> = ({ products, setProducts }) => {
  const [product, setProduct] = useState(""); // State pour gérer la valeur de l'input pour un produit
  const [editedProductName, setEditedProductName] = useState(""); // State pour gérer le nom édité du produit
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null); // State pour garder une trace de l'index du produit en cours d'édition

  // Fonction pour ajouter un produit
  const handleAddProduct = () => {
    if (product.trim() !== "") {
      // Ajouter le produit à la liste des produits
      setProducts([...products, product.trim()]);
      // Réinitialiser la valeur de l'input
      setProduct("");
    }
  };

  // Fonction pour supprimer un produit
  const handleRemoveProduct = (index: number) => {
    // Supprimer le produit de la liste
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Fonction pour gérer l'événement de pression d'une touche
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && product.trim() !== "") {
      // Si la touche Entrée est pressée et que l'input pour le produit n'est pas vide, ajouter le produit
      handleAddProduct();
    }
  }

  // Fonction pour activer le mode d'édition d'un produit
  const startEditingProduct = (index: number, productName: string) => {
    setEditedProductName(productName);
    setEditingProductIndex(index);
  };

  // Fonction pour sauvegarder les modifications apportées au nom du produit
  const saveEditedProduct = (index: number) => {
    if (editedProductName.trim() !== "") {
      const updatedProducts = [...products];
      updatedProducts[index] = editedProductName.trim();
      setProducts(updatedProducts);
    }
    setEditingProductIndex(null);
  };

  return (
    <section>
      {/* Champ d'input pour entrer un produit */}
      <div className="flex gap-4 items-center mb-4">
        <Input
          label="Product"
          type="text"
          value={product}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProduct(e.target.value)
          }
          id="text"
          onKeyDown={handleKeyDown}
        />
        {/* Bouton pour ajouter un produit */}
        <AiOutlinePlus
          className="text-white mr-2"
          size={25}
          onClick={handleAddProduct}
        />
      </div>
      {/* Liste des produits */}
      <ul>
        {products.map((item, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              {editingProductIndex === index ? (
                // Afficher le champ d'édition si le produit est en cours d'édition
                <Input
                  type="text"
                  value={editedProductName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedProductName(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      saveEditedProduct(index);
                    }
                  }}
                />
              ) : (
                // Afficher le nom du produit si le produit n'est pas en cours d'édition
                <span className="text-white">{item}</span>
              )}
              <div className="flex">
                {editingProductIndex === index ? (
                  // Afficher l'icône de sauvegarde si le produit est en cours d'édition
                  <AiOutlineEdit
                    className="text-blue-500 mr-2 cursor-pointer"
                    size={25}
                    onClick={() => saveEditedProduct(index)}
                  />
                ) : (
                  // Afficher l'icône d'édition si le produit n'est pas en cours d'édition
                  <AiOutlineEdit
                    className="text-blue-500 mr-2 cursor-pointer"
                    size={25}
                    onClick={() => startEditingProduct(index, item)}
                  />
                )}
                {/* Bouton pour supprimer un produit */}
                <AiOutlineDelete
                  className="text-red-500 cursor-pointer"
                  size={25}
                  onClick={() => handleRemoveProduct(index)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HandleProduct;
