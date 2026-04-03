import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { findLocationById } from '@/mongoose/locations/services';
import LocationDetails from '@/components/location-details';
import { LocationType } from '@/mongoose/locations/schema';

interface Props {
    location: string;
}

const LocationPage = ({ location }: Props) => {
    const loc: LocationType = JSON.parse(location);
    
    return (
        <div>
            <Head>
                <title>{`${loc.name} | Grubhunter`}</title>
            </Head>
            <h1>{loc.name}</h1>
            <LocationDetails location={loc} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locationId } = context.query;

    try {
        const data = await findLocationById({ id: locationId as string });

        if (!data) {
            return { notFound: true };
        }

        return {
            props: {
                location: JSON.stringify(data),
            },
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return { notFound: true };
    }
};

export default LocationPage;