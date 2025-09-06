import React, { useState, useEffect } from "react";
import { productAPI } from "../services/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  image: string[];
}

const List: React.FC = () => {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await productAPI.getAllProducts();
      setListProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete product from API
  const removeProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await productAPI.deleteProduct(id);
      setListProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Format currency
  const formatCurrency = (value: number): string =>
    `₨ ${value.toLocaleString()}`;

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="p-2 mb-4 text-white bg-red-500 rounded">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="p-4 text-center">Loading products...</div>
      ) : listProducts.length === 0 ? (
        <div className="p-4 text-center">No products found.</div>
      ) : (
        <>
          {/* List Table Title */}
          <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-xl text-center">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Category</b>
            <b>Sub Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* Display Products */}
          {listProducts.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
            >
              <img className="w-12" src={item.image[0]} alt={item.name} />
              <p className="text-left">{item.name}</p>
              <p className="text-left">{item.description}</p>
              <p>{item.category}</p>
              <p>{item.subCategory}</p>
              <p>{formatCurrency(item.price)}</p>
              <p
                onClick={() => removeProduct(item._id)}
                className="font-bold text-center text-white bg-red-500 rounded-full cursor-pointer md:text-center max-w-7"
              >
                X
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default List;
