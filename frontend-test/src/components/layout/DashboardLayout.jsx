import React, { useState } from 'react'
import { useAuth, useUser, UserButton } from '@clerk/clerk-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useUserSync } from '@/hooks/useUserSync'
import { 
  LayoutDashboard, 
  Zap, 
  BarChart3, 
  Settings, 
  Instagram, 
  Webhook,
  Menu,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: true },
    { name: 'Backend Test', href: '/test', icon: Zap, current: false },
    { name: 'Automation', href: '/automation', icon: Zap, current: false },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
    { name: 'Posts', href: '/posts', icon: Instagram, current: false },
    { name: 'Webhooks', href: '/webhooks', icon: Webhook, current: false },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">VibeBot</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              VibeBot v1.0.0
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TopBar = ({ setSidebarOpen }) => {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <header className="bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm text-muted-foreground">
            {user?.emailAddresses?.[0]?.emailAddress}
          </div>
          <UserButton 
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Auto-sync user with backend on login
  useUserSync()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <TopBar setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-auto relative z-0 pb-6">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
