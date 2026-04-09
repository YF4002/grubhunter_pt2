import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import dbConnect from '@/middleware/mongoose';
import { findWishlistForUser } from '@/mongoose/locations/services';
import LocationsList from '@/components/locations-list';
import { LocationType } from '@/mongoose/locations/schema';

interface Props {
  locations: string;
  userId: string;
}

const WishlistPage = ({ locations, userId }: Props) => {
  const { data: session } = useSession();
  const locationsArray: LocationType[] = JSON.parse(locations);
  
  const isOwner = session?.user?.fdlst_private_userId === userId;
  const title = isOwner ? "Your Wish List" : "A Shared Wish List";

  return (
    <div>
      <Head><title>{title}</title></Head>
      <h1>{title}</h1>
      {locationsArray.length === 0 ? (
        <p>This wish list is currently empty.</p>
      ) : (
        <LocationsList locations={locationsArray} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;
  try {
    await dbConnect();
    const data = await findWishlistForUser({ userId: userId as string });
    return { props: { locations: JSON.stringify(data), userId } };
  } catch (error) {
    return { props: { locations: "[]", userId } };
  }
};

export default WishlistPage;