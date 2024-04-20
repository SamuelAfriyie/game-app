import { MoreOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <>
        <div className="flex" style={{ color: "#013D84" }}>
          <FormOutlined />
          <p className="ml-2">edit</p>
        </div>
      </>
    ),
  },
  {
    key: "2",
    label: (
      <>
        <div className="flex" style={{ color: "red" }}>
          <DeleteOutlined />
          <p className="ml-2">delete</p>
        </div>
      </>
    ),
  },
];

export default function EventCard() {
  return (
    <>
      <div
        className="h-64 w-full bg-white rounded-lg  shadow-lg p-4"
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <header>
          <p className="font-lg font-semibold text-4xl">08</p>
          <p className="font-medium ">April</p>
        </header>
        <main className="mt-20">
          <p className="font-medium text-lg">Event TItle</p>
          <p className="font-medium ">Event Name</p>
        </main>
        <footer className="flex justify-between mt-4">
          <p className="font-medium ">08-23 Apr</p>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <MoreOutlined />
          </Dropdown>
        </footer>
      </div>
    </>
  );
}
