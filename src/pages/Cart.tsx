import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

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
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
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
                <p className="mt-3 text-sm text-muted-foreground">
                  Add ₹{(8300 - subtotal).toLocaleString('en-IN')} more for FREE shipping
                </p>
              )}

              <Button
                className="mt-6 w-full bg-primary hover:bg-primary-hover"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
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
