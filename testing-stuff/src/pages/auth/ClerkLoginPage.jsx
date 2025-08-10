import React from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';

const ClerkLoginPage = () => {
  const { user } = useUser();
  
  // If user is already signed in, redirect to dashboard
  if (user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#1f2937', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px' 
      }}>
        <div style={{ 
          backgroundColor: '#374151', 
          borderRadius: '8px', 
          padding: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Welcome back, {user.firstName}!
          </h2>
          <p style={{ marginBottom: '24px' }}>You are already signed in.</p>
          <button 
            style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1f2937', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px' 
    }}>
      <div style={{ 
        backgroundColor: '#374151', 
        borderRadius: '8px', 
        padding: '32px',
        minWidth: '400px'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '24px',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#9ca3af' }}>
            Sign in to your VibeBot account
          </p>
        </div>
        
        <SignIn 
          routing="path"
          path="/sign-in"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: {
                width: '100%'
              },
              card: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none'
              },
              headerTitle: {
                color: 'white'
              },
              headerSubtitle: {
                color: '#9ca3af'
              },
              formButtonPrimary: {
                backgroundColor: '#3b82f6',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#2563eb'
                }
              },
              formFieldInput: {
                backgroundColor: '#4b5563',
                border: '1px solid #6b7280',
                color: 'white',
                '&:focus': {
                  borderColor: '#3b82f6'
                }
              },
              formFieldLabel: {
                color: 'white'
              },
              footerActionText: {
                color: '#9ca3af'
              },
              footerActionLink: {
                color: '#3b82f6'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ClerkLoginPage;
