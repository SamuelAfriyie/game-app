"use client";
import { FilledButton } from "@/components/common/buttons";
import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import { usersColumns } from "@/utils/data/users_data";
import { Input, Space } from "antd";
import { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import DefaultModal from "@/components/common/default_modal";
import UserForm from "./_form/user_form";
import { UseUser } from "@/hooks/common/use_user";
import { UsersFormType } from "@/lib/zod/formvalidations";

export default function User() {
  const { data, isLoading, isError } = UseUser();
  const mode = useRef<"create" | "update">("create");
  const [open, setOpen] = useState<boolean>(false);

  const init = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    password: "",
  };

  //const selectedUser = useRef<UsersFormType>(init);
  const [selectedUser, setSelectedUser] = useState<UsersFormType>(init);

  const onRow = (record: UsersFormType) => {
    return {
      onDoubleClick: () => {
       //selectedUser.current = record;
       setSelectedUser(record);
        mode.current = "update";
        setOpen(true);
      },
    };
  };

  const handleOpen = () => {
    //selectedUser.current = init;
    setSelectedUser(init);
    mode.current = "create";
    setOpen(true);
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={
          <UserForm
            selectedUser={selectedUser}
            handleCancel={() => setOpen(false)}
            mode={mode.current}
          />
        }
        title="Create User"
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
                onClick={() => handleOpen()}
              />
            </div>
          </div>
        </header>
        <GTable
          columns={usersColumns?.filter(
            (col) => col.key !== "educationalLevel"
          )}
          dataSource={data}
          loading={isLoading}
          bordered
          onRow={onRow}
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
