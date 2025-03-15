import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ChooseOptionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (size: string, pages: number) => void;
}

export function ChooseOption({ isOpen, setIsOpen, onSave }: ChooseOptionProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedPages, setSelectedPages] = useState<number>();

  const sizes = ["25x25", "30x20", "35x25"];
  const pageOptions = [10, 15, 20];

  const validateForm = () => {
    if (!selectedPages) {
      toast({
        title: "",
        description: "Vui lòng chọn kích thước cho Album!",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedSize) {
      toast({
        title: "",
        description: "Vui lòng chọn số trang cho Album!",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onSave(selectedSize, selectedPages!);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="max-w-[350px] rounded-lg"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Tùy chọn Album</DialogTitle>
          <DialogDescription>
            Tuỳ chọn kích thước và số trang cho Album của bạn
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="font-medium mb-2">Kích thước:</div>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 focus:outline-none`}
              >
                <span
                  className={`w-full relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md ${
                    selectedSize === size
                      ? "bg-transparent text-white"
                      : "bg-white text-gray-900 group-hover:bg-transparent group-hover:text-white"
                  }`}
                >
                  {size}
                </span>
              </button>
            ))}
          </div>
          <div className="font-medium mb-2">Tổng số trang:</div>
          <div className="grid grid-cols-3 gap-2">
            {pageOptions.map((pages: number, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedPages(pages)}
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300`}
              >
                <span
                  className={`w-full relative px-2 py-2.5 transition-all ease-in duration-75 rounded-md ${
                    selectedPages === pages
                      ? "bg-transparent text-white"
                      : "bg-white text-gray-900 group-hover:bg-transparent group-hover:text-white"
                  }`}
                >
                  {pages} trang
                </span>
              </button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-[#645bff] text-white hover:bg-[#4b47ff]"
            onClick={() => handleSave()}
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
