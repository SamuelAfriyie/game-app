import axios from "axios";

export const UseLogin = async (data: any) => {
  try {
    const res = await axios.post(`/signin/api`, data);

    if (res.status !== 200) {
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
