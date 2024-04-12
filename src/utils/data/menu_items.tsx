import { ReactNode } from "react";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ClusterOutlined,
  ReconciliationOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

interface MenuItemsType {
  key: string;
  icon: ReactNode;
  label: string;
}

const menuItems: MenuItemsType[] = [
  {
    key: "1",
    icon: <BarChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <ClusterOutlined />,
    label: "Games",
  },
  {
    key: "3",
    icon: <VideoCameraOutlined />,
    label: "Campaign",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Events",
  },
  {
    key: "5",
    icon: <ReconciliationOutlined />,
    label: "Game Results",
  },
  {
    key: "6",
    icon: <UserOutlined />,
    label: "Users",
  },
];

export { menuItems };
