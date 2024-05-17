import { getDay, getMonth, getMonthName } from "@/utils/func/date_extensions";
import { MoreOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Popover } from "antd";

interface EventCardProps {
  id: string;
  campaign: any;
  name: string;
  startDate: string;
  endDate: string;
  handleUpdate: (id: string) => void;
}

export default function EventCard({
  id,
  campaign: { name: title, games },
  name,
  startDate,
  endDate,
  handleUpdate,
}: EventCardProps) {
  const getCustomDate = (date: string) => {
    return `${getDay(date)}-${getMonth(date)} ${getMonthName(date).slice(
      0,
      3
    )}`;
  };

  const content = () => (
    <div>
      {" "}
      {games.map((g: any, i: number) => {
        return <p key={i}>{g.Title}</p>;
      })}
    </div>
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div
            className="flex"
            style={{ color: "#013D84" }}
            onClick={() => handleUpdate(id)}
          >
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

  const colorEventByDate = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today > end) {
      return "#686868"; // past event
    } else if (today >= start && today <= end) {
      return "#0865AC"; // current event
    } else {
      return "#59B0F2"; // future event
    }
  };

  return (
    <>
      {/* <Popover
        placement="rightBottom"
        title={"Games"}
        content={content}
        trigger="click"
      > */}
      <div
        className="h-64 w-full rounded-lg shadow-md p-4 text-white"
        style={{ backgroundColor: colorEventByDate() }}
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
      {/* </Popover> */}
    </>
  );
}
