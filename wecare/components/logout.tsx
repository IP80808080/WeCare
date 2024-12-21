import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });

      if (response.ok) {
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        sessionStorage.removeItem("token");

        localStorage.removeItem("token");

        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const onLogout = async (e: any) => {
    e.stopPropagation();
    setIsLoggingOut(true);
    await handleLogout();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onLogout}
      className="hover:bg-gray-800"
    >
      {isLoggingOut ? (
        "Logging out..."
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
