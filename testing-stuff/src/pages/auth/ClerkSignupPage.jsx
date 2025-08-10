import React from "react";
import { SignUp, useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ClerkSignupPage = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const navigate = useNavigate();

  // Wait for both auth and user to load
  const isLoaded = authLoaded && userLoaded;

  // Only redirect if fully authenticated and email is verified
  // This prevents interrupting the OTP verification process
  React.useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if user has verified their email (completed the full signup process)
      const hasVerifiedEmail = user.emailAddresses?.some(email => email.verification?.status === "verified");
      
      if (hasVerifiedEmail) {
        console.log("✅ User fully authenticated, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      }
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

  // If user is signed in but still in verification process, let Clerk handle it
  // Don't redirect immediately to allow OTP verification to complete
  if (isSignedIn && user) {
    const hasVerifiedEmail = user.emailAddresses?.some(email => email.verification?.status === "verified");
    
    if (hasVerifiedEmail) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-8 text-center text-white max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {user.firstName}!
            </h2>
            <p className="mb-6 text-gray-300">Your account is ready. Redirecting to dashboard...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-60 animate-ping animation-delay-500"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-80 animate-ping animation-delay-1500"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-ping animation-delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-ping animation-delay-2500"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join VibeBot
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Create your account and revolutionize your Instagram automation
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 rounded-3xl"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full"></div>
          
          <div className="relative">
            <SignUp
              routing="path"
              path="/sign-up"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl="/dashboard"
              signInUrl="/sign-in"
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
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                    fontSize: "16px",
                    padding: "16px 32px",
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: "700",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.5)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 40px rgba(59, 130, 246, 0.7)",
                    },
                  },
                  formFieldInput: {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "2px solid rgba(255, 255, 255, 0.15)",
                    color: "white",
                    padding: "16px 20px",
                    borderRadius: "16px",
                    fontSize: "16px",
                    backdropFilter: "blur(20px)",
                    transition: "all 0.4s ease",
                    "&:focus": {
                      borderColor: "#3b82f6",
                      outline: "none",
                      boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      transform: "translateY(-1px)",
                    },
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                  formFieldLabel: {
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  },
                  footerActionText: {
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "15px",
                  },
                  footerActionLink: {
                    color: "#60a5fa",
                    fontWeight: "600",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#3b82f6",
                      textDecoration: "underline",
                    },
                  },
                  socialButtonsBlockButton: {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "2px solid rgba(255, 255, 255, 0.15)",
                    color: "white",
                    borderRadius: "16px",
                    padding: "14px",
                    backdropFilter: "blur(20px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderColor: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                  },
                  dividerLine: {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    height: "2px",
                  },
                  dividerText: {
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    fontWeight: "600",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                  },
                  formFieldErrorText: {
                    color: "#f87171",
                    fontSize: "14px",
                    fontWeight: "500",
                    backgroundColor: "rgba(248, 113, 113, 0.1)",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  },
                  alertText: {
                    color: "#f87171",
                    backgroundColor: "rgba(248, 113, 113, 0.1)",
                    border: "1px solid rgba(248, 113, 113, 0.3)",
                    borderRadius: "12px",
                    padding: "16px",
                    backdropFilter: "blur(10px)",
                  },
                  verificationLinkText: {
                    color: "#60a5fa",
                    fontWeight: "600",
                  },
                  resendButton: {
                    color: "#60a5fa",
                    fontWeight: "600",
                    backgroundColor: "rgba(96, 165, 250, 0.1)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(96, 165, 250, 0.2)",
                    "&:hover": {
                      color: "#3b82f6",
                      backgroundColor: "rgba(96, 165, 250, 0.2)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-gray-200 text-sm leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">
              Privacy Policy
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Trusted by 10,000+ creators</span>
          </div>
        </div>
      </div>

      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default ClerkSignupPage;
