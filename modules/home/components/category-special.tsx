import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const frames = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728997079/iatt/IMG_7680_xhaeis.jpg',
        title: 'ALBUM SIÊU SẮC NÉT',
        description: 'Chất liệu bền đẹp, chắc chắn, an toàn, chất lượng',
        note: 'Album size 18x26'
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728996279/iatt/IMG_7658_ykze64.jpg',
        title: 'ALBUM TRÁNG GƯƠNG',
        description: 'Chất liệu bền đẹp, chắc chắn, an toàn, chất lượng',
        note: 'Bìa gỗi - Rượt cận man - siêu mỏng'
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728995766/iatt/IMG_7590_dohlmd.jpg',
        title: 'ẢNH CỔNG CƯỚI ',
        description: 'Chất liệu bền đẹp, chắc chắn, an toàn, chất lượng',
        note: 'Chất lượng cao, bền bỉ'
    },
    {
        id: 4,
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728995381/iatt/IMG_7623_l6qxyh.jpg',
        title: 'STORY BOOK',
        description: 'Chất liệu bền đẹp, chắc chắn, an toàn, chất lượng',
        note: 'Lưu giữ kỷ niệm của bạn'
    }
]

const CategorySpecialSection = () => {
    return (
        <section className="container !px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {frames.map((frame) => (
                        <CarouselItem key={frame.id} className="md:basis-1/2 lg:basis-1/4">
                            <div className="relative aspect-[3/4] group overflow-hidden rounded-lg">
                                <Image
                                    src={frame.image}
                                    alt={frame.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">{frame.title}</h3>
                                        <p className="text-sm mb-2">{frame.description}</p>
                                        {frame.note && (
                                            <p className="text-sm opacity-80">{frame.note}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </section>
    )
}

export default CategorySpecialSection