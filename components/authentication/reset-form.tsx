"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { reset } from "@/actions/authentication/reset";
import { AuthCard } from "@/components/authentication/card";
import { FormButton } from "@/components/forms/button";
import { ClearButton } from "@/components/forms/clear-button";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginRoute } from "@/config/routes";
import { cn } from "@/lib/utils";
import { ResetSchema } from "@/schemas/auth";

export const ResetForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const submitReset = ({ email }: z.infer<typeof ResetSchema>) => {
    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);
      const res = await reset(email);

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
        title="Password Reset"
        description="Enter your email below to reset your password."
        footer_text="Remember Your Password?"
        footer_link="Proceed to Login"
        footer_href={loginRoute}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitReset)} onReset={resetForm} className="space-y-6">
            <div className="space-y-4 relative">
              <ClearButton dirty={form.formState.isDirty} />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Email" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <FormButton type="submit" pending={isPending} text="Send Reset Link" Icon={FilePenLine} />
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};
