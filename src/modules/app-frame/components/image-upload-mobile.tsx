import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  title?: string;
  newImage?: string;
  className?: string;
}

const ImageUploadMobile = ({
  onImageChange,
  newImage,
  title,
  className,
}: ImageUploadProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast({
        title: "",
        description: "File ảnh quá lớn, vui lòng chọn file dưới 1MB",
        variant: "destructive",
      });
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast({
        title: "",
        description: "Vui lòng chọn file hình ảnh",
        variant: "destructive",
      });
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

  return (
    <div
      className={cn(
        "flex justify-center lg:!justify-start lg:items-start",
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
      {!preview ? (
        <div className="flex justify-center !w-full">
          <div
            onClick={handleClick}
            className="cursor-pointer border-2 border-dashed border-gray-600 p-4 flex flex-col items-center justify-center !w-full lg:!w-80 h-[500px] mb-0 rounded-lg"
          >
            <div className="text-gray-700 flex flex-col items-center">
              <div className="flex flex-row justify-center items-center gap-2">
                <Upload size={20} />
                <span>Tải hình ảnh lên</span>
              </div>
              <span className="text-xs mt-1">{title}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group w-full h-full">
          <div className={cn("relative w-full overflow-hidden rounded-xl")}>
            <div className="relative !w-full !h-[500px]" />
            {newImage ? (
              <Image
                src={newImage}
                alt="Preview"
                width={1000}
                height={1000}
                priority
                className="absolute top-0 left-0 !w-full !h-full object-cover border-2 border-[#645bff] rounded-xl"
              />
            ) : (
              <Image
                src={preview}
                alt="Preview"
                width={1000}
                height={1000}
                priority
                className="absolute top-0 left-0 !w-full !h-full object-cover border-2 border-[#645bff] rounded-xl"
              />
            )}
          </div>
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

export default ImageUploadMobile;
