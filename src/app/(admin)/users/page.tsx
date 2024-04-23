"use client";
import { FilledButton } from "@/components/common/buttons";
import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import { usersColumns, usersData } from "@/utils/data/users_data";
import { Input, Space } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import DefaultModal from "@/components/common/default_modal";
import UserForm from "./_form/user_form";

export default function User() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
    <DefaultModal
      open={open}
      setOpen={setOpen}
      content={<UserForm handleCancel={() => setOpen(false)}   />}
      title="Create Events"
    />
      <Space direction="vertical" size="small" style={{ display: "flex" }}> 
        <header className="flex justify-between mb-3">
          <PageTitle title={"Users"} />
          <div className="flex space-x-2 items-center">
            <Input placeholder="Filter" style={{ width: 300 }} />
            <div>
              <FilledButton
                text={"Create User"}
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </header>
        <GTable
          columns={usersColumns}
          dataSource={usersData}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
