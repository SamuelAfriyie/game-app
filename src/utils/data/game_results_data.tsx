"use client";
import { TableProps, Tag } from "antd";
import { ReactNode } from "react";

interface GameResult {
  key: string;
  username: string;
  email: string;
  event: string;
  attempts: number;
  level: number;
  score: number;
  status: "Win" | "Loss" | "Not Started";
  date: string;
  action: ReactNode;
}

export interface EventResultsType {
  key: string;
  event: string;
  attempts: number;
  level: number;
  score: number;
  date: string;
  status: "Win" | "Loss" | "Not Started";
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
    title: "Created At",
    dataIndex: "date",
    key: "date",
    width: 120,
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

export const gameResultsEventColumns: TableProps<EventResultsType>["columns"] =
  [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Attempts",
      dataIndex: "attemptCount",
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
      title: "Created At",
      dataIndex: "date",
      key: "date",
      width: 120,
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
          ) : (
            <Tag color="red">Loss</Tag>
          )}
        </>
      ),
    },
  ];
