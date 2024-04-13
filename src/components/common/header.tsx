import { Layout, Avatar } from "antd";
import {
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

interface Props {
  colorBgContainer: any;
  children?: React.ReactNode;
}

export default function MyHeader({ colorBgContainer, children }: Props) {
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
      <div className="w-48 bg-white h-[70%] m-3 rounded-md " />
      {/* menu */}
      <div>{children}</div>
      {/* Icons options */}
      <section className="flex items-center">
        <BellOutlined
          style={{
            fontSize: 24,
            color: "white",
            marginRight: 5,
            fontWeight: "bolder",
          }}
        />
        <div className="h-6 w-0.5 bg-white mx-3"></div>
        <Avatar
          style={{ marginRight: "15px" }}
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
          icon={<UserOutlined />}
        />
      </section>
    </Header>
  );
}
