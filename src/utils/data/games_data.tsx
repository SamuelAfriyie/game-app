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
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty",
  },
  {
    title: "Points Allocated",
    dataIndex: "points",
    key: "points",
  },
  {
    title: "Rate of Completion",
    key: "completionRate",
    dataIndex: "completionRate",
  },
];

const gamesData: GameType[] = [
  {
    key: "1",
    title: "Game 1",
    difficulty: 3,
    points: 100,
    completionRate: 0.8,
  },
  {
    key: "2",
    title: "Game 2",
    difficulty: 2,
    points: 50,
    completionRate: 0.6,
  },
  {
    key: "3",
    title: "Game 3",
    difficulty: 4,
    points: 150,
    completionRate: 0.9,
  },
  {
    key: "4",
    title: "Game 4",
    difficulty: 1,
    points: 20,
    completionRate: 0.5,
  },
  {
    key: "5",
    title: "Game 5",
    difficulty: 2,
    points: 80,
    completionRate: 0.7,
  },
{
    key: "6",
    title: "Game 6",
    difficulty: 3,
    points: 120,
    completionRate: 0.8,
},
{
    key: "7",
    title: "Game 7",
    difficulty: 2,
    points: 60,
    completionRate: 0.6,
},
{
    key: "8",
    title: "Game 8",
    difficulty: 4,
    points: 180,
    completionRate: 0.9,
},
{
    key: "9",
    title: "Game 9",
    difficulty: 1,
    points: 30,
    completionRate: 0.5,
},
{
    key: "10",
    title: "Game 10",
    difficulty: 2,
    points: 90,
    completionRate: 0.7,
}
  // Add more game objects as needed
];

export default gamesData;
