import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavbarProps {
  cartCount?: number;
}

export const Navbar = ({ cartCount = 0 }: NavbarProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-nav shadow-md">
      {/* Top bar */}
      <div className="border-b border-nav-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-white tracking-tight">
                  amazon
                </span>
                <span className="text-xs text-white">.in</span>
              </div>
            </Link>

            {/* Delivery location */}
            <button className="hidden items-center gap-1 text-white hover:border hover:border-white/30 p-2 rounded transition-all lg:flex">
              <MapPin className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs text-gray-300">Deliver to</div>
                <div className="text-sm font-bold">Chennai 600127</div>
              </div>
            </button>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-3xl">
              <div className="flex w-full rounded-md overflow-hidden">
                <Input
                  type="search"
                  placeholder="Search Amazon.in"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-0 bg-white focus-visible:ring-2 focus-visible:ring-primary h-10"
                />
                <Button 
                  type="submit"
                  size="icon" 
                  className="rounded-none bg-primary hover:bg-primary-hover h-10 w-12"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Right side links */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:border hover:border-white/30 p-2 rounded">
                      <div className="hidden text-left md:block">
                        <div className="text-xs">Hello, {user?.name}</div>
                        <div className="text-sm font-bold">Account & Lists</div>
                      </div>
                      <User className="md:hidden h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/account")}>
                      Your Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      Your Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:border hover:border-white/30 p-2 rounded">
                    <div className="hidden text-left md:block">
                      <div className="text-xs">Hello, Sign in</div>
                      <div className="text-sm font-bold">Account & Lists</div>
                    </div>
                    <User className="md:hidden h-5 w-5" />
                  </Button>
                </Link>
              )}

              <Link to="/orders">
                <Button variant="ghost" size="sm" className="text-white hover:border hover:border-white/30 p-2 rounded hidden md:block">
                  <div className="text-left">
                    <div className="text-xs">Returns</div>
                    <div className="text-sm font-bold">& Orders</div>
                  </div>
                </Button>
              </Link>

              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative text-white hover:border hover:border-white/30 p-2 rounded flex items-center gap-1">
                  <div className="relative">
                    <ShoppingCart className="h-8 w-8" />
                    {cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-sm hidden md:inline">Cart</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-nav-secondary">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center gap-6 overflow-x-auto scrollbar-hide">
            <Link to="/products" className="flex items-center gap-1 text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              <Menu className="h-4 w-4" />
              All
            </Link>
            <Link to="/products?category=Electronics" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Electronics
            </Link>
            <Link to="/products?category=Fashion" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Fashion
            </Link>
            <Link to="/products?category=Home & Kitchen" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Home & Kitchen
            </Link>
            <Link to="/products?category=Books" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Books
            </Link>
            <Link to="/products?category=Sports" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Sports
            </Link>
            <Link to="/products?category=Beauty" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Beauty
            </Link>
            <Link to="/products?category=Toys" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Toys
            </Link>
            <Link to="/products?category=Grocery" className="text-sm text-white hover:border hover:border-white/30 px-2 py-1 rounded whitespace-nowrap font-medium">
              Grocery
            </Link>
            <span className="text-sm text-primary font-bold whitespace-nowrap">Today's Deals</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
