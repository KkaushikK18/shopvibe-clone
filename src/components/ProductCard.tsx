import { Link } from "react-router-dom";
import { Star, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {product.badge && (
            <Badge className="absolute left-2 top-2 bg-badge text-white">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute right-2 top-2 bg-destructive text-white">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-muted-foreground">{product.brand}</p>

          {/* Title */}
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-card-foreground group-hover:text-primary">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-rating text-rating"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-price">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Delivery */}
          {product.isPrime && (
            <div className="mt-2 flex items-center gap-1 text-xs text-success">
              <Truck className="h-3 w-3" />
              <span>FREE Delivery {product.delivery}</span>
            </div>
          )}

          {/* Stock */}
          {product.stock < 50 && (
            <p className="mt-2 text-xs text-destructive">
              Only {product.stock} left in stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
