import Link from 'next/link'
import { GlobalComponent } from '@/components/global'
import { ROUTES } from '@/utils/route'
import { HELPER } from '@/utils/helper'
import { useEffect, useState } from 'react'
import { ProductService } from '@/services/product'

interface ProductSectionMobileProps {
    type: string;
}

const ProductSectionMobile: React.FC<ProductSectionMobileProps> = ({ type }) => {
    const [products, setProducts] = useState([] as any);

    const init = async () => {
        const res = await ProductService.getAll();
        if (res && res.data.length > 0) {
            const frameProducts = res.data.filter((product: { category: string }) => product.category === type);
            setProducts(res.data);
        }
    };

    useEffect(() => {
        init()
    }, []);

    return (
        <section className="">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product: any) => (
                    <Link
                        key={product.id}
                        href={`${ROUTES.PRODUCT}/${HELPER.getLastFourChars(
                            product?._id
                        )}?sp=${HELPER.convertSpacesToDash(product?.name)}`}
                    >
                        <GlobalComponent.ProductCardMobile
                            image={product?.thumbnail}
                            title={product?.name}
                            price={product?.price}
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ProductSectionMobile