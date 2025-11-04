import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={0} />
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Add items to your cart to see them here
            </p>
            <Link to="/products">
              <Button className="mt-6 bg-primary hover:bg-primary-hover">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 8300 ? 0 : 830;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-4">
                <Link to={`/product/₹{item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-32 w-32 rounded object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/product/₹{item.id}`}>
                      <h3 className="font-semibold hover:text-primary">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{item.brand}</p>
                    <p className="mt-2 text-xl font-bold text-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          if (item.quantity > 1) {
                            setUpdatingItem(item.id);
                            updateQuantity(item.id, item.quantity - 1);
                            setTimeout(() => setUpdatingItem(null), 300);
                          }
                        }}
                        disabled={item.quantity <= 1 || updatingItem === item.id}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          if (item.quantity < item.stock) {
                            setUpdatingItem(item.id);
                            updateQuantity(item.id, item.quantity + 1);
                            setTimeout(() => setUpdatingItem(null), 300);
                          } else {
                            toast.error(`Only ${item.stock} items available in stock`);
                          }
                        }}
                        disabled={item.quantity >= item.stock || updatingItem === item.id}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        removeFromCart(item.id);
                      }}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>

                  {item.quantity >= item.stock && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      <span>Maximum quantity reached</span>
                    </div>
                  )}

                  {item.stock < 10 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-600">
                      <AlertCircle className="h-3 w-3" />
                      <span>Only {item.stock} left in stock</span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({getTotalItems()} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `$₹{shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-price">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {subtotal < 8300 && (
                <div className="mt-4 p-3 bg-accent rounded-lg">
                  <div className="flex items-start gap-2">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Add ₹{(8300 - subtotal).toLocaleString('en-IN')} more for FREE shipping</p>
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${Math.min((subtotal / 8300) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {subtotal >= 8300 && (
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2 text-success">
                    <Truck className="h-5 w-5" />
                    <p className="text-sm font-medium">You qualify for FREE shipping!</p>
                  </div>
                </div>
              )}

              <Button
                className="mt-6 w-full bg-primary hover:bg-primary-hover"
                size="lg"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error("Please login to continue");
                    navigate("/login", { state: { from: { pathname: "/checkout" } } });
                  } else {
                    navigate("/checkout");
                  }
                }}
              >
                {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
              </Button>

              <Link to="/products">
                <Button variant="outline" className="mt-3 w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
