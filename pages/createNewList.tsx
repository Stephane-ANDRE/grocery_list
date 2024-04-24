import Navbar from "@/components/Navbar";
import HandleProduct from "@/components/HandleProduct";
import HandleCreate from "@/components/HandleCreateList";
import HandleEdit from "@/components/HandleEditList";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewList() {
  const router = useRouter();
  const [listName, setListName] = useState("");
  const [products, setProducts] = useState<string[]>([]);


  return (
    <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <nav className="p-10 flex justify-center"></nav>
      <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-xl font-semibold mb-4">Créer une nouvelle liste</h2>

          {/* Liste des produits */}
          <HandleEdit listName = {listName}  setListName = {setListName} />

          {/* Section pour ajouter des produits */}
          <HandleProduct products={products} setProducts={setProducts} />
          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            {/* Formulaire de création de liste */}
            <HandleCreate listName = {listName} products={products} />
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