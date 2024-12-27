// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//     return (
//     <div className='flex items-center justify-center h-screen'>
//    <SignIn />
//   </div>)
// }
"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";  // Hook to track user session

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useUser(); // Hook to track user session

  // Redirect signed-in users to the board page immediately
  useEffect(() => {
    if (!isLoading && isSignedIn) {
      router.push("/board"); // Redirect to /board if the user is already signed in
    }
  }, [isSignedIn, isLoading, router]);

  if (isLoading) {
    // Show loading state if user status is being fetched
    return <div>Loading...</div>;
  }

  // If the user is not signed in, render the sign-in form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">AI PDF NOTE TAKER</h2>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}






