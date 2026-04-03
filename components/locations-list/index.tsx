import styles from './index.module.css';
import LocationsListItem from '../locations-list-item';
import { LocationType } from '@/mongoose/locations/schema';

interface Props {
    locations: LocationType[];
}

const LocationsList = ({ locations }: Props) => {
    if (locations.length === 0) {
        return <p>No restaurants found yet. Add some records to MongoDB or let the starter data seed on first run.</p>;
    }

    return (
        <ul className={styles.root}>
            {locations.map((loc) => (
                <LocationsListItem 
                    key={loc.name.toString()} 
                    location={loc} 
                />
            ))}
        </ul>
    );
};

export default LocationsList;