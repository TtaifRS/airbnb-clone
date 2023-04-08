'use client';

import { useMemo } from 'react';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import LisitingInfo from '@/app/components/listings/ListingInfo';



interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {

  const catergory = useMemo(()=>{
    return categories.find((item) => 
      item.label === listing.category
    )
  },[listing.category])

  return ( 
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title = {listing.title}
            imageSrc = {listing.imageSrc}
            locationValue = {listing.locationValue}
            currentUser = {currentUser}
          />
          <div className='
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          '>
            <LisitingInfo
              user={listing.user}
              category={catergory}
              description = {listing.description}
              roomCount = {listing.roomCount}
              guestCount = {listing.guestCount}
              bathRoomCount = {listing.bathroomCount}
              locationValue = {listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;