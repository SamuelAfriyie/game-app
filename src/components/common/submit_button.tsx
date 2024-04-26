"use client";
 
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; 
import React from "react"; 
import Spinner from "./spinner";

interface SubmitButtonProps {
  loading?: boolean;
  innerContent: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary";
  onClick?: () => void;
}

export default function SubmitButton({
  loading = false,
  innerContent = "Register",
  className,
  variant = "default",
  onClick,
}: SubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className={cn(
        "w-full rounded-md bg-blue-700 hover:bg-blue-500",
        className
      )}
      variant={variant}
    >
      <div className="flex items-center">
        {loading && <Spinner />}

        <span className="mx-3">{innerContent}</span>
      </div>
    </Button>
  );
}
