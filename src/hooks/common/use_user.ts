"use client";
import { message } from "antd";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const UseCreateUser = async (user: any) => {
  try {
    const res = await axios.post(`/api/user`, user);
    if (res.data.status !== 201) {
      return {
        data: res.data,
        success: false,
        message: res.data?.errors,
      };
    }

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

export const UseUpdateUser = async (user: any) => {
  try {
    const res = await axios.patch(`/api/user/${user.id}`, user);
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

export const UseUser = () => {
  const { data, error, isLoading } = useSWR(`/api/user`, fetcher, {
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

export const UseAnyUserById = async (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

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
