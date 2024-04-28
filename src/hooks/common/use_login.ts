import { baseUrl } from "@/utils/data/prisma_instance";
import axios, { AxiosError } from "axios";

export const UseLogin = async (data: any) => {
  try {
    
    const res = await axios.post(`${baseUrl}/api/auth/signin`, data);
    if (res.data.status !== 200) {
      return {
        data: res.data,
        success: false,
      };
    }

    return {
      data: res.data,
      success: true,
    };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.log(error.config);
    }
    return {
      data: error.request.data,
      success: false,
    };
  }
};
