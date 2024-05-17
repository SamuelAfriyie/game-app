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
    width: 80,
  }, 
  {
    title: "Pass Score",
    key: "passScore",
    dataIndex: "passScore",
    width: 100,
  },
  {
    title: "No. Of Attempts",
    key: "numOfAttempts",
    dataIndex: "numOfAttempts",
    width: 130,
  },
  {
    title: "Date Created",
    key: "dateCreated",
    dataIndex: "dateCreated",
    width: 120,
  },
];

export const gameResultsCampaignColumns: TableProps<CampaignType>["columns"] = [
  {
    title: "Campaign Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    width: 80,
  },
  {
    title: "No. Of Levels",
    dataIndex: "levels",
    key: "levels",
    width: 100,
  },
  {
    title: "Pass Score",
    key: "passScore",
    dataIndex: "passScore",
    width: 90,
  },
  {
    title: "No. Of Attempts",
    key: "attempts",
    dataIndex: "attempts",
    width: 140,
  },
  {
    title: "Date Created",
    key: "dateCreated",
    dataIndex: "dateCreated",
    width: 130,
  },
];
  
