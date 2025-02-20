"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/authentication/login";
import { AuthCard } from "@/components/authentication/card";
import { FormButton } from "@/components/forms/button";
import { ClearButton } from "@/components/forms/clear-button";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { parseURLError } from "@/lib/authentication";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";

export const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const urlError = parseURLError(searchParams.get("error"));

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const submitLogin = (credentials: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);
      const res = await login(credentials);

      if (!res) {
        setError("An error occurred while trying to login. Please try again later.");
        return;
      }

      if ("error" in res) {
        setError(res.error);
        return;
      }

      setSuccess(res.success);
    });
  };

  const resetForm = () => {
    form.reset();
    setError(undefined);
    setSuccess(undefined);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <AuthCard
        title="Login"
        description="Enter your email below to login to your account"
        footer_text="Don't have an account?"
        footer_link="Request for Sign up"
        footer_href="/auth/register"
        social
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitLogin)} onReset={resetForm} className="space-y-6">
            <div className="space-y-4 relative">
              <ClearButton dirty={form.formState.isDirty} />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Username" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        tabIndex={1}
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input {...field} type="password" placeholder="**********" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <FormButton type="submit" pending={isPending} text="Login" Icon={FilePenLine} />
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};
