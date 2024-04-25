"use client";
import { Button, TableProps, Tag } from "antd";
import { ReactNode } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IconButton} from "@/components/common/buttons";

interface GameResult {
  key: string;
  username: string;
  email: string;
  event: string;
  attempts: number;
  level: number;
  score: number;
  status: "Win" | "Loss" | "Not Started";
  action: ReactNode;
}

export const gameResultsColumns: TableProps<GameResult>["columns"] = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
  },
  {
    title: "Attempts",
    dataIndex: "attempts",
    key: "attempts",
    width: 90,
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
    width: 90,
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    width: 90,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 90,
    render: (_, { status }) => (
      <>
        {status === "Win" ? (
          <Tag color="green">Win</Tag>
        ) : status === "Loss" ? (
          <Tag color="red">Loss</Tag>
        ) : (
          <Tag color="blue">Not Started</Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 90,
  },
];

const gameResultsData = (onClick?: ()=> void) => {

  return [
    {
      key: "1",
      username: "John",
      email: "john@example.com",
      event: "event 1",
      attempts: 5,
      level: 3,
      score: 80,
      status: "Win",
      action: <IconButton onClick={onClick} key="1" />,
    },
    {
      key: "2",
      username: "Jane",
      email: "jane@example.com",
      event: "event 2",
      attempts: 3,
      level: 2,
      score: 65,
      status: "Loss",
      action: <IconButton onClick={onClick} key="2" />,
    },
    {
      key: "3",
      username: "Alex",
      email: "alex@example.com",
      event: "event 3",
      attempts: 2,
      level: 1,
      score: 90,
      status: "Win",
      action: <IconButton onClick={onClick} key="3" />,
    },
    {
      key: "4",
      username: "Sarah",
      email: "sarah@example.com",
      event: "event 4",
      attempts: 4,
      level: 2,
      score: 75,
      status: "Loss",
      action: <IconButton onClick={onClick} key="4" />,
    },
    {
      key: "5",
      username: "Michael",
      email: "michael@example.com",
      event: "event 5",
      attempts: 1,
      level: 3,
      score: 95,
      status: "Win",
      action: <IconButton onClick={onClick} key="5" />,
    },
    {
      key: "6",
      username: "Emily",
      email: "emily@example.com",
      event: "event 6",
      attempts: 3,
      level: 2,
      score: 70,
      status: "Loss",
      action: <IconButton onClick={onClick} key="6" />,
    },
    {
      key: "7",
      username: "David",
      email: "david@example.com",
      event: "event 7",
      attempts: 2,
      level: 1,
      score: 85,
      status: "Win",
      action: <IconButton onClick={onClick} key="7" />,
    },
    {
      key: "8",
      username: "Olivia",
      email: "olivia@example.com",
      event: "event 8",
      attempts: 4,
      level: 2,
      score: 60,
      status: "Loss",
      action: <IconButton onClick={onClick} key="8" />,
    },
    {
      key: "9",
      username: "Daniel",
      email: "daniel@example.com",
      event: "event 9",
      attempts: 1,
      level: 3,
      score: 100,
      status: "Win",
      action: <IconButton onClick={onClick} key="9" />,
    },
    {
      key: "10",
      username: "Sophia",
      email: "sophia@example.com",
      event: "event 10",
      attempts: 3,
      level: 2,
      score: 55,
      status: "Loss",
      action: <IconButton onClick={onClick} key="10" />,
    },
    {
      key: "11",
      username: "Matthew",
      email: "matthew@example.com",
      event: "event 11",
      attempts: 2,
      level: 1,
      score: 90,
      status: "Win",
      action: <IconButton onClick={onClick} key="11" />,
    },
    {
      key: "12",
      username: "Ava",
      email: "ava@example.com",
      event: "event 12",
      attempts: 4,
      level: 2,
      score: 75,
      status: "Loss",
      action: <IconButton onClick={onClick} key="12" />,
    },
    {
      key: "13",
      username: "James",
      email: "james@example.com",
      event: "event 13",
      attempts: 1,
      level: 3,
      score: 95,
      status: "Win",
      action: <IconButton onClick={onClick} key="13" />,
    },
    // Add more objects as needed
  ];
};
export default gameResultsData;
