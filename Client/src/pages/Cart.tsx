import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, products } from "../assets/assets";
import CartTotal from "../components/CartTotal";

interface CartItem {
  _id: string;
  size: string;
  quantity: number;
}

const Cart: React.FC = () => {
  
  const [cartItems, setCartItems] = useState<Record<string, Record<string, number>>>({});
  const [cartData, setCartData] = useState<CartItem[]>([]);

  // Convert cartItems to a flat array for rendering
  useEffect(() => {
    const tempData: CartItem[] = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({ _id: productId, size, quantity: cartItems[productId][size] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Update quantity or remove item if quantity is 0
  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (quantity <= 0) {
        if (updated[id]) {
          delete updated[id][size];
          if (Object.keys(updated[id]).length === 0) {
            delete updated[id];
          }
        }
      } else {
        if (!updated[id]) updated[id] = {};
        updated[id][size] = quantity;
      }

      return updated;
    });
  };

  const isCartEmpty = cartData.length === 0;

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="grid py-4 text-gray-700 border-t border-b grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm font-medium sm:text-lg">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>Rs.&nbsp;{productData.price}</p>
                    <p className="px-2 border sm:px-3 sm:py-1 bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === ""
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2"
                type="number"
                min={1}
                value={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 cursor-pointer sm:w-5"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}

        {isCartEmpty && (
          <p className="text-center py-10 text-gray-500 text-lg">Your cart is empty.</p>
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className={`px-8 py-3 my-8 text-sm text-white bg-black active:bg-gray-700 ${
                isCartEmpty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isCartEmpty}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
