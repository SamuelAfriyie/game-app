"use client";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCampaign = () => {
  try {
    const { data, error, isLoading } = useSWR(`/campaign/api`, fetcher);

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

export const useCreateCampaign = async (campaign: any) => {
  try {
    const res = await axios.post(`/campaign/api`, campaign);
    return {
      data: res.data,
      success: true,
    };
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
};
