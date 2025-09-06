import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string[];
  };
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Orders must be used within a ShopContextProvider");
  }

  const { currency } = context;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call an API endpoint here
        // const response = await orderAPI.getUserOrders();
        // setOrders(response.data);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setOrders([
          {
            _id: "order1",
            items: [
              {
                product: {
                  _id: "product1",
                  name: "Classic White T-Shirt",
                  price: 29.99,
                  image: ["https://via.placeholder.com/150"]
                },
                quantity: 1,
                size: "M"
              }
            ],
            totalAmount: 29.99,
            status: "Processing",
            createdAt: "2024-07-25T00:00:00.000Z"
          },
          {
            _id: "order2",
            items: [
              {
                product: {
                  _id: "product2",
                  name: "Black Denim Jeans",
                  price: 59.99,
                  image: ["https://via.placeholder.com/150"]
                },
                quantity: 1,
                size: "L"
              }
            ],
            totalAmount: 59.99,
            status: "Shipped",
            createdAt: "2024-07-20T00:00:00.000Z"
          }
        ]);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 border-t">
        <div className="text-2xl">
          <Title text1="YOUR" text2="ORDERS" />
        </div>
        <div className="flex justify-center py-10">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 border-t">
        <div className="text-2xl">
          <Title text1="YOUR" text2="ORDERS" />
        </div>
        <div className="flex justify-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1="YOUR" text2="ORDERS" />
      </div>
      <div>
        {orders.length === 0 ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">You have no orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:items-center md:justify-between"
            >
              {order.items.map((item) => (
                <div className="flex items-start gap-6 text-sm" key={item.product._id}>
                  <img 
                    className="w-16 sm:w-20" 
                    src={item.product.image?.[0] ?? "https://via.placeholder.com/150"} 
                    alt={item.product.name} 
                  />
                  <div>
                    <p className="font-medium sm:text-base">{item.product.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}&nbsp;
                        {item.product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p>Quantity:&nbsp;{item.quantity}</p>
                      <p>Size:&nbsp;{item.size}</p>
                    </div>
                    <p className="mt-2">
                      Date:&nbsp;
                      <span className="text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className={`h-2 rounded-full min-w-2 ${order.status === 'Shipped' ? 'bg-green-500' : 'bg-yellow-500'}`}></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium border rounded-sm">
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
