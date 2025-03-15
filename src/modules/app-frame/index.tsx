"use client";

import { Ban, ChevronLeft, RefreshCcw, Undo2 } from "lucide-react";
import React from "react";
import NavigationBar from "./components/navigation-bar";
import { useSearchParams } from "next/navigation";
import ImageUploadMobile from "./components/image-upload-mobile";
import { toast } from "@/hooks/use-toast";
import { UploadService } from "@/services/upload";
import { MobileService } from "@/services/mobile";
import { DATA } from "@/utils/data";
import Image from "next/image";
import ImageProcessing from "./components/image-processing";
import ImageComposer from "./components/compile-image";
import { IMAGES } from "@/utils/image";

export default function AppFrameClient() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("function");

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [removeBackground, setRemoveBackground] = React.useState(false);
  const [selectedBackground, setSelectedBackground] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    setUploadedFile(null);
    setCurrentImage(null);
    setLoading(false);
    setSelectedBackground(null);
  }, [tab]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      const originalUrl = URL.createObjectURL(file);
      setCurrentImage(originalUrl);
    }
  };

  const handleBackgroundSelect = (backgroundUrl: string | null) => {
    if (!removeBackground) {
      toast({
        title: "",
        description: "Vui lòng xóa phông nền trước khi chọn nền mới!",
        variant: "destructive",
      });
      return;
    }
    setSelectedBackground(backgroundUrl);
  };

  const validateForm = () => {
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const upload: any = await UploadService.uploadToCloudinary([
        uploadedFile,
      ]);

      let response;
      if (tab === null) {
        response = await MobileService.smoothSkin(upload[0].secure_url);
      } else if (tab === "cl") {
        response = await MobileService.increaseQuality(upload[0].secure_url);
      } else if (tab === "ai") {
        response = await MobileService.imageAI(upload[0].secure_url);
      } else if (tab === "xp") {
        response = await MobileService.removeBackground(upload[0].secure_url);
        setRemoveBackground(true);
      }

      if (response && response.data) {
        if (currentImage) {
          URL.revokeObjectURL(currentImage);
        }
        setCurrentImage(response.data);
      } else {
        toast({
          title: "",
          description: "Đã xảy ra lỗi khi xử lí ảnh, vui lòng thử lại!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "",
        description: "Đã xảy ra lỗi khi xử lí ảnh, vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      {/* PROCESSING  */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
          <div className="w-full h-screen bg-black bg-opacity-50 flex flex-col gap-10 justify-center items-center">
            <div className="bg-white px-7 py-8 rounded-lg flex flex-col items-center gap-6">
              <ImageProcessing />
              <div className="text-balck font-medium">
                Hình ảnh đang được xử lí...
              </div>
            </div>
          </div>
        </div>
      )}
      <Image
        src={IMAGES.BACKGROUND_MOBILE}
        alt=""
        fill
        priority
        objectFit="cover"
        className="opacity-50 h-screen w-full absolute top-0 left-0 z-0"
      />
      <div className="w-full h-screen flex flex-col z-10">
        <header className="w-full text-white pt-3 p-2 text-center">
          <div className="flex flex-row justify-between items-center">
            <div>
              <ChevronLeft color="black" />
            </div>
            <div className="flex flex-row justify-center items-center gap-3 ml-12">
              <Undo2 color="black" />
              <RefreshCcw
                color="black"
                onClick={() => {
                  handleRefresh();
                  setRefresh(!refresh);
                }}
              />
              <Undo2 color="black" className="scale-x-[-1] z-0" />
            </div>
            <div className="bg-[#645bff] text-white font-medium text-sm px-3 py-2 rounded-lg">
              Tiếp tục
            </div>
          </div>
        </header>
        {/* MIN DA  */}
        {!tab && (
          <main className="w-full h-screen flex flex-col justify-between p-4 overflow-auto">
            <ImageUploadMobile
              onImageChange={handleImageUpload}
              title={"Chọn hình ảnh bạn muốn tăng chất lượng"}
              newImage={currentImage ?? undefined}
            />
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-10 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Bắt đầu làm mịn"}
            </div>
          </main>
        )}
        {/* CHAT LUONG  */}
        {tab === "cl" && (
          <main className="w-full h-screen flex flex-col justify-between p-4 overflow-auto">
            <ImageUploadMobile
              onImageChange={handleImageUpload}
              title={"Chọn hình ảnh bạn muốn tăng chất lượng"}
              newImage={currentImage ?? undefined}
            />
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-10 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Tăng chất lượng"}
            </div>
          </main>
        )}
        {/* XOA PHONG  */}
        {tab === "xp" && (
          <main className="w-full h-screen flex flex-col justify-between p-4 overflow-auto">
            {removeBackground && (
              <ImageComposer
                foregroundImage={currentImage}
                backgroundImage={selectedBackground}
              />
            )}
            {!removeBackground && (
              <ImageUploadMobile
                onImageChange={handleImageUpload}
                title={"Chọn hình ảnh bạn muốn xóa phông"}
                newImage={currentImage ?? undefined}
              />
            )}
            <div className="flex flex-row gap-4 overflow-auto">
              <div
                className={`flex justify-center items-center w-14 h-full object-cover rounded-lg border-2 ${
                  selectedBackground === null
                    ? "border-[#645bff]"
                    : "border-white"
                } cursor-pointer`}
                onClick={() => handleBackgroundSelect(null)}
              >
                <Ban />
              </div>
              <div className="h-3/4 w-0.5 bg-gray-300 my-auto"></div>
              {DATA.BACKGROUND.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleBackgroundSelect(item.url)}
                >
                  <Image
                    src={item.url}
                    alt=""
                    width={1000}
                    height={1000}
                    className={`w-14 h-full object-cover rounded-lg border-2 ${
                      selectedBackground === item.url
                        ? "border-[#645bff]"
                        : "border-white"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-10 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Xóa phông"}
            </div>
          </main>
        )}
        {/* AI  */}
        {tab === "ai" && (
          <main className="w-full h-screen flex flex-col justify-between p-4 overflow-auto">
            <ImageUploadMobile
              onImageChange={handleImageUpload}
              title={"Chọn hình ảnh bạn muốn tạo với AI"}
              newImage={currentImage ?? undefined}
            />
            <div
              onClick={handleSubmit}
              className={`bg-[#645bff] rounded-lg py-3 text-center text-white mb-10 ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Đang xử lý..." : "Tạo ảnh AI"}
            </div>
          </main>
        )}
        <footer className="w-full text-white p-4 text-center">
          <NavigationBar action={tab} />
        </footer>
      </div>
    </div>
  );
}
