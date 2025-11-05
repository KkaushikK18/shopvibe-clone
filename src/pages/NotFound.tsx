import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Home, Search, Package } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Dog Image (Amazon style) */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
              alt="Lost dog"
              className="mx-auto w-64 h-64 object-cover rounded-lg"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Looking for something?
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            We're sorry. The Web address you entered is not a functioning page on our site.
          </p>
          
          <p className="text-muted-foreground mb-8">
            Go to Amazon.in's <button onClick={() => navigate("/")} className="text-primary hover:underline">Home Page</button>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary-hover"
              size="lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Button>
            <Button
              onClick={() => navigate("/products")}
              variant="outline"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </div>

          {/* Help Links */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <button onClick={() => navigate("/products?category=Electronics")} className="text-primary hover:underline">
                Electronics
              </button>
              <button onClick={() => navigate("/products?category=Fashion")} className="text-primary hover:underline">
                Fashion
              </button>
              <button onClick={() => navigate("/products?category=Home & Kitchen")} className="text-primary hover:underline">
                Home & Kitchen
              </button>
              <button onClick={() => navigate("/products?category=Books")} className="text-primary hover:underline">
                Books
              </button>
              <button onClick={() => navigate("/products?category=Sports & Fitness")} className="text-primary hover:underline">
                Sports & Fitness
              </button>
              <button onClick={() => navigate("/products?category=Beauty & Personal Care")} className="text-primary hover:underline">
                Beauty
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
