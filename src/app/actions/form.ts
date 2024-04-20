'use server'

import { CampaignSchema, EventSchema, RegisterSchema, SigninSchema } from "@/lib/zod/formvalidations";
import { delayBy } from "@/utils/func/delay";
import { z } from "zod";

export const SignInAction = async (data: z.infer<typeof SigninSchema>) => {
    await delayBy(4000)
    console.log(data);
    return data;
}

export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
    await delayBy(4000)
    console.log(data);
}

export const CreateCampaign = async (data: z.infer<typeof CampaignSchema>) => {
    await delayBy(4000)
    console.log(data);
}

export const CreateEvent = async (data: z.infer<typeof EventSchema>) => {
    await delayBy(4000)
    console.log(data);
}


