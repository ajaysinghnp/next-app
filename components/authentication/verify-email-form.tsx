"use client";

import { verifyEmail } from "@/actions/authentication/email-verification";
import { AuthCard } from "@/components/authentication/card";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { business_config } from "@/config/business";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [validated, setValidated] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const _verifyEmail = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setValidated(true);
        if (data.error) {
          setError(data.error);
          return;
        }
        setSuccess(data.success);
      });
  }, [token]);

  useEffect(() => {
    _verifyEmail();
  }, [_verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AuthCard
        title={"Verify Your Email"}
        description={`Verify Your Email for ${business_config.name}`}
        footer_text={validated ? "Email Verified:" : undefined}
        footer_link="Go to Login"
        footer_href="/auth/login"
      >
        {!error && !success && (
          <Loader2 className="h-10 animate-spin w-full" />
        )}
        {error && (
          <FormError message={error} />
        )}
        {success && (
          <FormSuccess message={success} />
        )}
      </AuthCard>
    </div>
  );
};
