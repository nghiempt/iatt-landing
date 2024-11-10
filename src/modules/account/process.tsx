"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Option = {
    label: string;
    value: string;
    priceModifier: number;
};

type ProductType = {
    label: string;
    value: string;
    url: string;
};

const materials: Option[] = [
    { label: "Gỗ", value: "paper", priceModifier: 50000 },
    { label: "Tráng gương", value: "plastic", priceModifier: 100000 },
    { label: "Titan A1", value: "plastic2", priceModifier: 100000 },
    { label: "Titan A2", value: "plastic3", priceModifier: 100000 },
];

const colors: Option[] = [
    { label: "Đen", value: "black", priceModifier: 20000 },
    { label: "Trắng", value: "white", priceModifier: 15000 },
    { label: "Bạc", value: "gray", priceModifier: 15000 },
    { label: "Vàng", value: "yellow", priceModifier: 15000 },
];

const sizes: Option[] = [
    { label: "15 x 21", value: "small", priceModifier: 30000 },
    { label: "20 x 30", value: "large", priceModifier: 60000 },
    { label: "40 x 60", value: "large", priceModifier: 60000 },
];

// Danh sách các loại sản phẩm
const productTypes: ProductType[] = [
    { label: "Khung Ảnh Nhựa Cao Cấp Bền Bỉ", value: "product1", url: "/san-pham/1" },
    { label: "Khung Ảnh 3D Chất Lượng Cao 4K Siêu Nét", value: "product2", url: "/san-pham/2" },
    // Thêm các sản phẩm khác ở đây...
];

export default function ProcessTab() {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [material, setMaterial] = useState<Option | null>(null);
    const [color, setColor] = useState<Option | null>(null);
    const [size, setSize] = useState<Option | null>(null);
    const [productType, setProductType] = useState<ProductType | null>(null);
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [distance, setDistance] = useState<number | null>(null);
    const [shippingCost, setShippingCost] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showQRCode, setShowQRCode] = useState(true);

    const basePrice = 200000;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const calculatePrice = () => {
        let totalPrice = basePrice;
        if (material) totalPrice += material.priceModifier;
        if (color) totalPrice += color.priceModifier;
        if (size) totalPrice += size.priceModifier;
        setPrice(totalPrice + shippingCost);
    };

    const handleOptionChange = (setter: React.Dispatch<React.SetStateAction<Option | null>>, option: Option) => {
        setter(option);
        calculatePrice();
    };

    const handleProductTypeChange = (value: string) => {
        const selectedType = productTypes.find((pt) => pt.value === value);
        if (selectedType) {
            setProductType(selectedType);
        }
    };

    const calculateDistance = async () => {
        const calculatedDistance = Math.random() * 20 + 5;
        setDistance(calculatedDistance);
        const calculatedShippingCost = calculatedDistance * 5000;
        setShippingCost(calculatedShippingCost);
        setPrice(price + calculatedShippingCost);
    };

    const handlePayment = () => {
        if (paymentMethod === "COD") {
            router.push("/tai-khoan");
        } else if (paymentMethod === "QR") {
            setShowQRCode(true);
            router.push("/tai-khoan");
        } else if (paymentMethod === "Momo") {
            const requestOptions: any = {
                method: "POST",
                redirect: "follow"
            };

            fetch("http://localhost:3003/payment", requestOptions)
                .then((response) => response.json())
                .then((result: any) => {
                    console.log(result?.payUrl);
                    router.push(result?.payUrl);
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Tạo đơn hàng</h2>

            {/* Tải lên file và xem trước */}
            <div className="mb-4">
                <label className="block font-semibold">Tải lên file của bạn</label>
                <input type="file" onChange={handleFileChange} className="mt-2" />
                {previewUrl && (
                    <div className="mt-4">
                        <p>Xem trước:</p>
                        <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover mt-2 border" />
                    </div>
                )}
            </div>

            {/* Tùy chọn sản phẩm */}
            <div className="grid grid-cols-3 gap-10">
                <div className="mb-4">
                    <label className="block font-semibold">Loại sản phẩm</label>
                    <select onChange={(e) => handleProductTypeChange(e.target.value)} className="mt-2">
                        <option value="">Chọn loại sản phẩm</option>
                        {productTypes.map((pt) => (
                            <option key={pt.value} value={pt.value}>{pt.label}</option>
                        ))}
                    </select>
                    {productType && (
                        <p className="mt-2 text-blue-500">
                            <a href={productType.url} target="_blank" rel="noopener noreferrer">Link sản phẩm</a>
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Chất liệu</label>
                    <select onChange={(e) => handleOptionChange(setMaterial, materials.find(m => m.value === e.target.value)!)} className="mt-2">
                        <option value="">Chọn chất liệu</option>
                        {materials.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Màu sắc</label>
                    <div className="flex gap-4 mt-2">
                        {colors.map((c) => (
                            <div
                                key={c.value}
                                onClick={() => handleOptionChange(setColor, c)}
                                className={`w-8 h-8 border rounded cursor-pointer ${color?.value === c.value ? 'border-blue-500' : 'border-gray-300'}`}
                                style={{ backgroundColor: c.value }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Kích thước</label>
                    <div className="flex gap-4 mt-2">
                        {sizes.map((s) => (
                            <button
                                key={s.value}
                                onClick={() => handleOptionChange(setSize, s)}
                                className={`px-4 py-2 border rounded ${size?.value === s.value ? 'border-blue-500' : 'border-gray-300'}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hiển thị giá */}
            <div className="mb-4">
                <p><strong>Tổng giá:</strong> {price.toLocaleString()} VND</p>
            </div>

            {/* Địa chỉ và tính tiền ship */}
            <div className="mb-4">
                <label className="block font-semibold">Địa chỉ của bạn</label>
                <input
                    type="text"
                    value={"332 Phan Van Tri, Bình Thạnh, HCM"}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                />
                <button onClick={calculateDistance} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Tính khoảng cách và phí vận chuyển
                </button>
                {distance && (
                    <p className="mt-2">
                        Khoảng cách: {distance.toFixed(2)} km - Phí vận chuyển: {shippingCost.toLocaleString()} VND
                    </p>
                )}
            </div>

            {/* Lựa chọn phương thức thanh toán */}
            <div className="mb-4">
                <label className="block font-semibold">Phương thức thanh toán</label>
                <div className="flex flex-col gap-2 mt-2">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Thanh toán khi nhận hàng (COD)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="QR"
                            checked={paymentMethod === "QR"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Thanh toán qua mã QR
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Momo"
                            checked={paymentMethod === "Momo"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Thanh toán qua Momo
                    </label>
                </div>
            </div>

            {/* Tổng tiền cuối cùng */}
            <div className="mt-6">
                <p className="text-2xl font-bold text-center">
                    Tổng số tiền: {(price + shippingCost).toLocaleString()} VND
                </p>
            </div>

            {/* Hiển thị mã QR khi chọn phương thức QR */}
            {showQRCode && paymentMethod === "QR" && (
                <div className="mt-6 text-center">
                    <p className="font-semibold">Quét mã QR để thanh toán:</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MSeP9-tHEBAiDsSyaqUdrCj6Nb3FrmCxOQ&s" alt="QR Code" className="w-40 h-40 mx-auto mt-2" />
                </div>
            )}

            <button onClick={handlePayment} className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full">
                Thanh toán
            </button>
        </div>
    );
}
