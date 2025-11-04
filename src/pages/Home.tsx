import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { getTotalItems } = useCart();

  const featuredProducts = products.filter((p) => p.badge);
  const electronicsProducts = products.filter((p) => p.category === "Electronics").slice(0, 4);
  const fashionProducts = products.filter((p) => p.category === "Fashion");

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20">
        <div className="container mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Shop millions of products with fast, free delivery
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Deals of the Day */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Deals of the Day</h2>
            <Link to="/products">
              <Button variant="ghost" className="text-primary hover:text-primary-hover">
                See all deals
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Electronics */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Top Electronics</h2>
            <Link to="/products?category=Electronics">
              <Button variant="ghost" className="text-primary hover:text-primary-hover">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Fashion */}
        {fashionProducts.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Fashion Picks</h2>
              <Link to="/products?category=Fashion">
                <Button variant="ghost" className="text-primary hover:text-primary-hover">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fashionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-nav">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold text-secondary-foreground">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Press Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-secondary-foreground">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sell products</a></li>
                <li><a href="#" className="hover:text-primary">Become an Affiliate</a></li>
                <li><a href="#" className="hover:text-primary">Advertise Your Products</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-secondary-foreground">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Your Account</a></li>
                <li><a href="#" className="hover:text-primary">Your Orders</a></li>
                <li><a href="#" className="hover:text-primary">Returns & Replacements</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-secondary-foreground">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Customer Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ShopVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
