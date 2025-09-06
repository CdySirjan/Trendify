import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  products: Array<{
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await orderAPI.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await orderAPI.updateOrderStatus(id, newStatus);
      setOrders(prev => 
        prev.map(order => 
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  // Format currency
  const formatCurrency = (value: number): string =>
    `₨ ${value.toLocaleString()}`;

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Customer Orders</h1>
      
      {error && (
        <div className="p-2 mb-4 text-white bg-red-500 rounded">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="p-4 text-center">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="p-4 text-center">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex flex-wrap justify-between gap-2 mb-2">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>Date: {formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p>Customer: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
              </div>
              <div>
                <p>Total: {formatCurrency(order.totalAmount)}</p>
                <div className="flex items-center gap-2">
                  <p>Status:</p>
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="mb-2 font-semibold">Products:</p>
              <div className="grid grid-cols-[1fr_auto_auto] gap-2 text-sm">
                <p className="font-medium">Item</p>
                <p className="font-medium">Quantity</p>
                <p className="font-medium">Price</p>
                
                {order.products.map((item, index) => (
                  <React.Fragment key={index}>
                    <p>{item.product.name}</p>
                    <p className="text-center">{item.quantity}</p>
                    <p>{formatCurrency(item.product.price * item.quantity)}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;