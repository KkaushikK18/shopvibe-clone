import { Link } from "react-router-dom";
import { MapPin, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NavbarProps {
  cartCount?: number;
}

export const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-nav shadow-md">
      {/* Top bar */}
      <div className="border-b border-nav-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-secondary-foreground">
                  ShopVibe
                </span>
              </div>
            </Link>

            {/* Delivery location */}
            <button className="hidden items-center gap-1 text-secondary-foreground hover:text-primary-foreground lg:flex">
              <MapPin className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Deliver to</div>
                <div className="text-sm font-medium">New York 10001</div>
              </div>
            </button>

            {/* Search bar */}
            <div className="flex flex-1 max-w-2xl">
              <div className="flex w-full">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="rounded-r-none border-0 bg-background focus-visible:ring-0"
                />
                <Button 
                  size="icon" 
                  className="rounded-l-none bg-primary hover:bg-primary-hover"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side links */}
            <div className="flex items-center gap-4">
              <Link to="/account">
                <Button variant="ghost" size="sm" className="text-secondary-foreground hover:text-primary-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <div className="hidden text-left md:block">
                    <div className="text-xs">Hello, Sign in</div>
                    <div className="text-sm font-medium">Account</div>
                  </div>
                </Button>
              </Link>

              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative text-secondary-foreground hover:text-primary-foreground">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                  <span className="ml-2 hidden font-medium md:inline">Cart</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-nav-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center gap-6 overflow-x-auto">
            <button className="flex items-center gap-1 text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              <Menu className="h-4 w-4" />
              All Categories
            </button>
            <Link to="/products?category=Electronics" className="text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/products?category=Fashion" className="text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              Fashion
            </Link>
            <Link to="/products?category=Home & Kitchen" className="text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              Home & Kitchen
            </Link>
            <Link to="/products?category=Books" className="text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              Books
            </Link>
            <Link to="/products?category=Sports" className="text-sm text-secondary-foreground hover:text-primary-foreground whitespace-nowrap">
              Sports
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
