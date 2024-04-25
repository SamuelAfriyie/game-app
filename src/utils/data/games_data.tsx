import { TableProps } from "antd";

interface GameType {
  key: string;
  title: string;
  difficulty: number;
  points: number;
  completionRate: number;
}

export const gamesColumns: TableProps<GameType>["columns"] = [
  {
    title: "Game Title",
    dataIndex: "Title",
    key: "Title",
    width: 200,
  },
  {
    title: "Difficulty",
    dataIndex: "Difficulty",
    key: "Difficulty", 
    width: 50,
  },
  {
    title: "Points Allocated",
    dataIndex: "PointAllocated",
    key: "PointAllocated",
    width: 50,
  },
  {
    title: "Rate of Completion",
    key: "RateOfCompletion",
    dataIndex: "RateOfCompletion",
    width: 90,
  },
];

export const campaignGamesColumns: TableProps<GameType>["columns"] = [
  {
    title: "Game Title",
    dataIndex: "Title",
    key: "Title",
    width: 200,
  },
  {
    title: "Difficulty",
    dataIndex: "Difficulty",
    key: "Difficulty", 
    width: 50,
  },
  {
    title: "Points Allocated",
    dataIndex: "PointAllocated",
    key: "PointAllocated",
    width: 90,
  },
  {
    title: "Rate of Completion",
    key: "RateOfCompletion",
    dataIndex: "RateOfCompletion",
    width: 90,
  },
];
