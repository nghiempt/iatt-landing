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

  return (number + 50000).toString();
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const getLastFourChars = (input: any) => {
  return input ? input.slice(-4) : "";
};

const convertSpacesToDash = (input: string) => {
  return input?.trim()?.replace(/\s+/g, "-");
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

const renderColor = (color: string) => {
  let result = "";
  switch (color) {
    case "black":
      result = "Đen";
      break;
    case "white":
      result = "Trắng";
      break;
    case "gold":
      result = "Vàng Gold";
      break;
    case "silver":
      result = "Bạc";
      break;
    case "wood":
      result = "Gỗ";
      break;
    default:
      break;
  }
  return result;
};

const calculateTotal = (money: string, ship: any, voucher: any) => {
  const number = Number(money);
  if (ship || voucher) {
    const money = Number(ship);
    const discount = (number + money) * (Number(voucher) / 100);
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

const calculateTotalNumber = (money: string, ship: any, voucher: any) => {
  const number = Number(money);
  if (ship || voucher) {
    const money = Number(ship);
    const discount = (number + money) * (Number(voucher) / 100);
    const result = number + money - discount;
    return result;
  }
  if (isNaN(number)) {
    return "Invalid number";
  }
  return number;
};

export const HELPER = {
  formatVND,
  formatDate,
  getLastFourChars,
  convertSpacesToDash,
  upPrice,
  renderCategory2,
  renderColor,
  calculateTotal,
  calculateTotalNumber,
};
