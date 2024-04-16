
interface MenuItemsType {
  key: string; 
  label: string;
}

const menuItems: MenuItemsType[] = [
  {
    key: "/overview",
    label: "Overview",
  },
  {
    key: "/games",
    label: "Games",
  },
  {
    key: "/campaign",
    label: "Campaign",
  },
  {
    key: "/events",
    label: "Events",
  },
  {
    key: "/results",
    label: "Game Results",
  },
  {
    key: "/users",
    label: "Users",
  },
];

export { menuItems };
