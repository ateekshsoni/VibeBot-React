import React from "react";
import { SignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ClerkLoginPage = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const navigate = useNavigate();

  // Wait for both auth and user to load
  const isLoaded = authLoaded && userLoaded;

  // Only redirect if fully authenticated
  React.useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("✅ User authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already signed in, show redirect message
  if (isSignedIn && user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 text-center text-white max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            Welcome back, {user.firstName}!
          </h2>
          <p className="mb-6 text-gray-300">Redirecting to dashboard...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg">
            Sign in to continue your Instagram automation journey
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
          
          <div className="relative">
            <SignIn
              routing="path"
              path="/sign-in"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl="/dashboard"
              signUpUrl="/signup"
              appearance={{
                elements: {
                  rootBox: {
                    width: "100%",
                  },
                  card: {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    border: "none",
                    padding: "0",
                  },
                  header: {
                    display: "none",
                  },
                  headerTitle: {
                    display: "none",
                  },
                  headerSubtitle: {
                    display: "none",
                  },
                  formButtonPrimary: {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontSize: "16px",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                    },
                  },
                  formFieldInput: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:focus": {
                      borderColor: "#667eea",
                      outline: "none",
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.6)",
                    },
                  },
                  formFieldLabel: {
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  },
                  footerActionText: {
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                  },
                  footerActionLink: {
                    color: "#a855f7",
                    fontWeight: "600",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#9333ea",
                      textDecoration: "underline",
                    },
                  },
                  socialButtonsBlockButton: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    borderRadius: "12px",
                    padding: "12px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      transform: "translateY(-1px)",
                    },
                  },
                  dividerLine: {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    height: "1px",
                  },
                  dividerText: {
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  formFieldErrorText: {
                    color: "#f87171",
                    fontSize: "13px",
                    fontWeight: "500",
                  },
                  alertText: {
                    color: "#f87171",
                    backgroundColor: "rgba(248, 113, 113, 0.1)",
                    border: "1px solid rgba(248, 113, 113, 0.3)",
                    borderRadius: "8px",
                    padding: "12px",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm">
            By signing in, you agree to our{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ClerkLoginPage;
