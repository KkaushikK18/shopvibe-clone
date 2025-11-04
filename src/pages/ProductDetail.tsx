import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Star, Truck, MapPin, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={getTotalItems()} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square cursor-pointer overflow-hidden rounded border hover:border-primary"
                  >
                    <img
                      src={img}
                      alt={`₹{product.title} ₹{idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ₹{
                      i < Math.floor(product.rating)
                        ? "fill-rating text-rating"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} out of 5
              </span>
              <span className="text-sm text-primary">
                ({product.reviews.toLocaleString()} ratings)
              </span>
            </div>

            <div className="border-b pb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-price">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-lg font-medium text-destructive">
                      ({discount}% off)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 font-semibold">About this item</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-3 font-semibold">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 rounded-lg border bg-accent/50 p-4">
              {product.isPrime && (
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-success" />
                  <span className="font-medium">FREE Delivery {product.delivery}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Deliver to New York 10001</span>
              </div>
              {product.stock < 50 && (
                <p className="text-sm font-medium text-destructive">
                  Only {product.stock} left in stock - order soon
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="rounded border bg-background px-3 py-2 w-20"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary hover:bg-primary-hover"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <span>Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
