import { fetcher } from "@/utils/data/prisma_instance";
import axios from "axios";
import useSWR from "swr";

export const UseEventSubInfo = (eventId: string, userId: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/results?eventId=${eventId}&default=${userId}`,
    fetcher,
    { revalidateOnMount: true, revalidateOnFocus: true, refreshInterval: 1000 }
  ); // stop automatic revalidation

  return {
    data: data?.data,
    isLoading: isLoading,
    isError: error,
  };
};

export const UseGetEventResults = () => {
  const { data, error, isLoading } = useSWR(
    `/api/results/eventResult`,
    fetcher,
    { revalidateOnMount: true, revalidateOnFocus: true, refreshInterval: 5000 }
  ); // stop automatic revalidation

  return {
    data: data?.data,
    isLoading: isLoading,
    isError: error,
  };
};

export const UseDecrementAttemptCount = async (eventId: string) => {
  try {
    const res = await axios.patch(`/api/results`, { eventId });
    if (res.data.status !== 200) {
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
    return {
      data: error,
      success: false,
    };
  }
};

export const UseAddNewAttempt = async (
  eventId: string,
  decision: "TRY_AGAIN" | "CONGRATS",
  attempt: any
) => {
  try {
    const res = await axios.patch(`/api/results/eventResult`, {
      eventId,
      decision,
      attempt,
    });
    if (res.data.status !== 200) {
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
    return {
      data: error,
      success: false,
    };
  }
};
