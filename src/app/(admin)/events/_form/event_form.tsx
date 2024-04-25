"use client";

import { z } from "zod";
import { CreateEvent } from "@/app/actions/form";
import { EventFormInstance } from "@/lib/zod/form_instances";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";

import { DatePickerX, DropDownX, InputX } from "@/components/common/input";
import { useRef, useState } from "react";
import { EventsFormType } from "@/lib/zod/formvalidations";
import { useCampaign } from "@/hooks/common/use_campaign";
import { useCreateEvent } from "@/hooks/common/use_event";
import ResDialog from "@/components/common/res_dialog";

interface Props {
  handleCancel: (v: boolean) => void;
}

export const EventForm = ({ handleCancel }: Props) => {
  const { data, isLoading, isError } = useCampaign();

  const formData = useRef<EventsFormType>({
    name: "",
    campaign: {},
    startDate: "",
    endDate: "",
  });

  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string | number) => {
    formData.current = { ...formData.current, [name]: value };
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async () => {
    if (formData.current.name === "") {
      setValidationStatus("name");
      return;
    }
    if (formData.current.campaign === undefined) {
      setValidationStatus("campaign");
      return;
    }
    if (formData.current.startDate === "") {
      setValidationStatus("startDate");
      return;
    }
    if (formData.current.endDate === "") {
      setValidationStatus("endDate");
      return;
    }
    formData.current.campaign = findCampaign(formData.current.campaign);
    const {data, success} = await useCreateEvent(formData.current);
    if (success) {
      resType.current = "success";
    } else {
      resType.current = "failure";
    }
    setConfirmLoading(false);
    handleCancel(true);
    setOpenResDialog(true);
  };

  const handleOptionData = () => {
    if (isLoading) return [{ label: "Loading", value: "Loading" }];
    if (isError) return [{ label: "Error", value: "Error" }];
    return data?.map((e) => ({ label: e.name, value: e.id }));
  };

  const findCampaign = (id: string) => {
    return data?.find((e) => e.id === id);
  };

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        onClose={() => setOpenResDialog(false)}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <InputX
          label="Name"
          placeholder="Enter name"
          status={`${validationStatus === "name" ? "error" : ""}`}
          onChange={(v) => handleChanges("name", v)}
        />

        <DropDownX
          label="Campaign"
          options={[...handleOptionData()]}
          placeholder="Select campaign"
          allowClear={true}
          status={`${validationStatus === "campaign" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("campaign", v)}
        />
        <DatePickerX
          label="Start Date"
          status={`${validationStatus === "startDate" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("startDate", v)}
        />

        <DatePickerX
          label="End Date"
          status={`${validationStatus === "endDate" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("endDate", v)}
        />

        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          <SaveButton
            onClick={handleValidation}
            confirmLoading={confirmLoading}
          />
        </footer>
      </form>
    </>
  );
};
