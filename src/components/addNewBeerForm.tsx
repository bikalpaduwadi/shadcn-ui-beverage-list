import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useMyBeerState } from '@/hooks/useBeers';
import { Form, FormItem, FormField, FormControl, FormMessage } from './ui/form';

interface AddNewBeerFormProps {
  onCancel: () => void;
}

const AddNewBeerForm = (props: AddNewBeerFormProps) => {
  const { onCancel } = props;
  const { data: myBeerData, setData } = useMyBeerState();

  const beerFormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(50, {
        message: 'Name must not be longer than 50 characters.',
      }),
    genre: z
      .string()
      .trim()
      .min(2, {
        message: 'Genre must be at least 2 characters.',
      })
      .max(50, {
        message: 'Genre must not be longer than 50 characters.',
      }),
    description: z
      .string()
      .trim()
      .min(2, {
        message: 'Description must be at least 2 characters.',
      })
      .max(500, {
        message: 'Description must not be longer than 500 characters.',
      }),
  });

  type BeerFormValues = z.infer<typeof beerFormSchema>;

  const form = useForm<BeerFormValues>({
    resolver: zodResolver(beerFormSchema),
  });

  const onSubmit = (data: BeerFormValues) => {
    const existingDataLength = myBeerData.length;
    setData([
      {
        id: (existingDataLength + 1).toString(),
        name: data.name,
        ingredients: '',
        tagline: data.genre,
        description: data.description,
        imageUrl: 'https://images.punkapi.com/v2/25.png',
      },
    ]);

    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Beer Name*' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genre'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Genre*' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='Description*' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-5 flex justify-end'>
          <Button
            onClick={onCancel}
            type='button'
            size='sm'
            variant='secondary'
            className='mr-3 '
          >
            Cancel
          </Button>
          <Button
            size='sm'
            type='submit'
            className='bg-blue-600 hover:bg-blue-800 px-6'
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNewBeerForm;
