import { forwardRef } from 'react';

import Product from '@/domains/product';
import ProductItem from './productItem';

interface ProductItemListProps {
  products: Product[];
}

const ProductItemList = forwardRef<HTMLDivElement, ProductItemListProps>(
  (props, ref) => {
    const { products } = props;

    return (
      <div
        ref={ref}
        className='md:flex md:flex-wrap justify-between align-top mt-5 px-2 max-h-[78vh] overflow-y-auto'
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
  }
);

export default ProductItemList;
