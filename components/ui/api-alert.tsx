"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Copy, Server } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const onCopy = (description: string) => {
    setIsCopying(true);
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  };
  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          <pre>{description}</pre>
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
          disabled={isCopying}
        >
          {isCopying ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};
