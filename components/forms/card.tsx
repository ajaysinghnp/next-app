import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const FormCard = ({ title, description, children }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
