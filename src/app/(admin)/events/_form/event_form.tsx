"use client";

import { z } from "zod";
import { CreateEvent } from "@/app/actions/form";
import { EventFormInstance } from "@/lib/zod/form_instances";
import { OutlinedButton, SaveButton } from "@/components/common/buttons";

import { DatePickerX, DropDownX, InputX } from "@/components/common/input";
import { useRef, useState } from "react";
import { EventsFormType } from "@/lib/zod/formvalidations";

interface Props {
  handleCancel: (v: boolean) => void;
}

export const EventForm = ({ handleCancel }: Props) => {
  const formData = useRef<EventsFormType>({
    name: "",
    campaign: {},
    startDate: "",
    endDate: "",
  });

  const [validationStatus, setValidationStatus] = useState<string>("");

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

    await CreateEvent(formData.current);
  };

  return (
    <form className="flex flex-col space-y-4 justify-center w-full">
      <InputX
        label="Name"
        placeholder="Enter name"
        status={`${validationStatus === "name" ? "error" : ""}`}
        onChange={(v) => handleChanges("name", v)}
      />

      <DropDownX
        label="Campaign"
        options={[
          { labbel: "1", value: "Campaign 1" },
          { labbel: "2", value: "Campaign 2" },
          { labbel: "3", value: "Campaign 3" },
        ]}
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
        <SaveButton onClick={handleValidation} />
      </footer>
    </form>
  );
};
