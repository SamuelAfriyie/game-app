"use client";
import { Layout, Avatar, Input, MenuProps, Dropdown, Image } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useClientSession } from "@/hooks/custom/use_session";
const { Header } = Layout;

export default function MyHeader() {
  const email = useClientSession("email")?.toString() || "";

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <p className="text-base font-semibold">{email}</p>
        </>
      ),
    },
    {
      key: "2",
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
      {/* logo */}
      {/* <div className="w-48 bg-white h-[65%] m-3 rounded-md items-center" /> */}

      <Image
        src="./static/photos/seedstars.png"
        width={140}
        preview={false}
        alt="logo"
        className="ml-3 rounded-sm"
      />

      {/* Icons options */}
      <section className="flex items-center md:w-[20%] w-[50%]">
        <Input
          placeholder="Search"
          className="w-96 invisible xl:visible"
          style={{ marginRight: 10 }}
        />
        <BellOutlined
          style={{
            fontSize: 24,
            color: "white",
            marginRight: 5,
            fontWeight: "bolder",
          }}
        />
        <div className="h-6 w-0.5 bg-white mx-5"></div>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Avatar
            style={{ marginRight: "15px", padding: 15 }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </section>
    </Header>
  );
}
