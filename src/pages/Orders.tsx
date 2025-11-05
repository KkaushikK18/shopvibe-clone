import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

const Orders = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/orders" } } });
    }
  }, [isAuthenticated, navigate]);

  // Mock orders data (in real app, this would come from backend)
  const orders = [
    {
      id: "ORD-2024-001",
      date: "November 3, 2024",
      total: 45999,
      status: "Delivered",
      items: [
        {
          title: "Apple iPhone 15 Pro Max 256GB",
          image: "https://images.unsplash.com/photo-1696446702183-cbd50c6e8e0c?w=200&q=80",
          quantity: 1,
          price: 144900,
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "November 1, 2024",
      total: 12449,
      status: "In Transit",
      items: [
        {
          title: "Sony WH-1000XM5 Wireless Headphones",
          image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&q=80",
          quantity: 1,
          price: 29990,
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-primary" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't placed any orders yet
            </p>
            <Button onClick={() => navigate("/products")} className="bg-primary hover:bg-primary-hover">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border bg-card p-6">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">{order.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-price">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-lg font-semibold text-price mt-2">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Track Package
                  </Button>
                  <Button variant="outline" size="sm">
                    View Invoice
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      Return Items
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
