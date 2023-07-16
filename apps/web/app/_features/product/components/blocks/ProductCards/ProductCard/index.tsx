import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  product: {
    productId: string;
    title: string;
  };
  className?: string;
};

export const ProductCard = ({ product, className }: Props) => {
  return (
    <Link
      href={`/products/${product.productId}`}
      passHref
      className={clsx(className, 'flex flex-col w-full border')}
    >
      <div className='aspect-video bg-gray-100 to-blue-500' />
      <p className='p-3 w-full bg-white'>{product.title}</p>
    </Link>
  );
};
