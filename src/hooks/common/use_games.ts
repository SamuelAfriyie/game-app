"use client";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useGames = () => {
  const { data, error, isLoading } = useSWR(`/games/api`, fetcher);

  const appendKey = (data: any[]) => {
    return data?.map((item: any, index: number) => {
      return { ...item, key: index };
    });
  };
  return {
    data: data !== undefined ? appendKey(data) : [],
    isLoading,
    isError: error,
  };
};

export const useGameUpdate = async (game: any) => {
  const res = await axios.patch(`/games/api/${game?.id}`, game);
  console.log(res);
  return {
    data: res,
  };
};
