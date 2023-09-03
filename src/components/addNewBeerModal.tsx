import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog';
import AddNewBeerForm from './addNewBeerForm';

interface AddNewBeerModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddNewBeerModal = (props: AddNewBeerModalProps) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Beer</DialogTitle>
        </DialogHeader>
        <div className='h-24 w-20 border border-gray-300 flex justify-center items-center py-2'>
          <img
            className='object-cover h-full'
            src='https://images.punkapi.com/v2/25.png'
            alt='Bad pixel'
          />
        </div>
        <AddNewBeerForm onCancel={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewBeerModal;
