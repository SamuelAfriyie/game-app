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
    <div className="shadow-sm rounded-sm px-5 py-2">
      <div className="flex flex-row justify-between h-full w-full items-center">
        <div className="flex space-x-10 items-center">
          <Image
            // src={"/static/photos/logo.png"}
            src={avatar}
            className="rounded-full"
            width={60}
            height={60}
            alt={"User Avatar"}
            
          />
          <div>
            <p className="text-lg font-semibold">{username}</p>
            <p className="email">{email}</p>
          </div>
        </div>
        <p className="text-lg font-semibold">{score}</p>
      </div>
    </div>
  );
};

export default ListTile;
