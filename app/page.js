// "use client"
// import { Button } from "@/components/ui/button";

// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import Image from "next/image";
// import { useEffect } from "react";
// import { UserButton,useUser } from "@clerk/nextjs";

// export default function Home() {

//   const {user}=useUser();
//   const createUser=useMutation(api.user.createUser);
//   useEffect(()=>{
//     user&&CheckUser();
//   },[user])

//   const CheckUser=async()=>{
//     const result=await createUser({
//       email:user?.primaryEmailAddress?.emailAddress,
//       imageUrl:user?.imageUrl,
//       userName:user?.fullName
//     })

//     console.log(result);

//   }
//   return (
//    <div>
//     <h2>Hello Next js</h2>
//     <Button>Click me</Button>

//     <UserButton/>
//    </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton, SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HomePage() {
  const { user, isLoading, isSignedIn } = useUser(); // Clerk's user state
  const router = useRouter();
  const createUser = useMutation(api.user.createUser); // Convex mutation

  // Handle user sign-in and redirection logic
  useEffect(() => {
    if (isLoading) return; // Wait until loading finishes

    if (isSignedIn) {
      // If the user is signed in, redirect to '/board'
      router.push("/board");
    } else {
      // If not signed in, redirect to the sign-in page
      router.push("/sign-in");
    }
  }, [isLoading, isSignedIn, router]);

  // Create user in Convex backend if the user is authenticated
  useEffect(() => {
    if (user && !isLoading) {
      CheckUser();
    }
  }, [user, isLoading]);

  const CheckUser = async () => {
    if (user) {
      // Create user in your backend (Convex)
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        userName: user?.fullName,
      });
      console.log(result); // Optionally handle the result here
    }
  };

  if (isLoading) {
    // Optionally show a loading state while waiting for user data
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full flex flex-col items-center justify-center">
          {/* Flex container to display text and spinner inline */}
          <h2 className="text-2xl font-bold text-center mb-4 flex items-center">
            AI PDF NOTE-TAKER
            <div className="ml-3 border-t-4 border-blue-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isSignedIn ? (
        // Render this if the user is signed in
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back!</h2>
          <Button
            onClick={() => router.push("/board")}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all mb-4"
          >
            Go to Board
          </Button>
          <UserButton />
        </div>
      ) : (
        // Render this if the user is not signed in
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">AI✦ PDF NOTE-TAKER ✎...</h2>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      )}
    </div>
  );
}
