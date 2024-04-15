import { TableProps, Tag } from "antd";

interface DataType {
  key: string;
  name: string;
  level: number;
  desc: string;
  tags: string[];
}

const gameTestColumns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "desc",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 6 ? "volcano" : "geekblue";

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const gameTestData: DataType[] = [
  {
    key: "1",
    name: "Game 1",
    level: 32,
    desc: "New York No. 1 Lake Park",
    tags: ["Active"],
  },
  {
    key: "2",
    name: "Game 2",
    level: 42,
    desc: "London No. 1 Lake Park",
    tags: ["InActive"],
  },
  {
    key: "3",
    name: "Game 3",
    level: 32,
    desc: "Sydney No. 1 Lake Park",
    tags: ["InActive"],
  },
  {
    key: "4",
    name: "Game 4",
    level: 42,
    desc: "London No. 1 Lake Park",
    tags: ["Active"],
  },
  {
    key: "5",
    name: "Game 5",
    level: 32,
    desc: "Sydney No. 1 Lake Park",
    tags: ["InActive"],
  },
  {
    key: "6",
    name: "Game 6",
    level: 42,
    desc: "London No. 1 Lake Park",
    tags: ["Active"],
  },
  {
    key: "7",
    name: "Game 7",
    level: 32,
    desc: "Sydney No. 1 Lake Park",
    tags: ["Active"],
  },
  {
    key: "8",
    name: "Game 5",
    level: 32,
    desc: "Sydney No. 1 Lake Park",
    tags: ["InActive"],
  },
  {
    key: "9",
    name: "Game 6",
    level: 42,
    desc: "London No. 1 Lake Park",
    tags: ["Active"],
  },
  {
    key: "10",
    name: "Game 7",
    level: 32,
    desc: "Sydney No. 1 Lake Park",
    tags: ["Active"],
  },
];

export { gameTestData, gameTestColumns };
