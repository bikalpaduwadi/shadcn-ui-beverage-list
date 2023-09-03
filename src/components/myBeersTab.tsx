import { memo, useState } from 'react';

import { Button } from './ui/button';
import ProductItemList from './productItemList';
import AddNewBeerModal from './addNewBeerModal';
import { useMyBeerState } from '@/hooks/useBeers';

const MyBeersTab = memo(() => {
  const cachedData = useMyBeerState();
  const { data: beersData } = cachedData;

  const [showAddBeerModal, setShowAddBeerModal] = useState(false);

  return (
    <>
      <Button
        size='sm'
        onClick={() => setShowAddBeerModal(true)}
        className='hidden xs:block absolute text-sm bg-blue-600 hover:bg-blue-800 top-1 right-2'
      >
        Add a new beer
      </Button>
      {!beersData.length ? (
        <div className='bg-gray-300 mt-5 mx-2 text-sm flex flex-col justify-center items-center h-[78vh]'>
          <div>Nothing to see yet.</div>
          <div>
            <span
              onClick={() => setShowAddBeerModal(true)}
              className='underline cursor-pointer text-blue-400'
            >
              Click here
            </span>{' '}
            to add your first beer!
          </div>
        </div>
      ) : (
        <ProductItemList products={beersData} />
      )}

      {showAddBeerModal && (
        <AddNewBeerModal
          isOpen={showAddBeerModal}
          setIsOpen={setShowAddBeerModal}
        />
      )}
    </>
  );
});

export default MyBeersTab;
