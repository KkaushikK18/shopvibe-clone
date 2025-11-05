import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

const Products = () => {
  const { getTotalItems } = useCart();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const [minRating, setMinRating] = useState<number>(0);

  // Update selected categories when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= minRating;
      
      // Enhanced search functionality
      if (!searchQuery) {
        return categoryMatch && priceMatch && ratingMatch;
      }

      const query = searchQuery.toLowerCase().trim();
      const searchTerms = query.split(' ').filter(term => term.length > 0);
      
      // Search in multiple fields
      const searchableText = [
        product.title,
        product.brand,
        product.category,
        product.description,
        ...product.features,
      ].join(' ').toLowerCase();

      // Check if all search terms are present (AND logic)
      const searchMatch = searchTerms.every(term => 
        searchableText.includes(term)
      );

      return categoryMatch && priceMatch && ratingMatch && searchMatch;
    });
  }, [selectedCategories, priceRange, minRating, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="space-y-4 border-b pb-4">
                <h3 className="font-medium">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="cursor-pointer text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-4 border-b py-4">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={250000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={(checked) =>
                          setMinRating(checked ? rating : 0)
                        }
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="cursor-pointer text-sm"
                      >
                        {rating}+ Stars
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                {searchQuery 
                  ? `Search results for "${searchQuery}"`
                  : categoryParam 
                  ? `${categoryParam} Products` 
                  : "All Products"}
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} results
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  No products found matching your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
