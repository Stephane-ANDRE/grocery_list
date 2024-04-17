import { useState } from "react";
import Input from "@/components/Input";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const HandleProduct = () => {
  const [product, setProduct] = useState(""); // State for managing the input value for a product
  const [products, setProducts] = useState<string[]>([]); // State for managing the list of products
  const [editingProduct, setIsEditingProduct] = useState<string | null>(null); // State for managing the product being edited

  // Logging product, products, and editingProduct for debugging
  console.log("product:", product);
  console.log("products:", products);
  console.log("editingProduct:", editingProduct);

  // Function to handle editing a product
  const handleEditProduct = (index: number) => {
    // Retrieve the product to edit
    const editingProduct = products[index];
    // Set the input value to the editing product
    setProduct(editingProduct);
    // Remove the product from the list
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    // Update the state to indicate editing mode
    setIsEditingProduct(editingProduct);
  };

  // Function to handle adding a product
  const handleAddProduct = () => {
    if (product.trim() !== "") {
      // Add the product to the list of products
      setProducts([...products, product.trim()]);
      // Reset the input value
      setProduct("");
    }
  };

  // Function to handle removing a product
  const handleRemoveProduct = (index: number) => {
    // Remove the product from the list
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Function to handle key down event
  function handleKeyDown(e: any) {
    if (e.key === "Enter" && product.trim() !== "") {
      // If Enter key is pressed and product input is not empty, add the product
      handleAddProduct();
    }
  }

  return (
    <section>
      {/* Input field for entering a product */}
      <div className="flex gap-4 items-center mb-4">
        <Input
          label="Product"
          type="text"
          value={product}
          onChange={(e: any) => setProduct(e.target.value)}
          id="text"
          onKeyDown={handleKeyDown}
        />
        {/* Button to add a product */}
        <AiOutlinePlus
          className="text-white mr-2"
          size={25}
          onClick={handleAddProduct}
        />
      </div>
      {/* List of products */}
      <ul>
        {products.map((item, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              {/* Display the product */}
              <span className="text-white">{item}</span>
              <div className="flex">
                {/* Button to edit a product */}
                <AiOutlineEdit
                  className="text-blue-500 cursor-pointer"
                  size={25}
                  onClick={() => handleEditProduct(index)}
                />
                {/* Button to delete a product */}
                <AiOutlineDelete
                  className="text-red-500 mr-2 cursor-pointer"
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
