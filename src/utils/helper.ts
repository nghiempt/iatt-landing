const formatVND = (money: string) => {
    const number = Number(money);
    if (isNaN(number)) {
        return "Invalid number";
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const calculateTotal = (money: string, voucher: any) => {
    const number = Number(money);
    if (voucher) {
        const discount = Number(voucher);
        const result = number - discount
        return result.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    if (isNaN(number)) {
        return "Invalid number";
    }
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

const convertSpacesToDash = (input: string) => {
    return input.trim().replace(/\s+/g, '-');
}

const getLastFourChars = (input: any) => {
    return input.slice(-4);
}

const renderCategory = (category: string) => {
    let result = ''
    switch (category) {
        case "plastic":
            result = 'Ép Plastic'
            break;
        case "frame":
            result = 'Khung Ảnh'
            break;
        case "album":
            result = 'Album'
            break;
        default:
            break;
    }
    return result
}

const renderColor = (color: string) => {
    let result = ''
    switch (color) {
        case "black":
            result = 'bg-black'
            break;
        case "white":
            result = 'bg-white'
            break;
        default:
            break;
    }
    return result
}

export const HELPER = {
    formatVND,
    renderCategory,
    renderColor,
    convertSpacesToDash,
    getLastFourChars,
    calculateTotal
}