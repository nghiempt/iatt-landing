"use client"

import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight, Frame, Images } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import Image from 'next/image';
import ImageUploadAlbum from './image-upload-album';

export default function OrderAlbumCreate() {

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isPaper, setIsPaper] = React.useState(true);
  const [paperType, setPaperType] = React.useState(1);

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Tài khoản</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Tạo đơn hàng</Link>
        </nav>
        <div className="">
          <section className="bg-white antialiased">
            <form action="#" className="">
              <div className='w-full grid grid-cols-2 gap-4 justify-center items-center'>
                <Link href={"/tai-khoan?tab=order-single"} className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-br from-gray-400 to-gray-300 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden">
                  <Frame width={16} height={16} className='mr-2' />
                  Hình đơn
                </Link>
                <Link href={"/tai-khoan?tab=order-album"} className="text-white font-semibold py-2 rounded-md flex justify-center items-center bg-gradient-to-r from-pink-500 to-orange-400 after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden">
                  <Images width={16} height={16} className='mr-2' />
                  Album
                </Link>
              </div>
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="min-w-0 flex-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tạo đơn hàng</h2>
                    <div className='flex flex-col justify-center items-start'>
                      <span>Mã đơn hàng: <strong>FWB12546800</strong></span>
                      <span>Kích thước: <strong>Vuông 25x25</strong></span>
                      <span>Tổng số trang: <strong>10</strong></span>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-4'>
                      <div className='w-full grid grid-cols-2 justify-center items-center gap-4'>
                        <div onClick={() => { setPaperType(1); setIsPaper(true) }} className={`${paperType === 1 ? 'border-orange-600 text-orange-600 font-bold bg-orange-50' : ''} border rounded-md py-4 flex justify-center items-center`}>Bìa gói</div>
                        <div onClick={() => { setPaperType(2); setIsPaper(false) }} className={`${paperType === 2 ? 'border-orange-600 text-orange-600 font-bold bg-orange-50' : ''} border rounded-md py-4 flex justify-center items-center`}>Bìa da</div>
                      </div>
                      {
                        isPaper && (
                          <div className="w-full">
                            <ImageUploadAlbum
                              onImageChange={setUploadedFile}
                            />
                          </div>
                        )
                      }
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>Ruột cán màng</option>
                        <option>Ruột không cán màng</option>
                        <option>Ruột tráng gương</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Thông tin cá nhân</h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Tên*</label>
                        <input type="text" value="Phạm Thanh Nghiêm" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Địa chỉ*</label>
                        <input type="email" value="332/8 Phan Văn Trị, P11, Bình Thạnh, HCM" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Số điện thoại* </label>
                        <input type="text" value="0911558539" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thanh toán</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/128/10499/10499979.png"
                                alt="money"
                                width={20}
                                height={20}
                                priority
                              />
                              Tiền mặt (COD)
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Thanh toán khi nhận hàng</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png"
                                alt="money"
                                width={20}
                                height={20}
                                priority
                              />
                              Ngân hàng
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Quét QR để thanh toán</p>
                          </div>
                        </div>
                        <div className='w-full flex justify-center items-center gap-4 mt-4'>
                          <Image
                            src="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                            alt="QR code"
                            width={100}
                            height={100}
                            priority
                          />
                          <div className='flex flex-col gap-1'>
                            <strong>NGUYEN VAN A</strong>
                            <span>ABC BANK</span>
                            <span>11223344556677</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                          </div>
                          <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-900 dark:text-white flex justify-start items-center gap-2">
                              <Image
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                                alt="money"
                                width={18}
                                height={18}
                                priority
                              />
                              Momo
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Thanh toán qua app Momo</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                  <div className="flow-root">
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Giá sản phẩm</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">129.000 VND</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Khuyến mãi</dt>
                        <dd className="text-base font-medium text-green-500">0 VND</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Thuế VAT</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">0 VND</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Vận chuyển</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">0 VND</dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4 py-3">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">129.000 VND</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button type="submit" className="flex w-full font-bold items-center justify-center rounded-lg bg-[rgb(var(--quaternary-rgb))] border border-[rgb(var(--primary-rgb))] px-5 py-4 text-sm text-[rgb(var(--primary-rgb))] focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ĐẶT HÀNG NGAY</button>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Bạn đã chấp nhận các điều khoản và chính sách của chúng tôi. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Chính sách bảo mật</a></p>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}