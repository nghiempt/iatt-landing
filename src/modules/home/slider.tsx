'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Banner {
    id: number;
    imageUrl: string;
    title: string;
    description?: string;
}

const bannerData: Banner[] = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/farmcode/image/upload/v1737355887/iatt/vw0razvbguqvcumvyfxa.png',
        title: 'Banner 1',
        description: 'Description for banner 1'
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/farmcode/image/upload/v1737356240/iatt/don9ysfefs3j3frnos2i.png',
        title: 'Banner 2',
        description: 'Description for banner 2'
    },
    {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/farmcode/image/upload/v1737356742/iatt/gy4oh4p6qi2lxgolzabl.png',
        title: 'Banner 3',
        description: 'Description for banner 3'
    }
];

const BannerSlider: React.FC = () => {

    const [currentBanner, setCurrentBanner] = useState(0);

    const autoPlayInterval = 3000;
    const banners = bannerData;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [banners.length]);

    const handleNext = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const handlePrev = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full">
            <div className="relative w-full h-[400px]">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === currentBanner ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                            width={1000}
                            height={0}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentBanner ? 'bg-white' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;