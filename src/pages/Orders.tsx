import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle, Clock, Search, MapPin, FileText, Star, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/orders" } } });
    }
  }, [isAuthenticated, navigate]);

  // Mock orders data (in real app, this would come from backend)
  const orders = [
    {
      id: "404-8234567-1234567",
      date: "5 November 2024",
      deliveryDate: "8 November 2024",
      total: 144900,
      status: "Delivered",
      deliveryAddress: "Chennai, Tamil Nadu 600127",
      paymentMethod: "UPI",
      items: [
        {
          id: "1",
          title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
          image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/a/r/5/-original-imagtc3kcmph6ax5.jpeg?q=90",
          quantity: 1,
          price: 144900,
          seller: "Apple India",
        },
      ],
    },
    {
      id: "404-9876543-7654321",
      date: "3 November 2024",
      deliveryDate: "6 November 2024",
      total: 32989,
      status: "In Transit",
      deliveryAddress: "Chennai, Tamil Nadu 600127",
      paymentMethod: "Credit Card",
      trackingInfo: "Out for delivery",
      items: [
        {
          id: "2",
          title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
          image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&q=80",
          quantity: 1,
          price: 29990,
          seller: "Sony Official Store",
        },
        {
          id: "3",
          title: "Samsung 128GB MicroSD Card",
          image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=200&q=80",
          quantity: 1,
          price: 2999,
          seller: "Samsung India",
        },
      ],
    },
    {
      id: "404-1122334-9988776",
      date: "28 October 2024",
      deliveryDate: "31 October 2024",
      total: 2499,
      status: "Processing",
      deliveryAddress: "Chennai, Tamil Nadu 600127",
      paymentMethod: "Cash on Delivery",
      items: [
        {
          id: "4",
          title: "Boat Airdopes 141 Wireless Earbuds",
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
          quantity: 1,
          price: 2499,
          seller: "Boat Lifestyle",
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "Processing":
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "In Transit":
        return "text-blue-600";
      case "Processing":
        return "text-orange-500";
      default:
        return "text-muted-foreground";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.items.some((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || order.id.includes(searchQuery);

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "delivered" && order.status === "Delivered") ||
      (selectedFilter === "in-transit" && order.status === "In Transit") ||
      (selectedFilter === "processing" && order.status === "Processing");

    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Orders</h1>
          <p className="text-sm text-muted-foreground">
            Track, return, or buy things again
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search all orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="in-transit">In Transit</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-16 text-center">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              {searchQuery ? "No orders found" : "No orders yet"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Looks like you haven't placed any orders yet"}
            </p>
            <Button onClick={() => navigate("/products")} className="bg-primary hover:bg-primary-hover">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Order Placed</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Total</p>
                      <p className="font-medium">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase mb-1">Ship To</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user?.name || "Customer"}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs text-muted-foreground uppercase mb-1">Order # {order.id}</p>
                      <div className="flex gap-2 mt-1 justify-start md:justify-end">
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">
                          View order details
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status Banner */}
                <div className={`px-6 py-3 border-b ${order.status === 'Delivered' ? 'bg-green-50' : order.status === 'In Transit' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`font-semibold ${getStatusColor(order.status)}`}>
                      {order.status === 'Delivered' 
                        ? `Delivered ${order.deliveryDate}` 
                        : order.status === 'In Transit'
                        ? `Arriving ${order.deliveryDate}`
                        : 'Order is being prepared'}
                    </span>
                  </div>
                  {order.trackingInfo && (
                    <p className="text-sm text-muted-foreground mt-1 ml-7">{order.trackingInfo}</p>
                  )}
                </div>

                {/* Order Items */}
                <div className="p-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className={`flex gap-4 ${idx > 0 ? 'mt-6 pt-6 border-t' : ''}`}>
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-32 h-32 object-cover rounded border hover:shadow-md transition-shadow"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="hover:text-primary">
                          <h4 className="font-medium mb-1 line-clamp-2">{item.title}</h4>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          Sold by: {item.seller}
                        </p>
                        <p className="text-lg font-semibold text-price mb-3">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {order.status === "Delivered" ? (
                            <>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                <Star className="h-4 w-4 mr-1" />
                                Write a product review
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                Buy it again
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                Return or replace items
                              </Button>
                            </>
                          ) : order.status === "In Transit" ? (
                            <>
                              <Button variant="default" size="sm" className="bg-primary hover:bg-primary-hover">
                                <Truck className="h-4 w-4 mr-1" />
                                Track package
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                View or edit order
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                View or edit order
                              </Button>
                              <Button variant="outline" size="sm" className="border-gray-300">
                                Cancel items
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>Payment: {order.paymentMethod}</span>
                      <span>•</span>
                      <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                    </div>
                    <Button variant="link" size="sm" className="text-blue-600 h-auto p-0">
                      Archive order
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Need help with your orders?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto py-3">
              <FileText className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Returns & Refunds</p>
                <p className="text-xs text-muted-foreground">Manage your returns</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3">
              <Package className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Track Package</p>
                <p className="text-xs text-muted-foreground">Check delivery status</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3">
              <FileText className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Customer Service</p>
                <p className="text-xs text-muted-foreground">Get help with orders</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
