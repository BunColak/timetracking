import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="grid place-content-center h-screen">
      <SignIn />
    </div>
  );
}
