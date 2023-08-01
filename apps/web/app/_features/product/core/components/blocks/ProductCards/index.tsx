import { ProductCardsFragmentFragment } from '@/schema/graphql';
import { ProductCard } from './ProductCard';
import { graphql } from 'babel-plugin-relay/macro';
import styles from './ProductCards.module.scss';

export const ProductCardsFragment = graphql`
  fragment ProductCards_products on Products {
    total
    items {
      productId
      title
      productImages {
        items {
          url
        }
      }
    }
  }
`;

type Props = {
  products: ProductCardsFragmentFragment;
};

export const ProductCards = ({ products }: Props) => {
  return (
    <div>
      <ul className='max-w-2-xl mx-auto flex flex-col gap-8 xl:flex-row xl:flex-wrap'>
        {products?.items?.map((item) => (
          <li key={item.productId} className={styles.item}>
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
