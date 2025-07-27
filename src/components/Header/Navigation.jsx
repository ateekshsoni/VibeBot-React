import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { 
  SignedIn, 
  SignedOut,
  UserButton 
} from '@clerk/clerk-react'

const Navigation = ({ onMegaMenuToggle, onMobileMenuToggle, isMegaMenuOpen }) => {
  return (
    <nav className="flex items-center justify-between h-18 px-4 lg:px-16">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/d1072a08-49f6-40d3-a139-259f11678b8e.svg" 
          alt="InstaFlow Logo" 
          className="h-9 w-21"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        <a href="#" className="text-dark font-lato text-base leading-6 hover:text-primary transition-colors">
          Home Page
        </a>
        <a href="#features" className="text-dark font-lato text-base leading-6 hover:text-primary transition-colors">
          Features
        </a>
        <a href="#pricing" className="text-dark font-lato text-base leading-6 hover:text-primary transition-colors">
          Pricing
        </a>
        <SignedIn>
          <a href="/dashboard" className="text-dark font-lato text-base leading-6 hover:text-primary transition-colors">
            Dashboard
          </a>
        </SignedIn>
        <button 
          onClick={onMegaMenuToggle}
          className="flex items-center space-x-1 text-dark font-lato text-base leading-6 hover:text-primary transition-colors"
        >
          <span>Resources</span>
          <img 
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/fKeskOJrrD.svg" 
            alt="Chevron Down" 
            className={`w-6 h-6 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center space-x-4">
        <SignedOut>
          <Link to="/signin">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <span className="block w-full h-0.5 bg-dark"></span>
          <span className="block w-full h-0.5 bg-dark"></span>
          <span className="block w-full h-0.5 bg-dark"></span>
        </div>
      </button>
    </nav>
  )
}

export default Navigation
