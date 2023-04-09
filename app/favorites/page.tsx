import getCurrentUser from '../actions/getCurrentUser';
import getFavoritesListing from '../actions/getFavoritesListing';
import ClientOnly from '../components/CLientOnly';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favoritesListing = await getFavoritesListing()
  
  if(!currentUser){
    return(
      <ClientOnly>
      <EmptyState
        title='Unauthorized'
        subtitle='Please login'
      />
    </ClientOnly>
    )
  }

  if(favoritesListing.length === 0){
    return ( 
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorites listing'
        />
      </ClientOnly>
     );
  }

  return(
    <ClientOnly>
      <FavoritesClient
        favoritesListing = {favoritesListing}
        currentUser = {currentUser} 
      />
    </ClientOnly>
  )
  
}
 
export default FavoritesPage;