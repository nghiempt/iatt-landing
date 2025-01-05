import { API } from "@/utils/api";

const getAll = async () => {
    try {
        const response = await fetch(
            API.ORDER.GET_ALL,
            {
                method: 'GET',
            },
        );
        if (!response.ok) {
            throw new Error(`Failed - Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('========= Error Get All Orders:', error);
        return false;
    }
};

const createOrder = async (payload: any) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(
            API.ORDER.CREATE,
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload),
                redirect: "follow"
            },
        );
        if (!response.ok) {
            throw new Error(`Failed - Status: ${response.status}`);
        }
        return true;
    } catch (error: any) {
        console.error('========= Error Create Order:', error);
        return false;
    }
};

export const OrderService = {
    getAll,
    createOrder
};
