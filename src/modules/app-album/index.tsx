"use client";

import React, { useState } from "react";
import { ChooseOption } from "./dialog/choose-option";
import ImageUploadMobileAlbum from "./components/image-upload-mobile-album";
import { UploadService } from "@/services/upload";
import ImageProcessing from "../app-frame/components/image-processing";

export default function AppAlbumClient() {
  const [isOpen, setIsOpen] = useState(true);
  const [albumConfig, setAlbumConfig] = useState({
    size: "",
    pages: 0,
  });

  const [pageImages, setPageImages] = useState<{ [key: number]: string[] }>({});
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [currentImages, setCurrentImages] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MIN_IMAGES = 2;
  const MAX_IMAGES = 4;

  const handleSaveConfig = (size: string, pages: number) => {
    setAlbumConfig({ size, pages });
  };

  const validateFiles = (files: File[]): boolean => {
    if (files.length < MIN_IMAGES || files.length > MAX_IMAGES) {
      setError(`Please upload between ${MIN_IMAGES} and ${MAX_IMAGES} images`);
      return false;
    }

    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setError("All images must be less than 5MB");
      return false;
    }

    return true;
  };

  // const handleImageUpload = async (
  //   pageIndex: number,
  //   files: FileList | null
  // ) => {
  //   if (!files) return;

  //   const fileArray = Array.from(files);
  //   if (!validateFiles(fileArray)) return;

  //   try {
  //     const uploadResults = await UploadService.uploadToCloudinary(fileArray);

  //     if (uploadResults === false) {
  //       throw new Error("Upload failed");
  //     }

  //     const secureUrls = uploadResults.map((result: any) => result.secure_url);

  //     setPageImages((prev) => ({
  //       ...prev,
  //       [pageIndex]: secureUrls,
  //     }));

  //     setError(null);
  //   } catch (error) {
  //     setError("Failed to upload images to Cloudinary");
  //     console.error(error);
  //   }
  // };

  const handleImageUpload = async (
    pageIndex: number,
    files: FileList | null,
    removedIndex?: number
  ) => {
    if (files) {
      const fileArray = Array.from(files);
      if (!validateFiles(fileArray)) return;

      try {
        setLoading(true);

        const uploadResults = await UploadService.uploadToCloudinary(fileArray);

        if (uploadResults === false) {
          throw new Error("Upload failed");
        }

        const secureUrls = uploadResults.map(
          (result: any) => result.secure_url
        );

        setPageImages((prev) => ({
          ...prev,
          [pageIndex]: secureUrls,
        }));

        setLoading(false);

        setError(null);
      } catch (error) {
        setError("Failed to upload images to Cloudinary");
        console.error(error);
      }
    } else if (removedIndex !== undefined) {
      // Handle image removal
      setPageImages((prev) => {
        const currentImages = prev[pageIndex] || [];
        const updatedImages = currentImages.filter(
          (_, index) => index !== removedIndex
        );
        return {
          ...prev,
          [pageIndex]: updatedImages,
        };
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ChooseOption
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSave={handleSaveConfig}
      />
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
      <div className="w-full h-full flex flex-col">
        <header className="w-full bg-blue-500 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Action</h1>
        </header>
        <main className="w-full flex-grow bg-gray-100 p-4 overflow-auto flex flex-col gap-4">
          {albumConfig.pages > 0 &&
            Array.from({ length: albumConfig.pages }).map((_, index) => (
              <div key={index}>
                <div className="mb-2">Trang {index + 1}</div>
                <div className="w-full flex justify-center items-center">
                  <ImageUploadMobileAlbum
                    onImageChange={(files, removedIndex) =>
                      handleImageUpload(index, files, removedIndex)
                    }
                    albumSize={albumConfig.size}
                    newImages={pageImages[index] || []}
                    pageIndex={index}
                  />
                </div>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
