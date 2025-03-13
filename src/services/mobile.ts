import { API } from "@/utils/api";

const increaseQuality = async (image: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      imageUrl: image,
    });

    const response = await fetch(`${API.MOBILE.INCREASE_QUALITY}`, {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    console.error("========= Error Increase quality Check:", error);
    return false;
  }
};

const imageAI = async (image: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      imageUrl: image,
      style: "face2paint",
    });

    const response = await fetch(`${API.MOBILE.IMAGE_AI}`, {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    console.error("========= Error Image AI Check:", error);
    return false;
  }
};

const removeBackground = async (image: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      imageUrl: image,
      style: "face2paint",
    });

    const response = await fetch(`${API.MOBILE.REMOVE_BACKGROUND}`, {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed - Status: ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    console.error("========= Error Image Remove Background Check:", error);
    return false;
  }
};

export const MobileService = {
  increaseQuality,
  imageAI,
  removeBackground,
};
