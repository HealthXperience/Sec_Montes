import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
