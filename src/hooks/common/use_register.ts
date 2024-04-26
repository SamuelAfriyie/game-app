import axios from "axios";

export const UseRegister = async (register: any) => {
  try {
    const res = await axios.post(`/register/api`, register);

    if (res.status !== 201) {
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
