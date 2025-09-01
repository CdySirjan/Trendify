import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

// Define types for props
interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  sizes: string[];
  category: string;
  subCategory: string;
}

interface ProductProps {
  product: ProductType;
  currency: string;
  addToCart: (id: string, size: string) => void;
}

const Product: React.FC<ProductProps> = ({ product, currency, addToCart }) => {
  const [image, setImage] = useState<string>(product.image[0]);
  const [size, setSize] = useState<string>("");

  // Reset image when product changes
  useEffect(() => {
    if (product?.image?.length > 0) {
      setImage(product.image[0]);
    }
  }, [product]);

  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  image === item ? "border-2 border-gray-600 py-2 px-2" : ""
                }`}
                alt={product.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt={product.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_icon} alt="Star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="Star Dull" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          {/* Size Selector */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setSize(s)}
                  className={`border py-2 px-4 bg-gray-100 rounded-md ${
                    s === size ? "border-orange-500" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, size)}
            className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>
            Elevate your style with our meticulously crafted Trendify quality
            products. Designed with a perfect balance of elegance and
            practicality, these Trendify quality products are made from premium
            materials that ensure both durability and comfort.
          </p>
          <p>
            Whether you're dressing up for a special occasion or adding a touch
            of sophistication to your everyday look, the Trendify quality
            products offer unparalleled versatility. Its timeless design,
            coupled with a flawless fit, makes it a must-have addition to any
            wardrobe. Don’t miss out on the chance to own a piece that combines
            both form and function—experience the difference today.
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
