"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface IFormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

const FormButton = ({
  children,
  disabled,
  className,
  variant,
}: IFormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      variant={variant}
      size={"sm"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};

export default FormButton;
