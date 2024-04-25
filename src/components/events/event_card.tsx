import { MoreOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Popover } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <>
        <div className="flex" style={{ color: "#013D84" }}>
          <FormOutlined />
          <p className="ml-2">edit</p>
        </div>
      </>
    ),
  },
  {
    key: "2",
    label: (
      <>
        <div className="flex" style={{ color: "red" }}>
          <DeleteOutlined />
          <p className="ml-2">delete</p>
        </div>
      </>
    ),
  },
];

interface EventCardProps {
  id: string;
  campaign: any;
  name: string;
  startDate: string;
  endDate: string;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EventCard({
  id,
  campaign: { name: title, games },
  name,
  startDate,
  endDate,
}: EventCardProps) {
  const getDay = (date: string) => {
    const d = new Date(startDate).getDay();
    if (d < 10) return `0${d}`;
  };
  const getMonth = (date: string) => {
    const m = new Date(startDate).getMonth();
    if (m < 10) return `0${m}`;
  };

  const getMonthName = (date: string) => {
    return monthNames[new Date(startDate).getMonth()];
  };

  const getCustomDate = (date: string) => {
    return `${getDay(date)}-${getMonth(date)} ${getMonthName(date).slice(
      0,
      3
    )}`;
  };

  const content = () => (
    <div>
      {" "}
      {games.map((g: any) => {
        return <p>{g.Title}</p>;
      })}
    </div>
  );

  return (
    <>
    
    <Popover placement="rightBottom" title={"Games"} content={content} trigger="click">
      <div
        className="h-64 w-full rounded-lg shadow-md p-4"
        style={{ backgroundColor: "#F3F3F3" }}
      >
        <header>
          <p className="font-lg font-semibold text-4xl">
            {getMonth(startDate)}
          </p>
          <p className="font-medium ">{getMonthName(startDate)}</p>
        </header>
        <main className="mt-20">
          <p className="font-medium text-lg">{name}</p>
          <p className="font-medium ">{title}</p>
        </main>
        <footer className="flex justify-between mt-4">
          <p className="font-medium ">
            {getCustomDate(startDate)}
            <span className="mx-2 text-lg font-semibold">|</span>
            {getCustomDate(endDate)}
          </p>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <MoreOutlined />
          </Dropdown>
        </footer>
      </div>
    </Popover>
    </>
  );
}
