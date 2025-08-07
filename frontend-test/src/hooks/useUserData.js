import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import api from '@/lib/api'

export const useUserData = () => {
  const { getToken, isLoaded } = useAuth()
  
  // Data states
  const [userData, setUserData] = useState(null)
  const [instagramData, setInstagramData] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  
  // Loading states
  const [loading, setLoading] = useState(true)
  const [loadingInstagram, setLoadingInstagram] = useState(true)
  const [loadingAnalytics, setLoadingAnalytics] = useState(true)
  
  // Error states
  const [error, setError] = useState(null)
  const [backendConnected, setBackendConnected] = useState(true)

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = await getToken()
      const response = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setUserData(response.data)
      setBackendConnected(true)
    } catch (err) {
      console.error('Error fetching user profile:', err)
      setError('Failed to load user profile')
      
      // Check if it's a network/backend error
      if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED' || !err.response) {
        setBackendConnected(false)
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch Instagram connection status
  const fetchInstagramStatus = async () => {
    try {
      setLoadingInstagram(true)
      
      const token = await getToken()
      const response = await api.get('/instagram/status', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setInstagramData(response.data)
      setBackendConnected(true)
    } catch (err) {
      console.error('Error fetching Instagram status:', err)
      
      // Set default Instagram not connected state
      setInstagramData({ 
        isConnected: false, 
        username: null, 
        followers: 0,
        profilePicture: null 
      })
      
      // Check if it's a network/backend error
      if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED' || !err.response) {
        setBackendConnected(false)
      }
    } finally {
      setLoadingInstagram(false)
    }
  }

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true)
      
      const token = await getToken()
      const response = await api.get('/user/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setAnalyticsData(response.data)
      setBackendConnected(true)
    } catch (err) {
      console.error('Error fetching analytics:', err)
      
      // Set default analytics data
      setAnalyticsData({
        activeAutomations: 0,
        messagesSent: 0,
        responseRate: 0,
        followers: 0
      })
      
      // Check if it's a network/backend error
      if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED' || !err.response) {
        setBackendConnected(false)
      }
    } finally {
      setLoadingAnalytics(false)
    }
  }

  // Refresh all data
  const refetchData = async () => {
    if (!isLoaded) return
    
    await Promise.all([
      fetchUserProfile(),
      fetchInstagramStatus(),
      fetchAnalytics()
    ])
  }

  // Initialize data on mount
  useEffect(() => {
    if (isLoaded) {
      refetchData()
    }
  }, [isLoaded])

  return {
    // Data
    user: userData,
    instagram: instagramData,
    analytics: analyticsData,
    
    // Loading states
    loading,
    loadingInstagram,
    loadingAnalytics,
    isLoading: loading || loadingInstagram || loadingAnalytics,
    
    // Error states
    error,
    backendConnected,
    
    // Actions
    refetch: refetchData,
    refetchUser: fetchUserProfile,
    refetchInstagram: fetchInstagramStatus,
    refetchAnalytics: fetchAnalytics
  }
}
