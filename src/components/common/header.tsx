import { Layout, Avatar, Input, MenuProps, Dropdown, Image } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <>
        <p className="text-lg font-semibold">johndoe@gmail.com</p>
        {/* <div className="w-full h-0.5 bg-black my-1" /> */}
      </>
    ),
  },
  {
    key: "2",
    label: <p>Notification</p>,
  },
  {
    key: "3",
    label: (
      <a 
        rel="noopener noreferrer"
        href="/signin"
        className="font-semibold"
      >
        Logout
      </a>
    ),
  },
];

export default function MyHeader() {
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
      
      <Image src='./static/photos/seedstars.png' width={140} preview={false} alt="logo" className="ml-3 rounded-sm"/>

      {/* Icons options */}
      <section className="flex items-center w-[20%]">
        <Input
          placeholder="Search"
          className="w-96"
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
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </section>
    </Header>
  );
}
