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
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-primary">
            Products
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/products?category=${product.category}`)}
            className="hover:text-primary"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
        </div>
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
            <div className="space-y-4 rounded-lg border-2 border-gray-300 p-4 bg-white">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded border bg-background px-3 py-2 w-20 cursor-pointer"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] hover:bg-[#FF8F00] text-black font-medium"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>

              <div className="space-y-2 text-sm pt-2 border-t">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RotateCcw className="h-4 w-4 text-success" />
                  <span>30-day easy returns</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Ships from and sold by Amazon.in
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="rounded-lg border p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium">{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium text-success">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-12 space-y-8">
          {/* Technical Details */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Item Weight</span>
                  <span className="font-medium">500 grams</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Manufacturer</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Country of Origin</span>
                  <span className="font-medium">India</span>
                </div>
                <div className="flex">
                  <span className="w-40 text-muted-foreground">Item model number</span>
                  <span className="font-medium">{product.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Summary */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(product.rating)
                        ? "fill-rating text-rating"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{product.rating} out of 5</span>
            </div>
            <p className="text-muted-foreground">
              {product.reviews.toLocaleString()} global ratings
            </p>
            
            {/* Rating Breakdown */}
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = stars === Math.floor(product.rating) ? 70 : stars > product.rating ? 5 : 15;
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12">{stars} star</span>
                    <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-muted-foreground">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Products */}
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-2xl font-bold mb-6">Customers who bought this also bought</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg border bg-muted mb-2">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                      {relatedProduct.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedProduct.rating)
                              ? "fill-rating text-rating"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({relatedProduct.reviews})
                      </span>
                    </div>
                    <p className="text-lg font-bold text-price mt-1">
                      ₹{relatedProduct.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
