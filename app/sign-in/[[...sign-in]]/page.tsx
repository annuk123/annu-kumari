import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
      afterSignInUrl="/post-auth"
      afterSignUpUrl="/post-auth"
    />
    </div>
  );
}
