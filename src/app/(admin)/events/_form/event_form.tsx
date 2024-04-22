"use client";

import { EventSchema } from "@/lib/zod/formvalidations";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { CreateEvent } from "@/app/actions/form";
import { DropDownTemp, InputTemp } from "@/components/common/input_temp";
import { EventFormInstance } from "@/lib/zod/form_instances";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";

import { 
  DialogClose, 
} from "@/components/ui/dialog";

interface Props {
  handleCancel: (v: boolean) => void;
}

export const EventForm = ({ handleCancel }: Props) => {
  const onSubmit = async (formData: z.infer<typeof EventSchema>) => {
    await CreateEvent(formData);
  };

  const FormInstance = EventFormInstance();

  return (
    <section className="flex flex-col space-y-4 justify-center w-full">
      <FormProvider {...FormInstance}>
        <form 
          onSubmit={FormInstance.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
          id="campaign-form"
        >
          <InputTemp name="name" label="Name" placeholder="Enter name" 
            control={FormInstance.control}/>
          
          <DropDownTemp
            name="campaign"
            label="Campaign"
            options={[{ id: "1", value: "Campaign 1" }, { id: "2", value: "Campaign 2" }, { id: "3", value: "Campaign 3" }]}
            placeholder="Select campaign"
            control={FormInstance.control}
          />
          <InputTemp name="startDate" label="Start Date" type="date" 
            control={FormInstance.control} />

          <InputTemp
            name="endDate"
            label="End Date"
            type="date" 
            control={FormInstance.control}
          />
          <footer className="flex justify-end">
          <DialogClose asChild>
            <OutlinedButton className="mr-3" onClick={handleCancel} />
          </DialogClose>
            <SaveButton />
          </footer>
        </form>
      </FormProvider>
    </section>

  );
};
