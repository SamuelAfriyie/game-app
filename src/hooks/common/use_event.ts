"use client";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useEvent = () => {
  try {
    const { data, error, isLoading } = useSWR(`/events/api`, fetcher);

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
  } catch (error) {
    return {
      data: [],
      isLoading: false,
      isError: error,
    };
  }
};

export const useCreateEvent = async (event: any) => {
    console.log(event);
  try {
    const res = await axios.post(`/events/api`, event);
    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    return {
      error: error,
      success: false,
    };
  }
};
