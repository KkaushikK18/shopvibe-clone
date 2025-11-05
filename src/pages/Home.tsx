import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCarousel } from "@/components/ProductCarousel";
import { CategoryCard } from "@/components/CategoryCard";
import { PromoBanner } from "@/components/PromoBanner";
import { BackToTop } from "@/components/BackToTop";
import { DealTimer } from "@/components/DealTimer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, Truck, Shield, RotateCcw, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { getTotalItems } = useCart();

  const featuredProducts = products.filter((p) => p.badge);
  const electronicsProducts = products.filter((p) => p.category === "Electronics").slice(0, 8);
  const fashionProducts = products.filter((p) => p.category === "Fashion").slice(0, 8);
  const homeKitchenProducts = products.filter((p) => p.category === "Home & Kitchen").slice(0, 8);
  const beautyProducts = products.filter((p) => p.category === "Beauty & Personal Care").slice(0, 8);
  const sportsProducts = products.filter((p) => p.category === "Sports & Fitness").slice(0, 8);

  const categories = [
    {
      title: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
      link: "/products?category=Electronics",
    },
    {
      title: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
      link: "/products?category=Fashion",
    },
    {
      title: "Home & Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
      link: "/products?category=Home%20%26%20Kitchen",
    },
    {
      title: "Beauty & Personal Care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
      link: "/products?category=Beauty%20%26%20Personal%20Care",
    },
    {
      title: "Sports & Fitness",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
      link: "/products?category=Sports%20%26%20Fitness",
    },
    {
      title: "Toys & Games",
      image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=500&q=80",
      link: "/products?category=Toys%20%26%20Games",
    },
    {
      title: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
      link: "/products?category=Books",
    },
    {
      title: "Automotive",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80",
      link: "/products?category=Automotive",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar cartCount={getTotalItems()} />
      <PromoBanner />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Benefits Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% secure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Pay on Delivery</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Deals of the Day */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Today's Deals</h2>
              <DealTimer />
            </div>
            <Link to="/products">
              <Button variant="ghost" className="text-primary hover:text-primary-hover">
                See all deals
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Electronics Carousel */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <ProductCarousel
            title="Best of Electronics"
            products={electronicsProducts}
            viewAllLink="/products?category=Electronics"
          />
        </section>

        {/* Fashion Carousel */}
        {fashionProducts.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <ProductCarousel
              title="Fashion Trends"
              products={fashionProducts}
              viewAllLink="/products?category=Fashion"
            />
          </section>
        )}

        {/* Home & Kitchen Carousel */}
        {homeKitchenProducts.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <ProductCarousel
              title="Home & Kitchen Essentials"
              products={homeKitchenProducts}
              viewAllLink="/products?category=Home%20%26%20Kitchen"
            />
          </section>
        )}

        {/* Beauty Carousel */}
        {beautyProducts.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <ProductCarousel
              title="Beauty & Personal Care"
              products={beautyProducts}
              viewAllLink="/products?category=Beauty%20%26%20Personal%20Care"
            />
          </section>
        )}

        {/* Sports Carousel */}
        {sportsProducts.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <ProductCarousel
              title="Sports & Fitness"
              products={sportsProducts}
              viewAllLink="/products?category=Sports%20%26%20Fitness"
            />
          </section>
        )}
      </div>

      {/* Back to Top Button */}
      <div className="bg-nav-secondary hover:bg-nav transition-colors cursor-pointer">
        <div className="container mx-auto px-4 py-4 text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white text-sm font-medium">
            Back to top
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-nav">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold text-white">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Press Releases</a></li>
                <li><a href="#" className="hover:underline">Amazon Science</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
                <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
                <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
                <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">Amazon Payment Products</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">Amazon Business Card</a></li>
                <li><a href="#" className="hover:underline">Shop with Points</a></li>
                <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold text-white">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:underline">Your Account</a></li>
                <li><a href="#" className="hover:underline">Your Orders</a></li>
                <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
                <li><a href="#" className="hover:underline">Manage Your Content</a></li>
                <li><a href="#" className="hover:underline">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-nav-secondary">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">amazon</span>
                <span className="text-xs text-white">.in</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-300">
                <a href="#" className="hover:underline">Conditions of Use</a>
                <a href="#" className="hover:underline">Privacy Notice</a>
                <a href="#" className="hover:underline">Interest-Based Ads</a>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-400">
              <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Home;
