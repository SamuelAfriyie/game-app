"use client";
import { Menu } from "antd";
import { menuItems } from "@/utils/data/menu_items";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'

export default function Menus() {
  const router = useRouter();
  const prev = usePathname();
  
  const changeRoute = (key: string) => {
    const route = menuItems.find((menu) => menu.key === key);
    router.push(route?.key ?? "/overview");
  };

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{ flex: 1, minWidth: 0 }}
      className="flex justify-center"
      defaultSelectedKeys={[prev]}
      items={menuItems}
      onSelect={({ key }) => changeRoute(key)}
    />
  );
}
