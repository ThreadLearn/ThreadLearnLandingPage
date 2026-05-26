import { createContext, useContext, useState } from 'react'
import { mockUsers } from '../data/mockUsers'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUsers[0]) // Default logged in as student

  const login = (email, password) => {
    const found = mockUsers.find(u => u.email === email)
    if (found) {
      setUser(found)
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const loginWithGoogle = () => {
    setUser(mockUsers[0])
    return { success: true }
  }

  const logout = () => setUser(null)

  const register = (data) => {
    const newUser = {
      id: 'new-' + Date.now(),
      name: data.name,
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      role: 'student',
      level: 1,
      xp: 0,
      xpToNext: 500,
      streak: 0,
      badges: [],
      isPremium: false,
      aiUsageToday: 0,
      aiLimit: 10,
      joinedAt: new Date().toISOString().split('T')[0],
    }
    setUser(newUser)
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
