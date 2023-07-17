import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  product: {
    productId: string;
    title: string;
    productImages?: {
      total?: any;
      items?: { url: string }[] | null;
    } | null;
  };
  className?: string;
};

export const ProductCard = ({ product, className }: Props) => {
  return (
    <Link
      href={`/products/${product.productId}`}
      passHref
      className={clsx(className, 'flex w-full flex-col md:border')}
    >
      <div className='relative aspect-square md:aspect-video'>
        <Image fill className='object-cover' src={product?.productImages?.items?.[0]?.url ?? ''} alt='' />
      </div>
      <p className='w-full bg-white p-3'>{product.title}</p>
    </Link>
  );
};
