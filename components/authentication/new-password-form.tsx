"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { changePassword } from "@/actions/authentication/new-password";
import { AuthCard } from "@/components/authentication/card";
import { FormButton } from "@/components/forms/button";
import { ClearButton } from "@/components/forms/clear-button";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginRoute } from "@/config/routes";
import { cn } from "@/lib/utils";
import { NewPasswordSchema } from "@/schemas/auth";

export const NewPasswordForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (!token) {
      setError("Missing Token!");
    }
  }, [token]);

  const submitPassword = ({ password }: z.infer<typeof NewPasswordSchema>) => {
    startTransition(async () => {
      setError(undefined);
      setSuccess(undefined);
      const res = await changePassword(password, token as string);

      if (!res) {
        setError("An error occurred while trying to change password. Please try again later.");
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
        title="Change Your Password"
        description="Enter your new password to change."
        footer_text="Remember Your Password?"
        footer_link="Proceed to Login"
        footer_href={loginRoute}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitPassword)} onReset={resetForm} className="space-y-6">
            <div className="space-y-4 relative">
              <ClearButton dirty={form.formState.isDirty} />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="**********" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <FormButton type="submit" pending={isPending} text="Change Password" Icon={FilePenLine} />
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};
