import debounce from 'lodash/debounce';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './ui/button';
import { underscoreToCamel } from '@/lib/misc';
import ProductItemList from './productItemList';
import { useAllBeerState } from '@/hooks/useBeers';

const AllBeersTab = () => {
  const cachedData = useAllBeerState();
  const { data: beersData, page, setPage, setData: setBeersData } = cachedData;

  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const [hasMore, setHasMore] = useState<boolean>(true);
  // ToDo : For error handling
  // const [hasError, setHasError] = useState<boolean>(true);

  // ToDo: For displaying loaders
  // const [isloading, setIsLoading] = useState<boolean>(false);

  const scrollToBottom = useCallback(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop =
        listContainerRef.current.scrollHeight;
    }
  }, [listContainerRef]);

  // ToDo: Move this to separate hook/service
  const fetchData = useCallback(async () => {
    try {
      // setIsLoading(true);
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
      );
      const newData = await response.json();

      const parsedData = underscoreToCamel(newData);

      setBeersData([...beersData, ...parsedData]);
      scrollToBottom();
      setPage(page + 1);
      setHasMore(newData.length > 0);
    } catch (error) {
      // setHasError(true);
    } finally {
      // setIsLoading(false);
    }
  }, [page, beersData, setBeersData, setPage, scrollToBottom]);

  const debouncedFetch = debounce(fetchData, 500);

  useEffect(() => {
    if (!beersData.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    beersData.length && (
      <>
        <ProductItemList products={beersData} ref={listContainerRef} />
        {hasMore && (
          <div className='flex justify-center mt-2'>
            <Button
              size='sm'
              variant='link'
              onClick={debouncedFetch}
              className='text-blue-600'
            >
              Load more
            </Button>
          </div>
        )}
      </>
    )
  );
};

export default AllBeersTab;
