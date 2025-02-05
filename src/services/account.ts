import { API } from "@/utils/api";
import Cookies from "js-cookie";

const getAll = async () => {
  try {
    const response = await fetch(API.ACCOUNT.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Accounts:", error);
    return false;
  }
};

const updateAccount = async (id: any, payload: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${API.ACCOUNT.UPDATE}/${id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    return true;
  } catch (error: any) {
    console.error("========= Error Update Account:", error);
    return false;
  }
};

// const loginAccount = async (email: any, password: any) => {
//   try {
//     const response = await fetch(API.AUTH.LOGIN_MANUAL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       console.log(
//         "login failed - Status: ${response.status}",
//         JSON.stringify({ email, password })
//       );
//       throw new Error(`Đăng nhập thất bại - Status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (data?.message == "SUCCESS") {
//       return data;
//     } else {
//       throw new Error("Thông tin đăng nhập không hợp lệ");
//     }
//   } catch (error) {
//     console.error("========= Error Login:", error);
//   }
// };

const loginAccount = async (email: string, password: string) => {
  try {
    const response = await fetch(API.AUTH.LOGIN_MANUAL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error(
        `Login failed - Status: ${response.status}`,
        JSON.stringify({ email, password })
      );
      throw new Error(`Đăng nhập thất bại - Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("========= Error Login:", error);
    throw error;
  }
};

export const AccountService = {
  getAll,
  updateAccount,
  loginAccount,
};
