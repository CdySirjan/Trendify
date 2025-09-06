import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContext";
import { productAPI } from "../api/api";
import { toast } from "react-toastify";

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  sizes: string[];
  category: string;
  subCategory: string;
}

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [image, setImage] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const context = useContext(ShopContext);
  
  if (!context) {
    throw new Error("Product must be used within a ShopContextProvider");
  }
  
  const { addToCart } = context;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call the API
        // const response = await productAPI.getProductById(productId!);
        // setProduct(response.data);
        // setImage(response.data.image[0]);
        
        // For now, simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find product in assets
        const foundProduct = context.products.find(p => p._id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct as ProductType);
          setImage(foundProduct.image?.[0] || "");
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSize(foundProduct.sizes[0]);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId, context.products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, index) => (
              <img
                key={index}
                src={item}
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
          <p className="mt-5 text-3xl font-medium">{context.currency}&nbsp;{product.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

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
            onClick={() => {
              if (size) {
                addToCart(product._id, size);
                toast.success(`Added ${product.name} (Size: ${size}) to cart`);
              } else {
                toast.warning("Please select a size");
              }
            }}
            className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            disabled={!size}
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

      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
