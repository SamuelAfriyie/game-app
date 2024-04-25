"use client";
import { FilledButton } from "@/components/common/buttons";
import { PageTitle } from "@/components/common/page_title";
import EventCard from "@/components/events/event_card";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ReactNode, useState } from "react";
import { EventForm } from "./_form/event_form";
import DefaultModal from "@/components/common/default_modal";
import { useEvent } from "@/hooks/common/use_event";
import Spinner from "@/components/common/spinner";

export default function Events() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useEvent();
  // const arr = Array<ReactNode>(20).fill(<EventCard />);

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={<EventForm handleCancel={() => setOpen(false)} />}
        title="Create Events"
      />
      <main className="h-full w-full pb-16">
        <header className="flex justify-between mb-3">
          <PageTitle title={"Events"} />
          <div className="flex space-x-2 items-center">
            <Input placeholder="Filter" style={{ width: 300 }} />
            <div>
              <FilledButton
                text={"Create Events"}
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
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
              {data?.map((e) => (
                <EventCard key={e.id} {...e} />
              ))}
            </div>
          )}
        </main>
      </main>
    </>
  );
}
