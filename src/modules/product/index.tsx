"use client";

import { useState } from "react";

const product = {
  id: 1,
  name: "Album Cán Màng Ruột Siêu Sắc Nét 4K",
  description: "Album Cán Màng Ruột Siêu Sắc Nét 4K",
  price: "129.000",
  rating: 5.0,
  status: "Đang bán",
  reviews: 345,
  colors: ["Đen", "Trắng", "Silver", "Gold"],
  material: ["Bìa Gói", "Bìa Kính", "Bìa Da"],
  images: [
    "https://res.cloudinary.com/farmcode/image/upload/v1728997182/iatt/IMG_7675_zqrn92.jpg",
    "https://res.cloudinary.com/farmcode/image/upload/v1728996916/iatt/IMG_7668_tevby4.jpg",
    "https://res.cloudinary.com/farmcode/image/upload/v1728996855/iatt/IMG_7669_mbjo7j.jpg",
    "https://res.cloudinary.com/farmcode/image/upload/v1728996259/iatt/IMG_7660_e9bgmw.jpg",
  ],
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full dark:hidden rounded"
                src={product.images[selectedImage]}
                alt=""
              />
              <img
                className="w-full hidden dark:block rounded"
                src={product.images[selectedImage]}
                alt=""
              />
              <div className="flex gap-2 mt-4 justify-center">
                <div className={`border-2 ${selectedImage === 0 ? "border-blue-500" : "border-gray-200"} rounded p-1 cursor-pointer`} onClick={() => setSelectedImage(0)}>
                  <img
                    className="w-20 rounded"
                    src={product.images[0]}
                    alt="Front view"
                  />
                </div>
                <div className={`border-2 ${selectedImage === 1 ? "border-blue-500" : "border-gray-200"} rounded p-1 cursor-pointer`} onClick={() => setSelectedImage(1)}>
                  <img
                    className="w-20 rounded"
                    src={product.images[1]}
                    alt="Back view"
                  />
                </div>
                <div className={`border-2 ${selectedImage === 2 ? "border-blue-500" : "border-gray-200"} rounded p-1 cursor-pointer`} onClick={() => setSelectedImage(2)}>
                  <img
                    className="w-20 rounded"
                    src={product.images[2]}
                    alt="Keyboard view"
                  />
                </div>
                <div className={`border-2 ${selectedImage === 3 ? "border-blue-500" : "border-gray-200"} rounded p-1 cursor-pointer`} onClick={() => setSelectedImage(3)}>
                  <img
                    className="w-20 rounded"
                    src={product.images[3]}
                    alt="Side view"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.name}
              </h1>
              <div className="mt-2">
                <span className="text-sm font-medium text-green-600">In stock</span>
              </div>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  {product.price} VNĐ
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</p>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {product.reviews} đánh giá
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Màu sắc</h3>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg border ${selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-200"
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Chất liệu</h3>
                <div className="flex gap-2 mt-2">
                  {product.material.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-3 py-1.5 rounded-lg border ${selectedMaterial === material
                        ? "border-blue-500"
                        : "border-gray-200"
                        }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Yêu thích
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-green-700 focus:outline-none bg-white rounded-lg border border-green-700 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Đặt hàng ngay
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mô tả sản phẩm</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}