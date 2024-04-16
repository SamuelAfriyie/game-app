'use client'

import { RegisterSchema } from "@/lib/zod/formvalidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RegisterAction, SignInAction } from "@/app/actions/form";
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "../../../components/ui/form";
import Link from "next/link";
import SubmitButton from "@/components/common/submit_button";

export const RegisterForm = () => {

    const onSubmit = async (formData: z.infer<typeof RegisterSchema>) => {
        await RegisterAction(formData)
    }


    const FormInstance = useForm<z.infer<typeof RegisterSchema>>({

        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            eduLevel: "",
            password: "",
            confirmPassword: "",
        },
    })

    return (
        <section className="flex flex-col space-y-4 justify-center w-1/2">

            <FormProvider {...FormInstance} >
                <form onSubmit={FormInstance.handleSubmit(onSubmit)} className="space-y-4 w-full">

                    <section className="flex flex-row space-x-5 w-full">
                        <FormField
                            control={FormInstance.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>{`First Name`}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={FormInstance.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>{`Last Name`}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )} />
                    </section>

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
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>{`Phone Number`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phone Number" {...field} />
                                </FormControl>



                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={FormInstance.control}
                        name="eduLevel"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>{`Educational Level`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Educational Level" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={FormInstance.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>{`Password`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={FormInstance.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>{`Confirm Password`}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password" {...field} type="password" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                    <SubmitButton innerContent={`Register`} />
                </form>
            </FormProvider>

            <span className="flex flex-row space-x-2.5  font-medium text-sm w-full justify-center">
                <p className="text-slate-700 ">{`Already have an account ?`}</p>
                <p className="text-blue-500">
                    <Link passHref href={`/signin`}>{`Log In`}</Link>
                </p>


            </span>
        </section>
    );

}