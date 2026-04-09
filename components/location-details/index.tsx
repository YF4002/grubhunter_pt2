import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../button';
import styles from './index.module.css';
import { LocationType } from '@/mongoose/locations/schema';

interface Props {
  location: LocationType;
}

interface WishlistInterface {
  locationId: string;
  userId: string;
}

const LocationDetails = ({ location }: Props) => {
  // a. Retrieve the current session
  const { data: session } = useSession();

  // b. State to track if location is on wishlist
  const [onWishlist, setOnWishlist] = useState(false);

  // c. State to track if request is loading
  const [loading, setLoading] = useState(false);

  // d. Use useEffect to determine initial wishlist state
  useEffect(() => {
    const userId = session?.user?.fdlst_private_userId;
    // Check if current user's ID exists in the location's wishlist array
    const isSaved = !!(userId && location.on_wishlist?.includes(userId));
    setOnWishlist(isSaved);
  }, [session, location]);

  // e. Define wishlistAction function
  const wishlistAction = async ({ locationId, userId }: WishlistInterface) => {
    // f. Exit immediately if loading is true
    if (loading) return;

    // g. Set loading to true to disable UI
    setLoading(true);

    // h. Determine whether to add or remove
    const mutationName = onWishlist ? "removeWishlist" : "addWishlist";

    // i. Send POST request to GraphQL API
    const query = `
      mutation {
        ${mutationName}(user_id: "${userId}", location_id: "${locationId}") {
          location_id
        }
      }
    `;

    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      // j. Check status and update state
      if (response.ok) {
        setOnWishlist(!onWishlist);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      // k. Reset loading state
      setLoading(false);
    }
  };

  // l. Render list of location details
  if (!location) return <p>Loading location details...</p>;

  return (
    <div className={styles.container}>
      <ul className={styles.root}>
        <li><strong>Address:</strong> {location.address}</li>
        <li><strong>Street:</strong> {location.street}</li>
        <li><strong>Zipcode:</strong> {location.zipcode}</li>
        <li><strong>Borough:</strong> {location.borough}</li>
        <li><strong>Cuisine:</strong> {location.cuisine}</li>
        <li><strong>Grade:</strong> {location.grade}</li>
      </ul>

      {/* m. Check for user ID in session before rendering button */}
      {session?.user?.fdlst_private_userId && (
        <div style={{ marginTop: '1rem' }}>
          <Button
            // 4. Variant determined by onWishlist state
            variant={onWishlist ? "default" : "blue"}
            // 4a. Disable button when loading
            disabled={loading}
            // 4b. Attach click handler
            clickHandler={() => 
              wishlistAction({ 
                locationId: location.location_id, 
                userId: session.user.fdlst_private_userId 
              })
            }
          >
            {/* 4c. Button label based on state */}
            {onWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;