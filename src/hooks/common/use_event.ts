"use client";
import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const UseEvent = () => {
  // const { data, error, isLoading } = useSWRImmutable(`/api/events`, fetcher);
  const { data, error, isLoading } = useSWR(`/api/events`, fetcher, {
    refreshInterval: 2000,
  });
  try {
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

export const GetEventById = (id: String) => {
  const { data, error, isLoading } = useSWRImmutable(
    `/api/events/${id}`,
    fetcher
  );
  // const { data, error, isLoading } = useSWR(`/api/events/${id}`, fetcher);
  try {
    return {
      data: data,
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

export const UseCreateEvent = async (event: any) => {
  try {
    const res = await axios.post(`/api/events`, event);
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

export const UseUpdateEvent = async (event: any) => {
  try {
    const res = await axios.put(`/api/events`, event);
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

export const UseGetEventWithNamesOnly = () => {
  const { data, error, isLoading } = useSWRImmutable(
    `/api/events/eventWithNameOnly`,
    fetcher
  );

  try {
    const events = data.map((event: any) => {
      return { value: event.id, label: event.name };
    });

    return {
      eventNames: events !== undefined ? events : [],
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
