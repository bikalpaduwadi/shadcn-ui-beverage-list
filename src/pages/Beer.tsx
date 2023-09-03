import MyBeersTab from '@/components/myBeersTab';
import AllBeersTab from '@/components/allBeersTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BeerPage = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Tabs
        defaultValue='all-beers'
        className='relative w-[95%] md:w-[90%] xl:w-[80%] max-w-[1216px]'
      >
        <TabsList>
          <TabsTrigger value='all-beers'>All Beers</TabsTrigger>
          <TabsTrigger value='my-beers'>My Beers</TabsTrigger>
        </TabsList>
        <TabsContent value='all-beers' className='h-[78vh]'>
          <AllBeersTab />
        </TabsContent>
        <TabsContent value='my-beers' className='h-[78vh]'>
          <MyBeersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BeerPage;
