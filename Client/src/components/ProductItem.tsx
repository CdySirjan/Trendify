import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

type ProductItemProps = {
  id: string;
  image: string[]; 
  name: string;
  price: number;
};

const ProductItem: React.FC<ProductItemProps> = ({ id, image, name, price }) => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ProductItem must be used within a ShopContextProvider");
  }

  const { currency } = context;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}&nbsp;
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductItem;
