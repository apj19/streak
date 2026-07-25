import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <SignIn signUpUrl="/signup" forceRedirectUrl="/home" fallbackRedirectUrl="/home" />
    </div>
  );
}
