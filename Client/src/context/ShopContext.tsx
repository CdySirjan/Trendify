import React, { createContext, useEffect, useState, ReactNode } from "react";
import { products as productsFromAssets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export type CartItems = {
  [itemId: string]: { [size: string]: number };
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string[];
  sizes?: string[];
  description?: string;
  category?: string;
  subCategory?: string;
};

type ShopContextType = {
  products: Product[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: ReturnType<typeof useNavigate>;
};

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [products] = useState<Product[]>(productsFromAssets);
  const navigate = useNavigate();

  const currency = "NRS";
  const delivery_fee = 10;

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId: string, size: string) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    const cartData: CartItems = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    const cartData: CartItems = structuredClone(cartItems);
    if (quantity === 0) {
      toast.success("Item Removed From The Cart");
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += (product.price || 0) * cartItems[itemId][size];
      }
    }
    return total;
  };

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
