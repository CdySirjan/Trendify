import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import type { Product } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

// Props type
type RelatedProductsProps = {
  category: string;
  subCategory: string;
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, subCategory }) => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("RelatedProducts must be used within a ShopContextProvider");
  }

  const { products } = context;
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="py-2 text-3xl text-center">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image ?? []}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
