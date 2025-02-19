"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/login";
import { AuthCard } from "@/components/authentication/card";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { CircleX, FilePenLine } from "lucide-react";
import { useState, useTransition } from "react";
import { FormButton } from "../forms/button";

export const RegisterForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
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
        title="Register"
        description="Enter your details below to register to your account"
        footer_text="Already have an account?"
        footer_link="Go to Login"
        footer_href="/auth/login"
        social
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitLogin)} onReset={resetForm} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Name" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Email" disabled={isPending} />
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
                    <FormLabel>Password</FormLabel>
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
            <div className="flex justify-between gap-4 items-center">
              <FormButton type="reset" pending={isPending} text="Clear" Icon={CircleX} />
              <FormButton type="submit" pending={isPending} text="Register" Icon={FilePenLine} />
            </div>
          </form>
        </Form>
      </AuthCard>
    </div >
  );
};
