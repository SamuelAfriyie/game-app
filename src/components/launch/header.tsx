import { Layout, Avatar, Input, MenuProps, Dropdown, Image } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
const { Header } = Layout;
import { GiSandsOfTime } from "react-icons/gi";

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
      
      <Image src='./static/photos/seedstars.png' width={140} preview={false} alt="logo" className="ml-3 rounded-sm"/>

      {/* Icons options */}
      <section className="flex items-center w-[20%]">
        <GiSandsOfTime 
          style={{
            fontSize: 24,
            color: "white",
            marginRight: 5,
            fontWeight: "bolder",
          }}
        />
      </section>
    </Header>
  );
}
