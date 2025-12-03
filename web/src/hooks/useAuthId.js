import { useEffect, useState } from "react";

export function useAuthId() {
  const [authId, setAuthId] = useState(() => {
    return localStorage.getItem("adminAuth") || "";
  });

  useEffect(() => {
    if (!authId) {
      const newAuthId =
        Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("adminAuth", newAuthId);
      setAuthId(newAuthId);
    }
  }, [authId]);

  return { authId };
}
