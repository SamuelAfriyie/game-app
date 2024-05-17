import axios from "axios";
import useSWRImmutable from "swr/immutable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const UseRanking = (eventId: string) => {
  const { data, error, isLoading } = useSWRImmutable(
    `/api/statistics/ranking?eventId=${eventId}`,
    fetcher
  );

  try {
    return {
      data: data !== undefined ? data : [],
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
