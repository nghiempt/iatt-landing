import { API } from "@/utils/api";

const getAll = async () => {
    try {
        const response = await fetch(
            API.ACCOUNT.GET_ALL,
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
        console.error('========= Error Get All Accounts:', error);
        return false;
    }
};

const updateAccount = async (id: any, payload: any) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(
            `${API.ACCOUNT.UPDATE}/${id}`,
            {
                method: 'PUT',
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
        console.error('========= Error Update Account:', error);
        return false;
    }
};

export const AccountService = {
    getAll,
    updateAccount
};
