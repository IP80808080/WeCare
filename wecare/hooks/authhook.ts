import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/handle", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
        } else {
          const data: User = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading };
};
