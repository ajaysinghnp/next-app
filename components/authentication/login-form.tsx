"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/authentication/login";
import { AuthCard } from "@/components/authentication/card";
import { FormButton } from "@/components/forms/button";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";
import { FilePenLine } from "lucide-react";
import { useState, useTransition } from "react";
import { ClearButton } from "../forms/clear-button";

export const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

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
      setSuccess(undefined);
      setError(undefined);
      const res = await login(credentials);

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
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline" tabIndex={1}>
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
            <FormSuccess message={success} />
            <FormError message={error} />
            <FormButton type="submit" pending={isPending} text="Login" Icon={FilePenLine} />
          </form>
        </Form>
      </AuthCard>
    </div >
  );
};
