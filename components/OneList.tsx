import React, { useState } from "react";
import useOneList from "@/hooks/useOneList";

interface OneListProps {
    listId: string;

}

const OneList: React.FC<OneListProps> = ({ listId }) => {
    const { data, error, isLoading } = useOneList(listId);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const toggleCrossOutProduct = (product: string) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter(item => item !== product));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
       <div>
  <h2 className="text-white text-xl uppercase font-semibold mb-4">{data?.name}</h2>
  <ul className="text-white">
    {data?.products.map((product:string, index:number) => (
      <li
      key={index}
      className={selectedProducts.includes(product) ? "line-through decoration-2" : ""}
      onClick={() => toggleCrossOutProduct(product)}
  >
      {product}
  </li>
    ))}
  </ul>
</div>

    );
};

export default OneList;
