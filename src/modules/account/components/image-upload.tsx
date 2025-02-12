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
    <div className={cn("w-full h-full flex justify-center", className)}>
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
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 lg:px-0 py-16 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
          style={getContainerStyle()}
        >
          <div className="flex flex-col items-center">
            <span>+ Tải hình lên</span>
            <span className="text-xs text-gray-500">
              hoặc kéo thả file vào đây
            </span>
          </div>
        </div>
      ) : (
        <div className="relative group" style={getContainerStyle()}>
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-md",
              `border-8 ${
                selectedColor === "white"
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
                paddingBottom: `${
                  (sizeMap[selectedSize as keyof typeof sizeMap].height /
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
