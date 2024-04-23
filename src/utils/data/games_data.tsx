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
    width: 200,
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty", 
    width: 50,
  },
  {
    title: "Points Allocated",
    dataIndex: "points",
    key: "points",
    width: 50,
  },
  {
    title: "Rate of Completion",
    key: "completionRate",
    dataIndex: "completionRate",
    width: 90,
  },
];

export const campaignGamesColumns: TableProps<GameType>["columns"] = [
  {
    title: "Game Title",
    dataIndex: "title",
    key: "title",
    width: 200,
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty", 
    width: 50,
  },
  {
    title: "Points Allocated",
    dataIndex: "points",
    key: "points",
    width: 90,
  },
  {
    title: "Rate of Completion",
    key: "completionRate",
    dataIndex: "completionRate",
    width: 90,
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
  },
  {
    key: "11",
    title: "Game 11",
    difficulty: 3,
    points: 110,
    completionRate: 0.8,
  },
  {
    key: "12",
    title: "Game 12",
    difficulty: 2,
    points: 55,
    completionRate: 0.6,
  },
  {
    key: "13",
    title: "Game 13",
    difficulty: 4,
    points: 165,
    completionRate: 0.9,
  },
  {
    key: "14",
    title: "Game 14",
    difficulty: 1,
    points: 25,
    completionRate: 0.5,
  },
  {
    key: "15",
    title: "Game 15",
    difficulty: 2,
    points: 85,
    completionRate: 0.7,
  },
  {
    key: "16",
    title: "Game 16",
    difficulty: 3,
    points: 125,
    completionRate: 0.8,
  },
  {
    key: "17",
    title: "Game 17",
    difficulty: 2,
    points: 65,
    completionRate: 0.6,
  },
  {
    key: "18",
    title: "Game 18",
    difficulty: 4,
    points: 195,
    completionRate: 0.9,
  },
  {
    key: "19",
    title: "Game 19",
    difficulty: 1,
    points: 35,
    completionRate: 0.5,
  },
  {
    key: "20",
    title: "Game 20",
    difficulty: 2,
    points: 95,
    completionRate: 0.7,
  },
];
export default gamesData;
