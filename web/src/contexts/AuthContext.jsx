import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authId, setAuthId] = useState(() => {
    try {
      const stored = localStorage.getItem("authId");
      if (stored) {
        return stored;
      }
      // Generate new authId only if none exists
      const newAuthId =
        Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("authId", newAuthId);
      return newAuthId;
    } catch (error) {
      console.warn("Unable to access localStorage for authId:", error);
      // Fallback: generate in-memory authId
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
  });

  // Ensure authId is always set in localStorage (in case of fallback)
  useEffect(() => {
    if (authId) {
      try {
        localStorage.setItem("authId", authId);
      } catch (error) {
        console.warn("Unable to save authId to localStorage:", error);
      }
    }
  }, [authId]);

  return (
    <AuthContext.Provider value={{ authId, setAuthId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthId() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthId must be used within an AuthProvider");
  }
  return context;
}
