import { ROUTES } from '@/utils/route'
import Image from 'next/image'
import Link from 'next/link'

const services = [
    {
        title: 'In ấn',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355071/iatt/wsedzbfnxoctzasn6a5c.png',
        href: `${ROUTES.PLASTIC}?tag=Plastic`
    },
    {
        title: 'Khung ảnh',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728996038/iatt/IMG_7555_p4bqwc.jpg',
        href: `${ROUTES.FRAME}?tag=Frame`
    },
    {
        title: 'Photobook',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355066/iatt/fkgpmp7plmfvzizsaqpt.png',
        href: `${ROUTES.ALBUM}?tag=Album`
    },
    {
        title: 'In ấn',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355071/iatt/wsedzbfnxoctzasn6a5c.png',
        href: `${ROUTES.PLASTIC}?tag=Plastic`
    },
    {
        title: 'Khung ảnh',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728996038/iatt/IMG_7555_p4bqwc.jpg',
        href: `${ROUTES.FRAME}?tag=Frame`
    },
    {
        title: 'Photobook',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355066/iatt/fkgpmp7plmfvzizsaqpt.png',
        href: `${ROUTES.ALBUM}?tag=Album`
    }
]

const CategoryListSectionMobile = () => {
    return (
        <section className="container !px-0">
            <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                    <Link
                        key={index}
                        href={service.href}
                        className="group"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CategoryListSectionMobile