"use client"

import React from 'react';
import Header from '@/layout/header';
import Footer from '@/layout/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/utils/route';
import OrderDetailModal from './order-detail-modal';

export interface OrderProduct {
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'completed' | 'cancelled' | 'shipping';
  products: OrderProduct[];
}

export default function OrderHistory() {
  const orders: Order[] = [
    {
      id: "FWB12546798",
      date: "10/12/2024",
      total: 129000,
      status: "completed",
      products: [
        {
          name: "Khung ảnh titan A1",
          color: "Vàng",
          size: "15x21",
          price: 129000,
          quantity: 1
        }
      ]
    },
    {
      id: "FWB12546799",
      date: "10/12/2024",
      total: 129000,
      status: "cancelled",
      products: [
        {
          name: "Khung ảnh titan A1",
          color: "Vàng",
          size: "15x21",
          price: 129000,
          quantity: 1
        }
      ]
    },
    {
      id: "FWB12546800",
      date: "10/12/2024",
      total: 129000,
      status: "shipping",
      products: [
        {
          name: "Khung ảnh titan A1",
          color: "Vàng",
          size: "15x21",
          price: 129000,
          quantity: 1
        }
      ]
    }
  ];

  return (
    <div className="w-full">
      <Header />
      <div id="body" className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={`${ROUTES.HOME}`} className="hover:text-black">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Tài khoản</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`${ROUTES.ACCOUNT}`} className="hover:text-black">Lịch sử mua hàng</Link>
        </nav>
        <div className="">
          <section className="bg-white antialiased dark:bg-gray-900">
            <div className="">
              <div className="">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Đơn hàng của bạn</h3>
                {orders.map((order, index) => (
                  <div key={order.id} className={`bg-gray-50 rounded-lg flex flex-wrap items-center gap-y-4 border border-gray-200 p-4 ${index !== orders.length - 1 ? 'mb-4' : ''}`}>
                    <dl className="w-1/2 sm:w-48">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Mã đơn hàng</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">#{order.id}</a>
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Ngày:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.date}</dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tổng:</dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order.total.toLocaleString('vi-VN')} VND
                      </dd>
                    </dl>
                    <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Trạng thái:</dt>
                      <dd className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                        ${order.status === 'shipping' ? 'bg-yellow-100 text-yellow-800' : ''}`}>
                        {order.status === 'completed' && (
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                          </svg>
                        )}
                        {order.status === 'cancelled' && (
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                        )}
                        {order.status === 'shipping' && (
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                          </svg>
                        )}
                        {order.status === 'completed' && 'Hoàn thành'}
                        {order.status === 'cancelled' && 'Đã hủy'}
                        {order.status === 'shipping' && 'Đang giao'}
                      </dd>
                    </dl>
                    <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                      <OrderDetailModal orderId={'FWB12546798'} {...order} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}