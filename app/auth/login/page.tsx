import { LoginForm } from "@/components/authentication/login-form";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm drop-shadow-md">
        <LoginForm />
      </div>
    </div>
  )
}