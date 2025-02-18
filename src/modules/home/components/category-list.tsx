import Image from 'next/image'
import Link from 'next/link'

const services = [
    {
        title: 'In ấn',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355071/iatt/wsedzbfnxoctzasn6a5c.png',
        href: '/'
    },
    {
        title: 'Khung ảnh',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728996038/iatt/IMG_7555_p4bqwc.jpg',
        href: '/'
    },
    {
        title: 'Photobook',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1737355066/iatt/fkgpmp7plmfvzizsaqpt.png',
        href: '/'
    },
    {
        title: 'Story Book',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728994859/iatt/IMG_7629_qbhawb.jpg',
        href: '/'
    },
    {
        title: 'Ảnh Cổng Cưới',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728995766/iatt/IMG_7590_dohlmd.jpg',
        href: '/'
    },
    {
        title: 'Album Cưới',
        image: 'https://res.cloudinary.com/farmcode/image/upload/v1728997079/iatt/IMG_7680_xhaeis.jpg',
        href: '/'
    }
]

const CategoryListSection = () => {
    return (
        <section className="container !px-0 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
                        <p className="mt-2 text-center text-md font-medium">{service.title}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CategoryListSection