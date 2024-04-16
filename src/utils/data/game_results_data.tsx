"use client";
import { Button, TableProps, Tag } from "antd";
import { ReactNode } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IconButton } from "@/components/common/buttons";

interface GameResult {
  key: string;
  username: string;
  email: string;
  campaign: string;
  attempts: number;
  level: number;
  score: number;
  status: "Passed" | "Failed" | "Not Started";
  actions: ReactNode[];
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
    title: "Campaign",
    dataIndex: "campaign",
    key: "campaign",
  },
  {
    title: "Attempts",
    dataIndex: "attempts",
    key: "attempts",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => (
      <>
        {status === "Passed" ? (
          <Tag color="green">Passed</Tag>
        ) : status === "Failed" ? (
          <Tag color="red">Failed</Tag>
        ) : (
          <Tag color="blue">Not Started</Tag>
        )}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "actions",
    key: "actions",
    align: "center",
    width: 90,
  },
];

const gameResultsData: GameResult[] = [
  {
    key: "1",
    username: "John",
    email: "john@example.com",
    campaign: "Campaign 1",
    attempts: 5,
    level: 3,
    score: 80,
    status: "Passed",
    actions: [<IconButton key="1" />],
  },
  {
    key: "2",
    username: "Jane",
    email: "jane@example.com",
    campaign: "Campaign 2",
    attempts: 3,
    level: 2,
    score: 65,
    status: "Failed",
    actions: [<IconButton key="2" />],
  },
  {
    key: "3",
    username: "Alex",
    email: "alex@example.com",
    campaign: "Campaign 3",
    attempts: 2,
    level: 1,
    score: 90,
    status: "Passed",
    actions: [<IconButton key="3" />],
  },
  {
    key: "4",
    username: "Sarah",
    email: "sarah@example.com",
    campaign: "Campaign 4",
    attempts: 4,
    level: 2,
    score: 75,
    status: "Failed",
    actions: [<IconButton key="4" />],
  },
  {
    key: "5",
    username: "Michael",
    email: "michael@example.com",
    campaign: "Campaign 5",
    attempts: 1,
    level: 3,
    score: 95,
    status: "Passed",
    actions: [<IconButton key="5" />],
  },
  {
    key: "6",
    username: "Emily",
    email: "emily@example.com",
    campaign: "Campaign 6",
    attempts: 3,
    level: 2,
    score: 70,
    status: "Failed",
    actions: [<IconButton key="6" />],
  },
  {
    key: "7",
    username: "David",
    email: "david@example.com",
    campaign: "Campaign 7",
    attempts: 2,
    level: 1,
    score: 85,
    status: "Passed",
    actions: [<IconButton key="7" />],
  },
  {
    key: "8",
    username: "Olivia",
    email: "olivia@example.com",
    campaign: "Campaign 8",
    attempts: 4,
    level: 2,
    score: 60,
    status: "Failed",
    actions: [<IconButton key="8" />],
  },
  {
    key: "9",
    username: "Daniel",
    email: "daniel@example.com",
    campaign: "Campaign 9",
    attempts: 1,
    level: 3,
    score: 100,
    status: "Passed",
    actions: [<IconButton key="9" />],
  },
  {
    key: "10",
    username: "Sophia",
    email: "sophia@example.com",
    campaign: "Campaign 10",
    attempts: 3,
    level: 2,
    score: 55,
    status: "Failed",
    actions: [<IconButton key="10" />],
  },
  {
    key: "11",
    username: "Matthew",
    email: "matthew@example.com",
    campaign: "Campaign 11",
    attempts: 2,
    level: 1,
    score: 90,
    status: "Passed",
    actions: [<IconButton key="11" />],
  },
  {
    key: "12",
    username: "Ava",
    email: "ava@example.com",
    campaign: "Campaign 12",
    attempts: 4,
    level: 2,
    score: 75,
    status: "Failed",
    actions: [<IconButton key="12" />],
  },
  {
    key: "13",
    username: "James",
    email: "james@example.com",
    campaign: "Campaign 13",
    attempts: 1,
    level: 3,
    score: 95,
    status: "Passed",
    actions: [<IconButton key="13" />],
  },
  // Add more objects as needed
];

export default gameResultsData;
