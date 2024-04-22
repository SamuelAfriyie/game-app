import { Card } from "antd";
import Image from "next/image";
import React from "react";

interface ListTileProps {
  avatar: string;
  username: string;
  email: string;
  score: number;
}

const ListTile: React.FC<ListTileProps> = ({
  avatar,
  username,
  email,
  score,
}) => {
  return (
    <div className="shadow-sm rounded-sm p-5">
      <div className="flex flex-row justify-between h-full w-full items-center">
        <div className="flex space-x-10 items-center">
          <Image
            src={"/static/photos/logo.png"}
            className="rounded-full"
            width={30}
            height={30}
            alt={"User Avatar"}
          />
          <div>
            <div className="username">{username}</div>
            <div className="email">{email}</div>
          </div>
        </div>
        <div>{"score"}</div>
      </div>
    </div>
  );
};

export default ListTile;
