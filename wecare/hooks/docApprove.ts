import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const useDocApproval = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkApproval = async () => {
      try {
        const pathParts = pathname?.split("/") || [];
        const userId = pathParts[pathParts.length - 1];

        if (!userId) return;

        const response = await fetch(
          `/api/auth/doctor/approval-status/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                document.cookie.split("token=")[1]?.split(";")[0]
              }`,
            },
          }
        );

        const data = await response.json();

        // Handle redirects based on approval status
        if (!data.isApproved && !pathname?.startsWith("/pending-approval")) {
          router.replace(`/pending-approval/${userId}`);
        } else if (
          data.isApproved &&
          pathname?.startsWith("/pending-approval")
        ) {
          router.replace(`/doctor-dashboard/${userId}`);
        }
      } catch (error) {
        console.error("Error checking approval status:", error);
      }
    };

    if (pathname) {
      checkApproval();
    }
  }, [pathname, router]);
};

export default useDocApproval;
