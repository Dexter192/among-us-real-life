import { useEffect, useState } from "react";

export function useAuthId() {
  const [authId, setAuthId] = useState(() => {
    try {
      return localStorage.getItem("authId") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    if (!authId) {
      const newAuthId =
        Math.random().toString(36).slice(2) + Date.now().toString(36);
      try {
        localStorage.setItem("authId", newAuthId);
      } catch {
        console.warn("Unable to access localStorage to set authId");
      }
      setAuthId(newAuthId);
    }
  }, [authId]);

  return { authId };
}
