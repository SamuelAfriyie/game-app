import axios from "axios";

export const UseRegister = async (register: any) => {
  try {
    const res = await axios.post(`/api/auth/register`, register);
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
