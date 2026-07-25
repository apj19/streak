import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <SignUp signInUrl="/signin" forceRedirectUrl="/home" fallbackRedirectUrl="/home" />
    </div>
  );
}
