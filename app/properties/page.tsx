import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';

import ClientOnly from '../components/CLientOnly';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()
  const listings = await getListings({
    userId: currentUser?.id
  })

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

  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState
          title='No Properties found'
          subtitle='Looks like you do not have any propety'
        />
      </ClientOnly>
    )
  }

  return(
    <ClientOnly>
      <PropertiesClient
        listings = {listings}
        currentUser = {currentUser}
      />
    </ClientOnly>
  )


}
 
export default PropertiesPage;