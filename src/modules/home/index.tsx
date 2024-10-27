"use client"

import { Header } from "@/layout/header"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { other_services, products } from "@/utils/constant"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/layout/footer";

interface Product {
  row: number;
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
}

interface Service {
  image: string;
  title: string;
}

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Header />
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-5/6 justify-center">
            <div className="flex flex-row gap-4 justify-between my-3">
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">IN ẢNH PLASTIC</a>
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">ẢNH ĐỂ BÀN</a>
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">ẢNH TREO TƯỜNG</a>
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">PHOTO BOOK</a>
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">BÌA ALBUM</a>
              <a href="/" className="text-[#6B1346] font-normal text-md p-2 border-b-2 border-white hover:border-[#6B1346]">EVENT</a>
            </div>
            <div className="flex justify-center w-full relative">
              <Carousel className="w-full h-[400px]">
                <CarouselContent className="flex min-h-full">
                  <CarouselItem className="flex-shrink-0 w-full h-full">
                    <div
                      className="w-full min-h-[400px] h-full bg-cover bg-center"
                      style={{ backgroundImage: "url(/banner_01.webp)" }}
                    ></div>
                  </CarouselItem>
                  <CarouselItem className="flex-shrink-0 w-full h-full">
                    <div
                      className="w-full min-h-[400px] h-full bg-cover bg-center"
                      style={{ backgroundImage: "url(/banner_02.jpg)" }}
                    ></div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="absolute w-full flex gap-[2px] bottom-0 text-white">
                <div className="bg-black opacity-50 p-1 w-full text-center">
                  IN ẢNH PHONG CÁCH
                </div>
                <div className="bg-black opacity-50 p-1 w-full text-center">
                  IN PHOTOBOOK
                </div>
              </div>
            </div>
            <div className="mb-10 py-16 px-10 bg-[#FBBF39] w-full flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center text-center mb-6 gap-1">
                <span className="text-xl text-[#6B1346] font-light">CHUỖI CỬA HÀNG IN ẢNH VIỆT NAM</span>
                <span className="text-2xl text-[#6B1346] font-semibold">IN ẢNH ONLINE - THIẾT KẾ ONLINE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="flex flex-col justify-center items-center gap-1 text-[#6B1346]">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-check"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>                  </div>
                  <div className="w-full text-center">
                    <div className="text-md font-semibold">
                      3 ngày hoàn thành
                    </div>
                    <div className="text-sm font-light">
                      Sản phẩm sẽ được in nhanh nhất
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 text-[#6B1346]">
                  <div>
                    <svg height="92px" width="92px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path className="st0" d="M311.069,130.515c-0.963-5.641-5.851-9.768-11.578-9.768H35.43c-7.61,0-13.772,6.169-13.772,13.765 c0,7.61,6.162,13.772,13.772,13.772h64.263c7.61,0,13.772,6.17,13.772,13.773c0,7.603-6.162,13.772-13.772,13.772H13.772 C6.169,175.829,0,181.998,0,189.601c0,7.603,6.169,13.764,13.772,13.764h117.114c6.72,0,12.172,5.46,12.172,12.18 c0,6.72-5.452,12.172-12.172,12.172H68.665c-7.61,0-13.772,6.17-13.772,13.773c0,7.602,6.162,13.772,13.772,13.772h45.857 c6.726,0,12.179,5.452,12.179,12.172c0,6.719-5.453,12.172-12.179,12.172H51.215c-7.61,0-13.772,6.169-13.772,13.772 c0,7.603,6.162,13.772,13.772,13.772h87.014l5.488,31.042h31.52c-1.854,4.504-2.911,9.421-2.911,14.598 c0,21.245,17.218,38.464,38.464,38.464c21.237,0,38.456-17.219,38.456-38.464c0-5.177-1.057-10.094-2.911-14.598h100.04 L311.069,130.515z M227.342,352.789c0,9.146-7.407,16.553-16.553,16.553c-9.152,0-16.56-7.407-16.56-16.553 c0-6.364,3.627-11.824,8.892-14.598h15.329C223.714,340.965,227.342,346.424,227.342,352.789z"></path> <path className="st0" d="M511.598,314.072l-15.799-77.941l-57.689-88.759H333.074l32.534,190.819h38.42 c-1.846,4.504-2.904,9.421-2.904,14.598c0,21.245,17.219,38.464,38.456,38.464c21.246,0,38.464-17.219,38.464-38.464 c0-5.177-1.057-10.094-2.91-14.598h16.741c6.039,0,11.759-2.708,15.582-7.386C511.273,326.136,512.8,319.988,511.598,314.072z M392.529,182.882h26.314l34.162,52.547h-51.512L392.529,182.882z M456.14,352.789c0,9.146-7.407,16.553-16.56,16.553 c-9.138,0-16.552-7.407-16.552-16.553c0-6.364,3.635-11.824,8.892-14.598h15.329C452.513,340.965,456.14,346.424,456.14,352.789z"></path> </g> </g></svg>                  </div>
                  <div className="w-full text-center">
                    <div className="text-md font-semibold">
                      In Ảnh Online quá dễ dàng
                    </div>
                    <div className="text-sm font-light">
                      với công cụ chỉnh sửa chuyên nghiệp
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 text-[#6B1346]">
                  <div>
                    <svg fill="#ffffff" width="93px" height="93px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="6.144"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="_x32_3_x2C__art_x2C__graphic_x2C__pc_x2C__ui_ux_x2C__visual"> <g id="XMLID_858_"> <g id="XMLID_871_"> <g id="XMLID_22_"> <path d="M456.333,425.571H55.667C36.551,425.571,21,410.02,21,390.904v-30.333c0-2.762,2.239-5,5-5h460 c2.762,0,5,2.238,5,5v30.333C491,410.02,475.448,425.571,456.333,425.571z M31,365.571v25.333 c0,13.602,11.065,24.667,24.667,24.667h400.667c13.602,0,24.667-11.065,24.667-24.667v-25.333H31z" id="XMLID_368_"></path> </g> <g id="XMLID_21_"> <path d="M486,365.571H26c-2.761,0-5-2.238-5-5v-223.5c0-22.883,18.617-41.5,41.5-41.5h174.002 c2.761,0,5,2.239,5,5s-2.239,5-5,5H62.5c-17.369,0-31.5,14.131-31.5,31.5v218.5h450v-218.5c0-17.369-14.131-31.5-31.5-31.5 H335.497c-2.762,0-5-2.239-5-5s2.238-5,5-5H449.5c22.883,0,41.5,18.617,41.5,41.5v223.5 C491,363.333,488.762,365.571,486,365.571z" id="XMLID_367_"></path> </g> <g id="XMLID_20_"> <path d="M177.508,214.063c-1.307,0-2.584-0.513-3.536-1.464c-1.301-1.301-1.782-3.21-1.253-4.972l21.213-70.71 c0.238-0.793,0.668-1.514,1.253-2.099L311.858,18.145c7.555-7.555,17.6-11.716,28.283-11.716 c10.685,0,20.729,4.161,28.284,11.716c7.556,7.555,11.717,17.6,11.717,28.284c0,10.685-4.161,20.729-11.717,28.285 L251.754,191.386c-0.585,0.585-1.306,1.016-2.099,1.253l-70.71,21.213C178.472,213.995,177.988,214.063,177.508,214.063z M203.147,140.997l-18.182,60.609l60.609-18.183L361.355,67.642c5.666-5.667,8.787-13.2,8.787-21.213 c0-8.013-3.121-15.547-8.787-21.213c-5.666-5.667-13.2-8.787-21.214-8.787c-8.013,0-15.547,3.121-21.213,8.787L203.147,140.997z " id="XMLID_364_"></path> </g> <g id="XMLID_19_"> <path d="M216.398,167.913c-5.762,0-11.523-2.193-15.91-6.579c-8.772-8.773-8.772-23.047,0-31.82 c1.952-1.952,5.118-1.952,7.071,0c1.953,1.953,1.953,5.118,0,7.071c-4.874,4.874-4.874,12.804,0,17.678s12.804,4.874,17.678,0 c1.954-1.952,5.119-1.951,7.071,0c1.953,1.953,1.953,5.119,0,7.071C227.922,165.72,222.16,167.913,216.398,167.913z" id="XMLID_363_"></path> </g> <g id="XMLID_18_"> <path d="M241.147,192.673c-6.01,0-11.66-2.341-15.91-6.59s-6.59-9.9-6.59-15.91c0-6.01,2.341-11.661,6.59-15.91 l62.228-62.227c1.951-1.952,5.119-1.952,7.07,0c1.953,1.953,1.953,5.119,0,7.071l-62.227,62.227 c-2.361,2.361-3.662,5.5-3.662,8.839c0,3.338,1.3,6.478,3.662,8.838c2.361,2.361,5.5,3.662,8.838,3.662 c3.339,0,6.478-1.3,8.839-3.662c1.952-1.952,5.119-1.952,7.071,0c1.953,1.953,1.953,5.118,0.001,7.071 C252.808,190.332,247.157,192.673,241.147,192.673z" id="XMLID_362_"></path> </g> <g id="XMLID_17_"> <path d="M350.749,90.32c-1.279,0-2.56-0.488-3.535-1.464l-49.498-49.498c-1.953-1.953-1.953-5.119,0-7.071 c1.951-1.952,5.119-1.952,7.07,0l49.498,49.498c1.953,1.953,1.953,5.119,0,7.071C353.309,89.832,352.028,90.32,350.749,90.32z" id="XMLID_361_"></path> </g> <g id="XMLID_16_"> <path d="M366,315.571h-80c-16.542,0-30-13.458-30-30s13.458-30,30-30h110c11.028,0,20-8.972,20-20v-1.508 c0-11.028-8.972-20-20-20H177.508c-2.761,0-5-2.239-5-5s2.239-5,5-5H396c16.542,0,30,13.458,30,30v1.508 c0,16.542-13.458,30-30,30H286c-11.028,0-20,8.972-20,20s8.972,20,20,20h80c2.762,0,5,2.238,5,5S368.762,315.571,366,315.571z" id="XMLID_360_"></path> </g> <g id="XMLID_15_"> <path d="M176,320.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5 S178.761,320.571,176,320.571z" id="XMLID_359_"></path> </g> <g id="XMLID_14_"> <path d="M176,290.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5 S178.761,290.571,176,290.571z" id="XMLID_358_"></path> </g> <g id="XMLID_13_"> <path d="M176,260.571H26c-2.761,0-5-2.238-5-5c0-2.761,2.239-5,5-5h150c2.761,0,5,2.239,5,5 C181,258.333,178.761,260.571,176,260.571z" id="XMLID_357_"></path> </g> </g> <g id="XMLID_12_"> <path d="M311,485.571H201c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h110c2.762,0,5,2.238,5,5v60 C316,483.333,313.762,485.571,311,485.571z M206,475.571h100v-50H206V475.571z" id="XMLID_315_"></path> </g> <g id="XMLID_11_"> <path d="M286,485.571h-60c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h60c2.762,0,5,2.238,5,5v60 C291,483.333,288.762,485.571,286,485.571z M231,475.571h50v-50h-50V475.571z" id="XMLID_312_"></path> </g> <g id="XMLID_10_"> <path d="M326,505.571H186c-8.271,0-15-6.729-15-15s6.729-15,15-15h140c8.271,0,15,6.729,15,15 S334.271,505.571,326,505.571z M186,485.571c-2.757,0-5,2.243-5,5s2.243,5,5,5h140c2.757,0,5-2.243,5-5s-2.243-5-5-5H186z" id="XMLID_309_"></path> </g> </g> </g> <g id="Layer_1"></g> </g></svg>
                  </div>
                  <div className="w-full text-center">
                    <div className="text-md font-semibold">
                      Thiết kế hoàn toàn Miễn phí
                    </div>
                    <div className="text-sm font-light">
                      Nhiều ý tưởng thiết kế sáng tạo
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 text-[#6B1346]">
                  <div>
                    <svg width="92px" height="92px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28002 16.11 4.28002H17.81C18.87 4.28002 19.74 5.14996 19.74 6.20996V7.91003C19.74 8.30003 19.95 8.87004 20.21 9.17004L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.5699C12.58 22.1599 11.45 22.1599 10.75 21.5699L9.17002 20.21C8.87002 19.95 8.31001 19.74 7.91001 19.74H6.18C5.12 19.74 4.25 18.8701 4.25 17.8101V16.1C4.25 15.71 4.04001 15.15 3.79001 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79001 9.17004C4.04001 8.87004 4.25 8.31004 4.25 7.92004V6.20996C4.25 5.14996 5.12 4.28002 6.18 4.28002H7.91001C8.30001 4.28002 8.87002 4.07005 9.17002 3.81005L10.75 2.44995Z" stroke="#ffffff" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.89001 14.82L11.34 15.94C11.53 16.13 11.95 16.22 12.23 16.22H14C14.56 16.22 15.17 15.8 15.31 15.24L16.43 11.82C16.66 11.17 16.24 10.6 15.54 10.6H13.67C13.39 10.6 13.16 10.3701 13.2 10.0401L13.43 8.54008C13.52 8.12008 13.24 7.65005 12.82 7.51005C12.45 7.37005 11.98 7.56 11.79 7.84L9.87 10.69" stroke="#ffffff" stroke-width="1.032" stroke-miterlimit="10"></path> <path d="M7.5 14.8199V10.24C7.5 9.57999 7.78 9.34998 8.44 9.34998H8.91C9.56 9.34998 9.85001 9.57999 9.85001 10.24V14.8199C9.85001 15.4699 9.57 15.71 8.91 15.71H8.44C7.78 15.71 7.5 15.4799 7.5 14.8199Z" stroke="#ffffff" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                  </div>
                  <div className="w-full text-center">
                    <div className="text-md font-semibold">
                      Xem thực tế tại cửa hàng
                    </div>
                    <div className="text-sm font-light">
                      Tư vấn chuyên sâu
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full justify-center mb-10">
              <div className="py-5 text-center text-2xl font-semibold text-[#6B1346]">SẢN PHẨM YÊU THÍCH</div>
              <div className="grid grid-cols-4 gap-10 mt-5">
                {products?.map((product: Product, index: any) => (
                  <Link href='#' key={index} className='relative group cursor-pointer rounded-lg'>
                    <Card className="rounded-lg flex flex-col border-none">
                      <div className='relative w-full h-[280px] rounded-lg'>
                        <Image
                          src={product?.images[0]}
                          alt={product?.name + ' image'}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className='rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-lg'
                        />
                      </div>
                      <div className='flex flex-col justify-center py-6 text-start'>
                        <div className="text-md mb-3 max-h-[28px] truncate">
                          {product?.name}
                        </div>
                        <div className='w-full grid grid-cols-5 items-center'>
                          <p className="col-span-3 max-h-[24px] text-lg font-semibold text-left truncate">
                            {Intl.NumberFormat('de-DE').format(product?.price)} đ
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="w-full flex justify-center mt-10">
                <Button className="w-1/5 bg-white p-5 border-[1px] border-black text-black text-md font-light rounded-full hover:bg-[#FBBF39]">
                  XEM TẤT CẢ SẢN PHẨM
                </Button>
              </div>
            </div>
            <div className="w-full justify-center mb-10">
              <div className="grid grid-cols-2 gap-10 mt-5">
                {other_services?.map((service: Service, index: any) => (
                  <Link href='#' key={index} className='relative group cursor-pointer rounded-lg'>
                    <Card className="rounded-sm flex flex-col border-none">
                      <div className='relative w-full h-[300px] rounded-lg'>
                        <Image
                          src={service?.image}
                          alt={service?.title + ' image'}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className='rounded-sm hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-lg'
                        />
                      </div>
                      <div className='flex flex-col justify-center py-6 text-start'>
                        <div className="text-lg font-semibold text-[#6B1346] mb-3 max-h-[28px] truncate">
                          {service?.title}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
