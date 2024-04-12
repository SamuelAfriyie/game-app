import { Layout, Button, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: (res: boolean) => void;
  colorBgContainer: any;
}

export default function MyHeader({
  collapsed,
  setCollapsed,
  colorBgContainer,
}: Props) {
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <section className="flex justify-between items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div>
          <BellOutlined
            style={{ fontSize: 20, color: "gray", marginRight: 5, fontWeight: "bolder" }}
          />
          <Avatar
            style={{ marginInline: "15px" }}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
            icon={<UserOutlined />}
          />
        </div>
      </section>
    </Header>
  );
}
