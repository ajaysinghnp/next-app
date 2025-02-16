import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
};