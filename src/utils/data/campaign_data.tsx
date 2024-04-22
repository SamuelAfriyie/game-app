import { TableProps } from "antd";

interface CampaignType {
  key: string;
  name: string;
  duration: number;
  levels: number;
  passScore: number;
  attempts: number;
  dateCreated: string;
}

export const campaignColumns: TableProps<CampaignType>["columns"] = [
  {
    title: "Campaign Name",
    dataIndex: "name",
    key: "name",
    width: 350,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration", 
    width: 120,
  },
  {
    title: "Number Of Levels",
    dataIndex: "levels",
    key: "levels",
    width: 160,
  },
  {
    title: "Pass Score",
    key: "passScore",
    dataIndex: "passScore",
    width: 120,
  },
  {
    title: "Number Of Attempts",
    key: "attempts",
    dataIndex: "attempts",
    width: 160,
  },
  {
    title: "Date Created",
    key: "dateCreated",
    dataIndex: "dateCreated",
  },
];

const campaignData: CampaignType[] = [
  {
    key: "1",
    name: "Campaign 1",
    duration: 60,
    levels: 10,
    passScore: 80,
    attempts: 3,
    dateCreated: "2022-01-01",
  },
  {
    key: "2",
    name: "Campaign 2",
    duration: 45,
    levels: 8,
    passScore: 75,
    attempts: 2,
    dateCreated: "2022-01-02",
  },
  {
    key: "3",
    name: "Campaign 3",
    duration: 30,
    levels: 5,
    passScore: 90,
    attempts: 1,
    dateCreated: "2022-01-03",
  },
  {
    key: "4",
    name: "Campaign 4",
    duration: 120,
    levels: 15,
    passScore: 85,
    attempts: 4,
    dateCreated: "2022-01-04",
  },
  {
    key: "5",
    name: "Campaign 5",
    duration: 90,
    levels: 12,
    passScore: 70,
    attempts: 2,
    dateCreated: "2022-01-05",
  },
  {
    key: "6",
    name: "Campaign 6",
    duration: 60,
    levels: 8,
    passScore: 95,
    attempts: 3,
    dateCreated: "2022-01-06",
  },
  {
    key: "7",
    name: "Campaign 7",
    duration: 45,
    levels: 6,
    passScore: 80,
    attempts: 2,
    dateCreated: "2022-01-07",
  },
  {
    key: "8",
    name: "Campaign 8",
    duration: 30,
    levels: 4,
    passScore: 85,
    attempts: 1,
    dateCreated: "2022-01-08",
  },
  {
    key: "9",
    name: "Campaign 9",
    duration: 120,
    levels: 10,
    passScore: 75,
    attempts: 4,
    dateCreated: "2022-01-09",
  },
  {
    key: "10",
    name: "Campaign 10",
    duration: 90,
    levels: 8,
    passScore: 80,
    attempts: 3,
    dateCreated: "2022-01-10",
  },
  {
    key: "11",
    name: "Campaign 11",
    duration: 60,
    levels: 6,
    passScore: 90,
    attempts: 2,
    dateCreated: "2022-01-11",
  },
  {
    key: "12",
    name: "Campaign 12",
    duration: 45,
    levels: 4,
    passScore: 95,
    attempts: 1,
    dateCreated: "2022-01-12",
  },
  // Add more campaign data objects here...
];

export default campaignData;
