import React, { useState } from "react";

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
  const [listProducts, setListProducts] = useState<Product[]>([
    {
      _id: "1",
      name: "Sample T-Shirt",
      description: "Comfortable cotton T-shirt",
      category: "Men",
      subCategory: "Topwear",
      price: 1200,
      image: ["https://via.placeholder.com/100"],
    },
    {
      _id: "2",
      name: "Winter Jacket",
      description: "Warm jacket for cold weather",
      category: "Women",
      subCategory: "Winterwear",
      price: 4500,
      image: ["https://via.placeholder.com/100"],
    },
  ]);

  // 🟢 Frontend only – just remove item from state
  const removeProduct = (id: string) => {
    setListProducts((prev) => prev.filter((item) => item._id !== id));
  };

  // Format currency
  const formatCurrency = (value: number): string =>
    `₨ ${value.toLocaleString()}`;

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default List;
