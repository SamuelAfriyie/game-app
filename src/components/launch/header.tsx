import { Layout, Avatar, MenuProps, Dropdown, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Header } = Layout;
import { signOut } from "next-auth/react";
import Timer from "./timer";

const items: MenuProps["items"] = [
  {
    key: "3",
    label: (
      <div
        className={"border-none "}
        rel="noopener noreferrer"
        onClick={async () => await signOut()}
      >
        Logout
      </div>
    ),
  },
];

export default function LaunchHeader() {
  return (
    <Header
      style={{
        padding: 0,
        background: "#0058A9",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      className="justify-between"
    >
      <div className="flex  ">
        <Image
          src="./static/photos/seedstars.png"
          width={140}
          preview={false}
          alt="logo"
          className="ml-3 rounded-sm"
        />
        <div className="text-white text-xl font-sans ml-5 flex items-end">
          A special puzzle game
        </div>
      </div>

      {/* Icons options */}
      <section className="flex items-center mr-5">
        <Timer />

        <div className="h-6 w-0.5 bg-white mx-5"></div>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Avatar
            style={{ padding: 15 }}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </section>
    </Header>
  );
}
