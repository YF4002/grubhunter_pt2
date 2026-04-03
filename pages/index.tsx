import Head from 'next/head';
import dbConnect from '@/middleware/mongoose';
import { findAllLocations } from '@/mongoose/locations/services';
import LocationsList from '@/components/locations-list';
import { LocationType } from '@/mongoose/locations/schema';



interface Props {
    locations: string; 
}

const Home = ({ locations }: Props) => {
    const locationsArray: LocationType[] = JSON.parse(locations);
    const pageTitle = "Grubhunter: Find Your Next Meal";

    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Explore local restaurants" />
            </Head>

            <main style={{ padding: '2rem' }}>
                <h1>{pageTitle}</h1>
                <LocationsList locations={locationsArray} />
            </main>
        </div>
    );
};

export async function getStaticProps() {
    try {
        await dbConnect();
        const data = await findAllLocations();
        
        return {
            props: {
                locations: JSON.stringify(data),
            },
        };
    } catch (error) {
        console.error("SSG Fetch Error:", error);
        return { props: { locations: "[]" } };
    }
}

export default Home;