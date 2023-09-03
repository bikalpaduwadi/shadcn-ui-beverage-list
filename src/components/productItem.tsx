import { Tooltip } from 'react-tooltip';
import { FC, useEffect, useRef, useState } from 'react';

import Product from '@/domains/product';
import { Card, CardContent } from './ui/card';

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const imageContainer = useRef<HTMLDivElement | null>(null);

  // Temp hack to calculate tooltip width on first render
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const ingrediants = product.ingredients || {};
  const ingrediantsKeys = Object.keys(ingrediants);

  const IngrediantsValues = ingrediantsKeys.join(', ');

  useEffect(() => {
    if (imageContainer?.current && isImageLoaded) {
      const imageWidth = imageContainer.current.offsetWidth;
      const tooltip = document.querySelector<HTMLDivElement>('.image-tooltip');

      if (tooltip) {
        tooltip.style.width = `${imageWidth}px`;
      }
    }
  }, [isImageLoaded]);

  return (
    <Card className='w-full xs:h-44 mb-5 md:w-[49%] hover:bg-sky-100 hover:cursor-pointer'>
      <CardContent className='p-0 py-6'>
        <div className='flex flex-col xs:flex-row items-center xs:h-32'>
          <div
            ref={imageContainer}
            data-tooltip-id={`image-tooltip-${product.id}`}
            className='h-32 xs:h-full w-full xs:w-[25%] md:w-[30%] lg:w-[25%] flex flex-col justify-center items-center'
          >
            <img
              alt={product.name}
              src={product.imageUrl}
              className='object-cover h-full'
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
          <Tooltip
            place='top'
            className='p-1 flex flex-wrap image-tooltip'
            id={`image-tooltip-${product.id}`}
            style={{
              maxWidth: imageContainer?.current?.offsetWidth,
            }}
          >
            <div className='text-sm'>
              {IngrediantsValues
                ? `Ingrediants: ${IngrediantsValues}`
                : product.name}
            </div>
          </Tooltip>
          <div className='w-[72%] md:w-[68%] lg:w-[65%] lg h-full flex flex-col justify-center'>
            <h1 className='text-2xl font-semibold mb-2 truncate'>
              {product.name}
            </h1>
            <div className='text-orange-400 font-semibold mb-2 truncate'>
              {product.tagline}
            </div>
            <div className='text-sm custom-ellipsis'>{product.description}</div>
          </div>
          <div className='hidden md:flex w-[2%] lg:w-[10%] '></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
