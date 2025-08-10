import React, { useState } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

const SimpleLoginPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If user is already signed in, redirect to dashboard
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      // Sign in with Clerk
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        // Successfully signed in, create session
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        // Additional verification might be required
        console.log("Additional verification required:", result.status);
        setError("Additional verification required. Please check your email or try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Handle specific Clerk errors
      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError("No account found with this email address.");
      } else if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err.errors?.[0]?.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading Clerk...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Welcome Back to VibeBot</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded font-medium transition-colors"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoginPage;
