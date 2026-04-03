import styles from './index.module.css';
import { LocationType } from '@/mongoose/locations/schema'; 

interface Props {
    location: LocationType;
}

const LocationDetails = ({ location }: Props) => {
    if (!location) return <p>Loading location details...</p>;

    return (
        <ul className={styles.root}>
            <li><strong>Name:</strong> {location.name}</li>
            <li><strong>Location ID:</strong> {location.location_id}</li>
            <li><strong>Address:</strong> {location.address}</li>
            <li><strong>Street:</strong> {location.street}</li>
            <li><strong>Zipcode:</strong> {location.zipcode}</li>
            <li><strong>Borough:</strong> {location.borough}</li>
            <li><strong>Cuisine:</strong> {location.cuisine}</li>
            <li><strong>Grade:</strong> {location.grade}</li>
        </ul>
    );
};

export default LocationDetails;