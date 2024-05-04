import { fetcher } from "@/utils/data/prisma_instance";
import { EventResults, result } from "@prisma/client";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

export const UseEventSubInfo = (eventId: string, userId: string) => {
  const { data, error, isLoading } = useSWRImmutable(
    `/api/results?eventId=${eventId}&default=${userId}`,
    fetcher
  ); // stop automatic revalidation

  return {
    data: data?.data,
    isLoading: isLoading,
    isError: error,
  };
};

export const UseDecrementAttempt = async (eventId: string) => {
  try {
    const res = await axios.patch(`/api/results`, { eventId });
    if (res.data.status !== 201) {
      return {
        data: res.data,
        success: false,
      };
    }

    return {
      data: res,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: error,
      success: false,
    };
  }
};

export const UseCreateResult = async (result: any) => {
  try {
    const res = await axios.post(`/api/results`, result);
    if (res.data.status !== 201) {
      return {
        data: res.data,
        success: false,
      };
    }

    return {
      data: res,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: error,
      success: false,
    };
  }
};

export const UseCreateAttempt = async (result: result) => {
  try {
    const res = await axios.post(`/api/result`, result);
    if (res.data.status !== 201) {
      return {
        data: res.data,
        success: false,
      };
    }

    return {
      data: res,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      data: error,
      success: false,
    };
  }
};
