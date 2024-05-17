"use server";

import {
  CampaignFormType,
  EventsFormType,
  GameFormType,
  RegisterSchema,
  SigninSchema,
  UsersFormType,
} from "@/lib/zod/formvalidations";
import { z } from "zod";

export const SignInAction = async (data: z.infer<typeof SigninSchema>) => {
  console.log(data);
  return data;
};

export const RegisterAction = async (data: z.infer<typeof RegisterSchema>) => {
  console.log(data);
};

export const CreateCampaign = async (data: CampaignFormType) => {
  console.log(data);
};

export const CreateEvent = async (data: EventsFormType) => {
  console.log(data);
};

export const CreateUser = async (data: UsersFormType) => {
  console.log(data);
};

//Update Actions
export const UpdateGame = async (data: GameFormType) => {
  console.log(data);
};
