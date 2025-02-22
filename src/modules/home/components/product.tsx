import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { GlobalComponent } from '@/components/global'
import { ROUTES } from '@/utils/route'
import { HELPER } from '@/utils/helper'
import { useEffect, useState } from 'react'
import { ProductService } from '@/services/product'

interface ProductSectionProps {
    type: string;
  }


const ProductSection: React.FC<ProductSectionProps> = ({type}) => {
    const [products, setProducts] = useState([] as any);
    const init = async () => {
        const res = await ProductService.getAll();
        if (res && res.data.length > 0) {
            const frameProducts = res.data.filter((product: { category: string }) => product.category === type);
            setProducts(frameProducts);
        }
    };
    useEffect(() => {
        init()
    }, []);
    return (
        <section className="container !px-0 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative aspect-square group overflow-hidden rounded-lg">
                    <Image
                        src="https://res.cloudinary.com/farmcode/image/upload/v1737355066/iatt/fkgpmp7plmfvzizsaqpt.png"
                        alt="alt"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                        <h3 className="text-lg font-medium mb-2">Bộ sưu tập</h3>
                        <h2 className="text-4xl font-bold mb-4">
                            {type === 'Frame' && 'KHUNG ẢNH'}
                            {type === 'Album' && 'PHOTOBOOK'}
                            {type === 'Plastic' && 'IN ẤN'}
                        </h2>
                        <Link
                            href="/"
                            className="text-md hover:underline"
                        >
                            Xem thêm
                        </Link>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {products.map((product: any) => (
                                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                                    <Link
                                        href={`${ROUTES.PRODUCT}/${HELPER.getLastFourChars(
                                            product?._id
                                        )}?sp=${HELPER.convertSpacesToDash(product?.name)}`}
                                    >
                                        <GlobalComponent.ProductCardSmall
                                            image={product?.thumbnail}
                                            title={product?.name}
                                            price={product?.price}
                                        />
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default ProductSection