'use client'

import { SigninSchema, RegisterSchema } from "@/lib/zod/formvalidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RegisterAction, SignInAction } from "@/app/actions/form";
import Link from "next/link";
import { useTransition } from "react";
import SubmitButton from "@/components/common/submit_button";
import { useRouter } from "next/navigation";

export const LoginForm = () => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit = async (formData: z.infer<typeof SigninSchema>) => {
        const res = await SignInAction(formData);
        if(res) startTransition(() => {
            router.push('/overview');
        });
    }

    const FormInstance = useForm<z.infer<typeof SigninSchema>>({

        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <section className="flex flex-col space-y-4 justify-center w-1/2">

            <FormProvider {...FormInstance} >
                <form onSubmit={FormInstance.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={FormInstance.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>{`Email`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={FormInstance.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>{`Password`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />

                    <SubmitButton innerContent={`Sign In`} />
                </form>

            </FormProvider>

            <span className="flex flex-row space-x-2.5  font-medium text-sm w-full justify-center">
                <p className="text-slate-700 ">{`Don't have an account`}</p>
                <p className="text-blue-500">
                    <Link passHref href={`/register`}>{`Sign Up`}</Link>
                </p>
            </span>

        </section>

    );

}