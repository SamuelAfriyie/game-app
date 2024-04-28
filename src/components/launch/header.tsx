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
        <GiSandsOfTime
          style={{
            fontSize: 28,
            color: "white",
            marginRight: 5,
            fontWeight: "bolder",
          }}
        />
        <p className="text-white text-2xl font-bold">10:00</p>
      </section>
    </Header>
  );
}
