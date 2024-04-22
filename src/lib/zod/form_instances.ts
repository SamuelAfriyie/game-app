"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CampaignSchema, EventSchema } from "./formvalidations";

export const CamapaignFormInstance = () =>
  useForm<z.infer<typeof CampaignSchema>>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      name: "",
      passScore: "",
      duration: "",
      numOfAttempts: "",
    },
  });

export const EventFormInstance = () =>
  useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      campaign: "",
      startDate: "",
      endDate: "",
    },
  });
