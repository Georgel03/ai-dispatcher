'use client';
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. If auth is still loading, do nothing yet
    if (!isLoaded) return;

    // 2. If not signed in, just show content (Clerk handles its own protection)
    if (!isSignedIn) {
      setIsChecking(false);
      return;
    }


    const checkRole = async () => {

      if (pathname.startsWith('/onboarding')) {
        setIsChecking(false);
        return;
      }

      try {
        const token = await getToken();
        // Call your new GET endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const user = await response.json();
          // THE LOGIC: If role is missing, force redirect
          if (!user.role) {
            router.push('/onboarding');
            return;
          }
        }
      } catch (error) {
        console.error("Role check failed", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkRole();
  }, [isSignedIn, isLoaded, pathname, getToken, router]);

  // Optional: Show a loading spinner while checking role
  if (isLoaded && isSignedIn && isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}