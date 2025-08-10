import React, { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

const SimpleSignupPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

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
      // Create user with Clerk
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Check if signup is complete or needs verification
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else if (result.status === "missing_requirements") {
        // Show email verification step
        setVerificationStep(true);
      } else {
        setError(
          "Signup requires additional verification. Please check your email."
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.errors?.[0]?.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      // Verify email with code
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(
        err.errors?.[0]?.message || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading Clerk...
      </div>
    );
  }

  // Show email verification step if needed
  if (verificationStep) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Verify Your Email
          </h1>
          <p className="text-gray-400 text-center mb-6">
            We've sent a verification code to <strong>{email}</strong>. Please
            enter it below.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleVerification} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none text-center text-lg tracking-widest"
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded font-medium transition-colors"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => {
                setVerificationStep(false);
                setError("");
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Back to signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Sign Up for VibeBot
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email
            </label>
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
            <label className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              placeholder="Choose a strong password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3 rounded font-medium transition-colors"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleSignupPage;
