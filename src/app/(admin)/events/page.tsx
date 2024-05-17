"use client";
import { FilledButton } from "@/components/common/buttons";
import { PageTitle } from "@/components/common/page_title";
import EventCard from "@/components/events/event_card";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Suspense, useState } from "react";
import { EventForm } from "./_form/event_form";
import DefaultModal from "@/components/common/default_modal";
import { UseEvent } from "@/hooks/common/use_event";
import Spinner from "@/components/common/spinner";

export default function Events() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(undefined); // [1
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]); // [3]
  const { data, isLoading, isError } = UseEvent();

  const handleUpdate = (id: string) => {
    const updateData = data?.find((e) => e.id === id);
    setSelectedEvent(updateData);
    setOpen(true);
  };

  const handleOnFilter = (e: any) => {
    const text = e.target.value;
    const filteredData = data?.filter((d) =>
      d.name.toLowerCase().includes(text.toLowerCase())
    );
    console.log("filteredData", filteredData);
    setFilteredEvents(filteredData); // [3]
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={
          <EventForm
            handleCancel={() => setOpen(false)}
            selectedEvent={selectedEvent}
          />
        }
        title={`${selectedEvent ? "Update" : "Create"} Event`}
      />
      <main className="h-full w-full pb-16">
        <header className="flex justify-between mb-3">
          <PageTitle title={"Events"} />
          <div className="flex space-x-2 items-center">
            <Input
              placeholder="Filter"
              style={{ width: 300 }}
              onChange={handleOnFilter}
            />
            <div>
              <FilledButton
                text={"Create Events"}
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpen(true);
                  setSelectedEvent(undefined); // [2]
                }}
              />
            </div>
          </div>
        </header>
        <main className="flex overflow-y-auto  h-full w-full">
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          ) : isError ? (
            <div>Error...</div>
          ) : (
            <div className="grid grid-cols-5 gap-4 w-full px-2 pb-32">
              {filteredEvents.length > 0
                ? filteredEvents.map((e) => (
                    <EventCard key={e.id} {...e} handleUpdate={handleUpdate} />
                  ))
                : data?.map((e) => (
                    <EventCard key={e.id} {...e} handleUpdate={handleUpdate} />
                  ))}
            </div>
          )}
        </main>
      </main>
    </>
  );
}
