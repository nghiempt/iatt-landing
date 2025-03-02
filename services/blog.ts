import { API } from "@/utils/api";

const getAll = async () => {
  try {
    const response = await fetch(API.BLOG.GET_ALL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("========= Error Get All Blogs:", error);
    return false;
  }
};

export const BlogService = {
  getAll,
};
