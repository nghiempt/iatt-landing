"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { API } from "@/utils/api";
import { ROUTES } from "@/utils/route";
import Cookies from "js-cookie";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

export function LoginModal() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (username === "" || password === "") {
      toast({
        variant: "destructive",
        title: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    if (username === "inanhtructuyen@gmail.com" && password === "Iatt@7777") {
      setTimeout(() => {
        // Cookies.set("isLogin", "true", { expires: 7 });
        window.location.href = ROUTES.HOME;
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Email hoặc mật khẩu chưa chính xác",
      });
    }
  };

  const handleSubmitWithGoogle = async (e: any) => {
    e.preventDefault();
    window.location.href = API.AUTH.LOGIN_WITH_GOOGLE;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center px-4 lg:px-8 py-2 text-md font-semibold text-white rounded-full bg-orange-700 lg:bg-white lg:text-orange-700 lg:border-orange-700 lg:border-2"
        >
          Đăng nhập
        </button>
      </DialogTrigger>
      <DialogContent
        className="w-full"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div>
          <div className="w-full">
            <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
              <div className="w-full bg-white dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-4">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Đăng nhập
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="flex flex-row justify-center items-center gap-2 w-full text-white bg-orange-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Đăng nhập
                      {isLoading && (
                        <Loader className="animate-spin" size={20} />
                      )}
                    </button>
                    <div
                      onClick={(e: any) => handleSubmitWithGoogle(e)}
                      className="cursor-pointer w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                    >
                      <Image
                        className="w-5 h-5"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        width={1000}
                        height={1000}
                        loading="lazy"
                        alt="google logo"
                      />
                      <span className="text-md font-medium">
                        Đăng nhập bằng Google
                      </span>
                    </div>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Bạn chưa có tài khoản?{" "}
                      <Link
                        href="#"
                        className="font-medium text-primary-600 hover:underline text-black"
                      >
                        Đăng ký
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
