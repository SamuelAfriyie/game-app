"use client";

import { OutlinedButton, SaveButton } from "@/components/common/buttons";
import { DatePickerX, DropDownX, InputX } from "@/components/common/input";
import { useEffect, useRef, useState } from "react";
import { EventsFormType } from "@/lib/zod/formvalidations";
import { UseCampaign } from "@/hooks/common/use_campaign";
import { UseCreateEvent, UseUpdateEvent } from "@/hooks/common/use_event";
import ResDialog from "@/components/common/res_dialog";

interface Props {
  selectedEvent: any;
  handleCancel: (v: boolean) => void;
}

export const EventForm = ({ selectedEvent, handleCancel }: Props) => {
  const { data, isLoading, isError } = UseCampaign();

  const init = {
    name: "",
    campaign: "",
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState<EventsFormType>(init);
  const [validationStatus, setValidationStatus] = useState<string>("");
  const [openResDialog, setOpenResDialog] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const resType = useRef<"success" | "failure">("failure");

  const handleChanges = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
    if (validationStatus === name) setValidationStatus("");
  };

  const handleValidation = async () => {
    setConfirmLoading(true);
    if (formData.name === "") {
      setValidationStatus("name");
      setConfirmLoading(false);
      return;
    }
    if (formData.campaign === undefined) {
      setValidationStatus("campaign");
      setConfirmLoading(false);
      return;
    }
    if (formData.startDate === "") {
      setValidationStatus("startDate");
      setConfirmLoading(false);
      return;
    }
    if (formData.endDate === "") {
      setValidationStatus("endDate");
      setConfirmLoading(false);
      return;
    }

    formData.campaign = findCampaign(formData.campaign); //fetching the campaign object usgin the selected campaigns ID
    if (!selectedEvent) {
      const { data, success } = await UseCreateEvent(formData);
      if (success) {
        resType.current = "success";
      } else {
        resType.current = "failure";
      }
    } else {
      const { data, success } = await UseUpdateEvent({
        ...formData,
        id: selectedEvent.id,
      });
      if (success) {
        resType.current = "success";
      } else {
        resType.current = "failure";
      }
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

  const generateResMessage = () => {
    if (resType.current === "success") {
      return selectedEvent
        ? "Event updated successfully"
        : "Event created successfully";
    } else {
      return selectedEvent ? "Event update failed" : "Event creation failed";
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        name: selectedEvent.name,
        campaign: selectedEvent.campaign.id,
        startDate: selectedEvent.startDate,
        endDate: selectedEvent.endDate,
      });
    } else {
      setFormData({ ...init });
    }
  }, [selectedEvent]);

  return (
    <>
      <ResDialog
        open={openResDialog}
        type={resType.current}
        onClose={() => setOpenResDialog(false)}
        msg={generateResMessage()}
      />
      <form className="flex flex-col space-y-4 justify-center w-full">
        <InputX
          label="Name"
          placeholder="Enter name"
          status={`${validationStatus === "name" ? "error" : ""}`}
          onChange={(v) => handleChanges("name", v)}
          initialValue={formData?.name}
        />

        <DropDownX
          label="Campaign"
          options={[...handleOptionData()]}
          placeholder="Select campaign"
          allowClear={true}
          status={`${validationStatus === "campaign" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("campaign", v)}
          defaultValue={formData?.campaign}
        />
        <DatePickerX
          label="Start Date"
          status={`${validationStatus === "startDate" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("startDate", v)}
          defaultValue={formData?.startDate}
        />

        <DatePickerX
          label="End Date"
          status={`${validationStatus === "endDate" ? "error" : ""}`}
          handleChange={(v: any) => handleChanges("endDate", v)}
          defaultValue={formData?.endDate}
        />

        <footer className="flex justify-end">
          <OutlinedButton className="mr-3" onClick={handleCancel} />
          {selectedEvent ? (
            <SaveButton
              text="Update"
              confirmLoading={confirmLoading}
              onClick={handleValidation}
            />
          ) : (
            <SaveButton
              onClick={handleValidation}
              confirmLoading={confirmLoading}
            />
          )}
        </footer>
      </form>
    </>
  );
};
