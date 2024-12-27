// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />


// }
"use client"

import { SignUp} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
export default function SignUpPage() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useUser(); // Clerk's user state

  useEffect(() => {
    if (!isLoading && isSignedIn) {
      // Redirect to '/board' after successful sign-up
      router.push("/board");
    }
  }, [isSignedIn, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  );
}

