"use client";
import { FilledButton } from "@/components/common/buttons";
import { PageTitle } from "@/components/common/page_title";
import EventCard from "@/components/events/event_card";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ReactNode, useState } from "react";
import { EventForm } from "./_form/event_form";
import { DefaultDialog } from "@/components/common/dialog";

export default function Events() {
  const [open, setOpen] = useState<boolean>(false);
  const arr = Array<ReactNode>(20).fill(<EventCard />);

  return (
    <>
      <main className="h-full w-full pb-16">
        <header className="flex justify-between mb-3">
          <PageTitle title={"Events"} />
          <div className="flex space-x-2 items-center">
            <Input placeholder="Filter" style={{ width: 300 }} />
            <div>
              <DefaultDialog
                triggerBtn={
                  <FilledButton
                    text={"Create Events"}
                    icon={<PlusOutlined />}
                    onClick={() => setOpen(true)}
                  />
                }
                title={"Create Events"}
                open={open}
                content={<EventForm handleCancel={() => setOpen(false)} />}
              />
            </div>
          </div>
        </header>
        <main className="flex overflow-y-auto  h-full w-full">
          <div className="grid grid-cols-5 gap-4 w-full px-2 pb-32">
            {arr.map((e) => e)}
          </div>
        </main>
      </main>
    </>
  );
}
