import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/data/products";

interface OrderItem {
  id: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
  seller: string;
}

export interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  total: number;
  status: "Processing" | "In Transit" | "Delivered";
  deliveryAddress: string;
  paymentMethod: string;
  trackingInfo?: string;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: Omit<Order, "id" | "date" | "deliveryDate" | "status">) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders from localStorage on init
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000000);
    return `404-${timestamp.toString().slice(-7)}-${random.toString().padStart(7, '0')}`;
  };

  const addOrder = (orderData: Omit<Order, "id" | "date" | "deliveryDate" | "status">) => {
    const now = new Date();
    const deliveryDate = new Date(now);
    deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days delivery

    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      deliveryDate: deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: "Processing",
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
};
