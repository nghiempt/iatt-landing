import { API } from "@/utils/api";

const getAll = async () => {
    try {
        const response = await fetch(
            API.PRODUCT.GET_ALL,
            {
                method: 'GET',
            },
        );
        if (!response.ok) {
            throw new Error(`Failed - Status: ${response.status}`);
        }
        const data = await response.json();
        let tmp: any = []
        data.data?.forEach((item: any) => {
            if (!item?.deleted_at) {
                tmp.push(item)
            }
        })
        return { data: tmp };
    } catch (error: any) {
        console.error('========= Error Get All Products:', error);
        return false;
    }
};

export const ProductService = {
    getAll,
};
