import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { HELPER } from '@/utils/helper';

const OrderDetailModal = ({ order }: any) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'waiting':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            case 'waiting':
                return 'Đang giao';
            default:
                return status;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                >
                    Xem chi tiết
                    <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Chi tiết đơn hàng #{order?._id}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Ngày đặt hàng</p>
                            <p className="text-sm font-semibold text-gray-900">{order?.date_create}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Trạng thái</p>
                            <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
                                {getStatusText(order?.status)}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        {/* <div className="divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <div key={index} className="py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='w-full'>
                                            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                                            <div className="w-full mt-1 flex flex-col justify-center items-start gap-1">
                                                <p className="text-sm text-gray-500">Màu khung: <span className="font-medium">{product.color}</span></p>
                                                <p className="text-sm text-gray-500">Kích thước: <span className="font-medium">{product.size}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{product.price.toLocaleString('vi-VN')} VND</p>
                                            <p className="text-sm text-gray-500">Số lượng: {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between">
                            <p className="text-base font-semibold text-gray-900">Tổng tiền</p>
                            <p className="text-base font-semibold text-gray-900">{HELPER.formatVND(order?.total)}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailModal;