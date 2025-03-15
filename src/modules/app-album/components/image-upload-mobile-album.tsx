import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { PenLine, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  // onImageChange: (files: FileList | null) => void;
  onImageChange: (files: FileList | null, removedIndex?: number) => void;
  albumSize?: string;
  newImages?: string[];
  className?: string;
  pageIndex?: number;
}

const ImageUploadMobileAlbum = ({
  onImageChange,
  albumSize,
  newImages = [],
  className,
  pageIndex,
}: ImageUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_IMAGES = 2;
  const MAX_IMAGES = 4;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (fileArray.length < MIN_IMAGES || fileArray.length > MAX_IMAGES) {
      toast({
        title: "",
        description: `Vui lòng chọn từ ${MIN_IMAGES} đến ${MAX_IMAGES} hình ảnh`,
        variant: "destructive",
      });
      return;
    }

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

  const handleRemoveImage = (indexToRemove: number) => {
    if (newImages.length <= MIN_IMAGES) {
      toast({
        title: "",
        description: `Không thể xóa ảnh. Cần tối thiểu ${MIN_IMAGES} ảnh`,
        variant: "destructive",
      });
      return;
    }

    // Notify parent component of removal
    onImageChange(null, indexToRemove);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // const renderImageGrid = () => {
  //   if (newImages.length === 0) {
  //     return (
  //       <div
  //         className={`border-2 border-gray-300 grid grid-cols-2 px-5 gap-5 !w-full rounded-lg ${
  //           albumSize === "25x25"
  //             ? "h-[300px]"
  //             : albumSize === "30x20"
  //             ? "h-[200px]"
  //             : albumSize === "35x25"
  //             ? "h-[250px]"
  //             : ""
  //         }`}
  //       >
  //         <div className="w-full flex justify-center items-center">
  //           <div className="w-[100%] h-[87%] bg-gray-200 rounded-lg"></div>
  //         </div>
  //         <div className="w-full flex justify-center items-center">
  //           <div className="w-[100%] h-[87%] bg-gray-200 rounded-lg"></div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   switch (newImages.length) {
  //     case 2:
  //       return (
  //         <div
  //           className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
  //             albumSize === "25x25"
  //               ? "h-[300px]"
  //               : albumSize === "30x20"
  //               ? "h-[200px]"
  //               : albumSize === "35x25"
  //               ? "h-[250px]"
  //               : ""
  //           }`}
  //         >
  //           {newImages.map((img, index) => (
  //             <div
  //               key={index}
  //               className="w-full flex justify-center items-center"
  //             >
  //               <Image
  //                 src={img}
  //                 alt={`Image ${index + 1}`}
  //                 width={1000}
  //                 height={1000}
  //                 className={`w-[100%] ${
  //                   albumSize === "25x25"
  //                     ? "h-[270px]"
  //                     : albumSize === "30x20"
  //                     ? "h-[170px]"
  //                     : albumSize === "35x25"
  //                     ? "h-[220px]"
  //                     : ""
  //                 } object-cover rounded-lg`}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     case 3:
  //       return (
  //         <div
  //           className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
  //             albumSize === "25x25"
  //               ? "h-[300px]"
  //               : albumSize === "30x20"
  //               ? "h-[200px]"
  //               : albumSize === "35x25"
  //               ? "h-[250px]"
  //               : ""
  //           }`}
  //         >
  //           <div className="w-full flex justify-center items-center">
  //             <Image
  //               src={newImages[0]}
  //               alt="Image 1"
  //               width={1000}
  //               height={1000}
  //               className={`w-[100%] ${
  //                 albumSize === "25x25"
  //                   ? "h-[270px]"
  //                   : albumSize === "30x20"
  //                   ? "h-[170px]"
  //                   : albumSize === "35x25"
  //                   ? "h-[220px]"
  //                   : ""
  //               } object-cover rounded-lg`}
  //             />
  //           </div>
  //           <div className="grid grid-rows-2 gap-2">
  //             {newImages.slice(1).map((img, index) => (
  //               <div
  //                 key={index}
  //                 className="w-full flex justify-center items-center"
  //               >
  //                 <Image
  //                   src={img}
  //                   alt={`Image ${index + 2}`}
  //                   width={1000}
  //                   height={1000}
  //                   className={`w-[100%] ${
  //                     albumSize === "25x25"
  //                       ? "h-[130px]"
  //                       : albumSize === "30x20"
  //                       ? "h-[80px]"
  //                       : albumSize === "35x25"
  //                       ? "h-[105px]"
  //                       : ""
  //                   } object-cover rounded-lg`}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       );
  //     case 4:
  //       return (
  //         <div
  //           className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
  //             albumSize === "25x25"
  //               ? "h-[300px]"
  //               : albumSize === "30x20"
  //               ? "h-[200px]"
  //               : albumSize === "35x25"
  //               ? "h-[250px]"
  //               : ""
  //           }`}
  //         >
  //           {newImages.map((img, index) => (
  //             <div
  //               key={index}
  //               className="w-full flex justify-center items-center"
  //             >
  //               <Image
  //                 src={img}
  //                 alt={`Image ${index + 1}`}
  //                 width={1000}
  //                 height={1000}
  //                 className={`w-[100%] ${
  //                   albumSize === "25x25"
  //                     ? "h-[130px]"
  //                     : albumSize === "30x20"
  //                     ? "h-[80px]"
  //                     : albumSize === "35x25"
  //                     ? "h-[105px]"
  //                     : ""
  //                 } object-cover rounded-lg`}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const renderImageGrid = () => {
    if (newImages.length === 0) {
      return (
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
            <div className="w-[100%] h-[87%] bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-[100%] h-[87%] bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      );
    }

    switch (newImages.length) {
      case 2:
        return (
          <div
            className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
              albumSize === "25x25"
                ? "h-[300px]"
                : albumSize === "30x20"
                ? "h-[200px]"
                : albumSize === "35x25"
                ? "h-[250px]"
                : ""
            }`}
          >
            {newImages.map((img, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
              >
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className={`w-[100%] ${
                    albumSize === "25x25"
                      ? "h-[270px]"
                      : albumSize === "30x20"
                      ? "h-[170px]"
                      : albumSize === "35x25"
                      ? "h-[220px]"
                      : ""
                  } object-cover rounded-lg`}
                />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div
            className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
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
              <Image
                src={newImages[0]}
                alt="Image 1"
                width={1000}
                height={1000}
                className={`w-[100%] ${
                  albumSize === "25x25"
                    ? "h-[270px]"
                    : albumSize === "30x20"
                    ? "h-[170px]"
                    : albumSize === "35x25"
                    ? "h-[220px]"
                    : ""
                } object-cover rounded-lg`}
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              {newImages.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="w-full flex justify-center items-center"
                >
                  <Image
                    src={img}
                    alt={`Image ${index + 2}`}
                    width={1000}
                    height={1000}
                    className={`w-[100%] ${
                      albumSize === "25x25"
                        ? "h-[130px]"
                        : albumSize === "30x20"
                        ? "h-[80px]"
                        : albumSize === "35x25"
                        ? "h-[105px]"
                        : ""
                    } object-cover rounded-lg`}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div
            className={`border-2 border-gray-300 grid grid-cols-2 p-3 gap-2 !w-full rounded-lg ${
              albumSize === "25x25"
                ? "h-[300px]"
                : albumSize === "30x20"
                ? "h-[200px]"
                : albumSize === "35x25"
                ? "h-[250px]"
                : ""
            }`}
          >
            {newImages.map((img, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
              >
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className={`w-[100%] ${
                    albumSize === "25x25"
                      ? "h-[130px]"
                      : albumSize === "30x20"
                      ? "h-[80px]"
                      : albumSize === "35x25"
                      ? "h-[105px]"
                      : ""
                  } object-cover rounded-lg`}
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
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
        multiple
        className="hidden"
      />
      <div className="relative group w-full h-full">
        <Dialog>
          <DialogTrigger asChild>
            <div className="absolute -top-3 -right-3 bg-white p-2 rounded-full z-20">
              <PenLine className="w-4 h-4 text-black cursor-pointer" />
            </div>
          </DialogTrigger>
          <DialogContent
            className="max-w-[350px] max-h-[90vh] rounded-lg flex flex-col"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>
                <span className="!text-[20px]">
                  Trang Album {pageIndex !== undefined ? pageIndex + 1 : ""}
                </span>
              </DialogTitle>
              <DialogDescription>
                <span className="!text-[16px]">
                  Danh sách hình ảnh trên trang album số{" "}
                  {pageIndex !== undefined ? pageIndex + 1 : ""}.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pt-3 px-3">
              <div className="w-full space-y-4">
                {newImages.length > 0 ? (
                  newImages.map((img, index) => (
                    <div key={index} className="relative w-full h-[200px]">
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Chưa có hình ảnh nào được tải lên cho trang này
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="px-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="!px-10 !text-[16px] mt-3"
                >
                  Huỷ
                </Button>
              </DialogClose>
              <button
                type="submit"
                onClick={() => handleClick()}
                className="flex flex-row justify-center items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-md text-sm !px-10 !text-[16px] py-2.5 text-center"
              >
                Thêm/Sửa ảnh
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className={cn("relative w-full overflow-hidden rounded-lg")}>
          {renderImageGrid()}
        </div>
        <div
          onClick={handleClick}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-3 mt-5 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-2">
              <Upload size={20} />
              <span>Tải hình ảnh lên Album</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              Tối thiểu 2 hình, tối đa 4 hình (mỗi hình dưới 5MB)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadMobileAlbum;
