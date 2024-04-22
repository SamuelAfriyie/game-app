"use client";

import { CampaignSchema } from "@/lib/zod/formvalidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateCampaign } from "@/app/actions/form";
import { InputTemp } from "@/components/common/input_temp";
import { FormInstance } from "antd";
import { CamapaignFormInstance } from "@/lib/zod/form_instances";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";

interface Props {
  handleCancel: (v: boolean) => void;
}

export const CampaignFormV2 = ({ handleCancel }: Props) => {
  const onSubmit = async (formData: z.infer<typeof CampaignSchema>) => {
    await CreateCampaign(formData);
  };

  const FormInstance = CamapaignFormInstance();

  return (
    <section className="flex flex-col space-y-4 justify-center w-full">
      <FormProvider {...FormInstance}>
        <form
          onSubmit={FormInstance.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
          id="campaign-form"
        >
          <InputTemp name="name" label="Name" placeholder="Enter name" />
          <InputTemp name="passScore" label="Pass Score" type="number" />
          <InputTemp name="duration" label="Duration" type="number" />
          <InputTemp
            name="numOfAttempts"
            label="Number of Attempts"
            type="number"
          />
          <footer className="flex justify-end">
            <OutlinedButton className="mr-3" onClick={handleCancel} />
            <SaveButton />
          </footer>
        </form>
      </FormProvider>
    </section>
  );
};
