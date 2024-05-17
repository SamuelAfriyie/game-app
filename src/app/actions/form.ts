"use server";

import {
  CampaignFormType,
  EventSchema,
  EventsFormType,
  GameFormType,
  RegisterSchema,
  SigninSchema,
  UsersFormType,
} from "@/lib/zod/formvalidations";
import { delayBy } from "@/utils/func/encrypt";
import { z } from "zod";

export const SignInAction = async (data: z.infer<typeof SigninSchema>) => {
  await delayBy(4000);
  console.log(data);
  return data;
};

export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
  await delayBy(4000);
  console.log(data);
};

export const CreateCampaign = async (data: CampaignFormType) => {
  await delayBy(4000);
  console.log(data);
};

export const CreateEvent = async (data: EventsFormType) => {
  await delayBy(4000);
  console.log(data);
};

export const CreateUser = async (data: UsersFormType) => {
  await delayBy(4000);
  console.log(data);
};

//Update Actions
export const UpdateGame = async (data: GameFormType) => {
  await delayBy(4000);
  console.log(data);
};