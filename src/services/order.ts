import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.ORDER.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Orders:", error);
    return false;
  }
};

const createOrder = async (payload: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(API.ORDER.CREATE, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("========= Error Create Order:", error);
    return false;
  }
};

const createOrder_no_login = async (payload: any) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(API.ORDER.CREATE_NO_LOGIN, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Create Order:", error);
    return false;
  }
};

const getOrderById = async (id: string) => {
  try {
    const response = await fetch(`${API.ORDER.GET_ORDER_BY_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Login failed - Status: ${response.status}`);
      throw new Error(`Get Account Failed - Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("========= Error Get Order By Account Id:", error);
    throw error;
  }
};

export const OrderService = {
  getAll,
  createOrder,
  createOrder_no_login,
  getOrderById,
};
