"use client";
import { Menu } from "antd";
import { menuItems } from "@/utils/data/menu_items";
import { useRouter } from "next/navigation";

export default function Menus() {
  const router = useRouter();

  const handleOnSelect = (key: string) => {
    console.log(key);

    switch (key) {
      case "1":
        router.push("/dashboard");
        break;
      case "2":
        router.push("/games");
        break;
      case "3":
        router.push("/campaign");
        break;
      case "4":
        router.push("/events");
        break;
      case "5":
        router.push("/results");
        break;
      case "6":
        router.push("/users");
        break;

      default:
        console.log("Nothing");
        break;
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={menuItems}
      onSelect={({ key }) => handleOnSelect(key)}
    />
  );
}
