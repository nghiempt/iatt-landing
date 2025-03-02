import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  selectedColor: string;
  selectedSize: string;
  className?: string;
}

const ImageUpload = ({
  onImageChange,
  selectedColor,
  selectedSize,
  className,
}: ImageUploadProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const sizeMap = {
    "15x21": { width: 150, height: 210 },
    "20x30": { width: 200, height: 300 },
    "40x20": { width: 400, height: 200 },
  };

  const getContainerStyle = () => {
    const size = sizeMap[selectedSize as keyof typeof sizeMap];
    if (!size) return {};

    const aspectRatio = size.width / size.height;
    return {
      aspectRatio: `${aspectRatio}`,
      width: "100%",
      // maxWidth: "600px",
      margin: "0 auto",
    };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  return (
    <div className={cn(" flex justify-center", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-64 mb-4"
          style={getContainerStyle()} >
          <div className="text-gray-500 flex flex-col items-center">
            <div className="flex flex-row justify-center items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Tải hình ảnh lên</span>
            </div>
            <span className="text-xs mt-1">hoặc kéo thả ảnh vào đây</span>
          </div>
        </div>
      ) : (
        <div className="relative group" style={getContainerStyle()}>
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-md",
              `border-8 ${selectedColor === "white"
                ? "border-gray-200"
                : selectedColor === "black"
                  ? "border-black"
                  : selectedColor === "gold"
                    ? "border-yellow-400"
                    : selectedColor === "silver"
                      ? "border-gray-200"
                      : selectedColor === "wood"
                        ? "border-yellow-950"
                        : "border-gray-200"
              }`
            )}
          >
            <div
              style={{
                paddingBottom: `${(sizeMap[selectedSize as keyof typeof sizeMap].height /
                  sizeMap[selectedSize as keyof typeof sizeMap].width) *
                  100
                  }%`,
              }}
            />
            <Image
              src={preview}
              alt="Preview"
              fill
              priority
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
