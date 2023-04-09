import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface FavoritesClientProps {
  favoritesListing: SafeListing[],
  currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favoritesListing,
  currentUser
}) => {
  return ( 
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have liked'
      />
      <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grids-col-4
        xl:grids-col-5
        2xl:grids-col-6
        gap-8
      ">
        {
          favoritesListing.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))
        }
      </div>
    </Container>
   );
}
 
export default FavoritesClient;