import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { PenLine, Upload } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (files: FileList | null) => void;
  albumSize?: string;
  newImage?: string[];
  className?: string;
}

const ImageUploadMobileAlbum = ({
  onImageChange,
  albumSize,
  newImage,
  className,
}: ImageUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_IMAGES = 2;
  const MAX_IMAGES = 4;

  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Validate number of images
    if (fileArray.length < MIN_IMAGES || fileArray.length > MAX_IMAGES) {
      toast({
        title: "",
        description: `Vui lòng chọn từ ${MIN_IMAGES} đến ${MAX_IMAGES} hình ảnh`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size and type
    for (const file of fileArray) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "",
          description: "Mỗi file ảnh phải dưới 5MB",
          variant: "destructive",
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast({
          title: "",
          description: "Vui lòng chỉ chọn file hình ảnh",
          variant: "destructive",
        });
        return;
      }
    }

    onImageChange(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "flex justify-center lg:!justify-start lg:items-start !w-full",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {preview ? (
        <div className="flex justify-center !w-full">
          <div
            onClick={handleClick}
            className={`cursor-pointer border-2 border-dashed border-gray-600 p-4 flex flex-col items-center justify-center !w-full ${
              albumSize === "25x25"
                ? "h-[300px]"
                : albumSize === "30x20"
                ? "h-[200px]"
                : albumSize === "35x25"
                ? "h-[250px]"
                : ""
            }  mb-0 rounded-lg`}
          >
            <div className="text-gray-700 flex flex-col items-center">
              <div className="flex flex-row justify-center items-center gap-2">
                <Upload size={20} />
                <span>Tải hình ảnh lên Album</span>
              </div>
              <span className="text-xs mt-1">
                Tối thiểu 2 hình, tối đa 4 hình
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group w-full h-full">
          {/* 2 HINH  */}
          <div className="absolute -top-3 -right-2 bg-white p-2 rounded-full z-20">
            <PenLine className="w-4 h-4 text-black " />
          </div>
          <div className={cn("relative w-full overflow-hidden rounded-lg")}>
            <div className="relative w-full">
              <div
                className={`border-2 border-gray-300 grid grid-cols-2 px-5 gap-5 !w-full rounded-lg ${
                  albumSize === "25x25"
                    ? "h-[300px]"
                    : albumSize === "30x20"
                    ? "h-[200px]"
                    : albumSize === "35x25"
                    ? "h-[250px]"
                    : ""
                }`}
              >
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[87%] bg-red-500 rounded-lg"></div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[87%] bg-green-500 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 HINH  */}
          {/*  <div className="absolute -top-3 -right-2 bg-white p-2 rounded-full z-20">
            <PenLine className="w-4 h-4 text-black " />
          </div>
          <div className={cn("relative w-full overflow-hidden rounded-lg")}>
            <div
              className={`border-2 border-gray-300 relative grid grid-cols-2 px-5 gap-5 !w-full rounded-lg  ${
                albumSize === "25x25"
                  ? "h-[300px]"
                  : albumSize === "30x20"
                  ? "h-[200px]"
                  : albumSize === "35x25"
                  ? "h-[250px]"
                  : ""
              }`}
            >
              <div className="w-full flex justify-center items-center">
                <div className="w-[100%] h-[87%] bg-red-500 rounded-lg"></div>
              </div>
              <div className="grid grid-rows-2 py-5 gap-5">
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-green-500 rounded-lg"></div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-green-500 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div> */}

          {/* 4 HINH  */}
          {/*  <div className="absolute -top-3 -right-2 bg-white p-2 rounded-full z-20">
            <PenLine className="w-4 h-4 text-black " />
          </div>
          <div className={cn("relative w-full overflow-hidden rounded-lg")}>
            <div
              className={`border-2 border-gray-300 relative grid grid-cols-2 px-5 gap-5 !w-full rounded-lg  ${
                albumSize === "25x25"
                  ? "h-[300px]"
                  : albumSize === "30x20"
                  ? "h-[200px]"
                  : albumSize === "35x25"
                  ? "h-[250px]"
                  : ""
              }`}
            >
              <div className="grid grid-rows-2 py-5 gap-5">
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-red-500 rounded-lg"></div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-blue-500 rounded-lg"></div>
                </div>
              </div>
              <div className="grid grid-rows-2 py-5 gap-5">
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-green-500 rounded-lg"></div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-[100%] h-[100%] bg-yellow-500 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div
            onClick={handleClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-3 mt-5 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Thay đổi hình ảnh</span>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ImageUploadMobileAlbum;
