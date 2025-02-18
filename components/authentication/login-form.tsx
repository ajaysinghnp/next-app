import { AuthCard } from "@/components/authentication/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <AuthCard
        title="Login"
        description="Enter your email below to login to your account"
        footer_text="Don&apos;t have an account?"
        footer_link="Request for Sign up"
        footer_href="/auth/register"
        social
      >
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Username" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" placeholder="*************" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </AuthCard>
    </div >
  );
}
