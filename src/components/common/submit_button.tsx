'use client';


import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';

interface SubmitButtonProps {
    innerContent: React.ReactNode;
    className?: string;
    variant?: "default" | "secondary";
}


export default function SubmitButton({ innerContent = "Register", className, variant = "default" }: SubmitButtonProps) {

    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type="submit" className={cn(
            "w-full rounded-md bg-blue-700 hover:bg-blue-500",
            pending && "bg-red-400",
            className
        )} variant={variant}>
            <div>
                {
                    pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />

                }

                {innerContent}

            </div>
        </Button>
    )
}