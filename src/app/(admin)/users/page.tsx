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
import { ExportConfig } from "@/utils/data/file_export_config";
import { BiSolidFileExport } from "react-icons/bi";

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

  const [selectedUser, setSelectedUser] = useState<UsersFormType>(init);
  const [filteredData, setFilteredData] = useState<any>(undefined);

  const onRow = (record: UsersFormType) => {
    return {
      onDoubleClick: () => {
        setSelectedUser(record);
        mode.current = "update";
        setOpen(true);
      },
    };
  };

  const handleOpen = () => {
    setSelectedUser(init);
    mode.current = "create";
    setOpen(true);
  };

  const resetForm = () => {
    setSelectedUser(init);
  };

  const handleFilter = (e: any) => {
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter((item: any) => {
      return (
        item.firstName.toLowerCase().includes(value) ||
        item.lastName.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
      );
    });
    setFilteredData(filteredData);
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
            resetForm={resetForm}
          />
        }
        title="Create User"
      />
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <header className="flex justify-between mb-3">
          <PageTitle title={"Users"} />
          <div className="flex space-x-2 items-center">
            <Input
              placeholder="Filter"
              style={{ width: 300 }}
              onChange={handleFilter}
            />
            <div>
              <FilledButton
                text={"Create User"}
                icon={<PlusOutlined />}
                onClick={() => handleOpen()}
              />
            </div>
            <FilledButton
              icon={<BiSolidFileExport size={13} />}
              text="Export CSV"
              onClick={() => {
                if (data.length > 0) {
                  ExportConfig.init = data.map((item: any) => {
                    return {
                      firstName: item.firstName,
                      lastName: item.lastName,
                      email: item.email,
                      phoneNumber: item.phoneNumber,
                      location: item.location,
                    };
                  });
                  ExportConfig.exportToCSV();
                }
              }}
            />
          </div>
        </header>
        <GTable
          columns={usersColumns?.filter(
            (col) => col.key !== "educationalLevel"
          )}
          dataSource={filteredData ?? data}
          loading={isLoading}
          bordered
          onRow={onRow}
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
