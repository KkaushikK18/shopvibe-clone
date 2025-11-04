import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <Link to="/" className="flex justify-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-foreground">Amazon</span>
          </div>
        </Link>

        {/* Login Form */}
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-hover"
            >
              Sign In
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
          </p>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                New to Amazon?
              </span>
            </div>
          </div>
          
          <Link to="/register">
            <Button 
              variant="outline" 
              className="w-full mt-4"
            >
              Create your Amazon account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
