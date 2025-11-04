import { useEffect, useState } from "react";
import api from "../service/api";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { user, loading };
}
