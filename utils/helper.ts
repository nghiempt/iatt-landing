const formatVND = (money: string) => {
  const number = Number(money);
  if (isNaN(number)) {
    return "Invalid number";
  }
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const upPrice = (money: string) => {
  const number = Number(money);
  if (isNaN(number)) {
    return "Invalid number";
  }

  return (number+50000).toString();
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const getLastFourChars = (input: any) => {
  return input ? input.slice(-4) : "";
};

const convertSpacesToDash = (input: string) => {
  return input.trim().replace(/\s+/g, "-");
};

const renderCategory2 = (category: string) => {
  let result = "";
  switch (category) {
    case "Plastic":
      result = "Ép Plastic";
      break;
    case "Frame":
      result = "Khung Ảnh";
      break;
    case "Album":
      result = "Album";
      break;
    default:
      break;
  }
  return result;
};

const calculateTotal = (money: string, ship: any, voucher: any) => {
  const number = Number(money);
  if (ship || voucher) {
    const discount = Number(voucher);
    const money = Number(ship);
    const result = number + money - discount;
    return result.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  if (isNaN(number)) {
    return "Invalid number";
  }
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const HELPER = {
  formatVND,
  formatDate,
  getLastFourChars,
  convertSpacesToDash,
  upPrice,
  renderCategory2,
  calculateTotal,
};
