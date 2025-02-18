import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { app_config } from "@/config/app";
import Image from "next/image";

export interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  social?: boolean;
  footer_text?: string;
  footer_link?: string;
  footer_href?: string;
}

export const AuthCard = ({
  title,
  description,
  children,
  social = false,
  footer_text,
  footer_link,
  footer_href,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={app_config.app_logo}
              alt={"Logo"}
              width={50}
              height={50}
              className=""
            />
            <h1 className="w-full text-left">{title}</h1>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {social && (
          <Button variant="outline" className="w-full" disabled>
            Login with NRB [Comming Soon]
          </Button>
        )}
        {footer_text && (
          <div className="w-full flex flex-1 items-center justify-between text-center text-sm">
            {footer_text}
            <a href={footer_href} className="underline underline-offset-4">
              {footer_link}
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};