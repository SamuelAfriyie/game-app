import { TableProps } from "antd";

interface User {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  level?: number;
}

export const usersColumns: TableProps<User>["columns"] = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    width: 300,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    width: 300,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 300,
  },
  {
    title: "Educational Level",
    dataIndex: "educationalLevel",
    key: "educationalLevel",
    width: 300,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];
