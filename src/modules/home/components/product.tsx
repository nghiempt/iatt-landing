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

const products = [
    {
        id: 1,
        title: 'KHUNG ẢNH NGHỆ THUẬT',
        originalPrice: '100.000₫',
        salePrice: '230.000₫',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728994544/iatt/IMG_7600_ibpjrp.jpg',
        status: 'Còn hàng'
    },
    {
        id: 2,
        title: 'ÉP ẢNH CHẤT LƯỢNG CAO',
        originalPrice: '100.000₫',
        salePrice: '60.000₫',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728991377/iatt/IMG_7644_mi2bkg.jpg',
        status: 'Còn hàng'
    },
    {
        id: 3,
        title: 'ALBUM ẢNH CƯỚI',
        originalPrice: '100.000₫',
        salePrice: '160.000₫',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1726833331/iatt/syrnjtt21rknyuavlvbi.png',
        status: 'Hết hàng'
    },
    {
        id: 4,
        title: 'ALBUM CÁN MÀNG SẮC NÉT',
        originalPrice: '100.000₫',
        salePrice: '190.000₫',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728996961/iatt/IMG_7665_iolfrr.jpg',
        status: 'Còn hàng'
    }
]

const ProductSection = () => {
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
                        <h2 className="text-4xl font-bold mb-4">IN ẤN</h2>
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
                            {products.map((product) => (
                                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                                    <Card className="border-none">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {product.id === 3 && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <span className="text-white text-lg font-medium">Liên hệ với chúng tôi</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-sm text-gray-500 line-through">
                                                    {product.originalPrice}
                                                </div>
                                                <div className="text-xl font-bold">
                                                    {product.salePrice}
                                                </div>
                                                <h3 className="font-medium">
                                                    {product.title}
                                                </h3>
                                                <div className={`text-sm ${product.status === 'Còn hàng'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                    }`}>
                                                    {product.status}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
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