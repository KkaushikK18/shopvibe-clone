import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const Checkout = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const subtotal = getTotalPrice();
  const shipping = subtotal > 8300 ? 0 : 830;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    }
  }, [items.length, isAuthenticated, navigate]);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateZip = (zip: string) => {
    const zipRegex = /^\d{6}$/;
    return zipRegex.test(zip);
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpiry = (expiry: string) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) return false;

    const [month, year] = expiry.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
  };

  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zip) {
      newErrors.zip = "ZIP code is required";
    } else if (!validateZip(formData.zip)) {
      newErrors.zip = "Please enter a valid 6-digit PIN code";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!formData.expiry) {
        newErrors.expiry = "Expiry date is required";
      } else if (!validateExpiry(formData.expiry)) {
        newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
      }

      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!validateCVV(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Create order from cart items
      const orderItems = items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        seller: item.brand || "Amazon",
      }));

      // Add order to context
      addOrder({
        total,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
        paymentMethod: paymentMethod === "card" ? "Credit Card" : paymentMethod === "upi" ? "UPI" : "Cash on Delivery",
        items: orderItems,
      });

      toast.success("Order placed successfully! 🎉", {
        description: `Your order of ₹${total.toLocaleString('en-IN')} has been confirmed.`,
      });
      clearCart();
      navigate("/orders");
      setIsLoading(false);
    }, 1500);
  };

  if (items.length === 0 || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={getTotalItems()} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                      disabled={isLoading}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={errors.address ? "border-destructive" : ""}
                      disabled={isLoading}
                      placeholder="House no., Building name, Street"
                    />
                    {errors.address && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.address}</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={errors.city ? "border-destructive" : ""}
                        disabled={isLoading}
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.city}</span>
                        </div>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">PIN Code *</Label>
                      <Input
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => handleInputChange("zip", e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className={errors.zip ? "border-destructive" : ""}
                        disabled={isLoading}
                        placeholder="6-digit PIN"
                        maxLength={6}
                      />
                      {errors.zip && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.zip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={errors.phone ? "border-destructive" : ""}
                      disabled={isLoading}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={(value) => {
                  setPaymentMethod(value);
                  // Clear card errors when switching to COD
                  if (value === "cod") {
                    setErrors({
                      ...errors,
                      cardNumber: undefined,
                      expiry: undefined,
                      cvv: undefined,
                    });
                  }
                }} disabled={isLoading}>
                  <div className="flex items-center space-x-2 p-3 border rounded hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex-1">
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer flex-1">
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer flex-1">
                      UPI
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
                          const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                          handleInputChange("cardNumber", formatted);
                        }}
                        className={errors.cardNumber ? "border-destructive" : ""}
                        disabled={isLoading}
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <div className="flex items-center gap-1 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.cardNumber}</span>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            handleInputChange("expiry", value);
                          }}
                          className={errors.expiry ? "border-destructive" : ""}
                          disabled={isLoading}
                          maxLength={5}
                        />
                        {errors.expiry && (
                          <div className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.expiry}</span>
                          </div>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                          className={errors.cvv ? "border-destructive" : ""}
                          disabled={isLoading}
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <div className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.cvv}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="mt-4 p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium">Cash on Delivery Available</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay when you receive your order. Additional charges may apply.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mt-4 p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You will be redirected to complete the payment via UPI.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} x {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
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

                <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-price">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full bg-primary hover:bg-primary-hover"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - ₹${total.toLocaleString('en-IN')}`
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  By placing your order, you agree to Amazon's privacy notice and conditions of use.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
