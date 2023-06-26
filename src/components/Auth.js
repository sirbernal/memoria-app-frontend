import React, { createContext, useContext, useState } from 'react'

const isAuthenticatedResponse = (response) => response.status !== 401 && response.status !== 403

const AuthContext = createContext()

function AuthBoundary({
  authenticated: initialAuthenticated = true,
  children,
  fallback,
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated)

  const checkAuth = (response) => {
    if (!isAuthenticatedResponse(response)) setAuthenticated(false)
    return response
  }

  return (
    <AuthContext.Provider value={{
      authenticated,
      checkAuth,
      setAuthenticated,
    }}
    >
      {authenticated && children}
      {!authenticated && fallback}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export {
  AuthBoundary,
  useAuth,
}