import axios from "axios";

export const baseUrl = process.env.NEXTAUTH_URL;

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
