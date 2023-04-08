'use client'

import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';

import { SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './LisitingCategory';



const Map = dynamic(() => import("../Map"), {
  ssr: false
})

interface LisitingInfoProps {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathRoomCount: number;
  locationValue: string;
  category: {
    icon: IconType;
    label: string;
    description: string
  } | undefined;
} 

const LisitingInfo : React.FC<LisitingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathRoomCount,
  locationValue,
  category
}) => {

  const {getByValue} = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return ( 
    <div className='col-span-4 flex flex-col gap-8'>
      <div className="flex flex-col gap-2">
        <div className='
          text-xl
          font-semibold
          flex
          flex-row
          items-center
          gap-2
        '>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image}/>
        </div>
        <div className='
          flex
          flex-row
          items-center
          gap-4
          font-light
          text-neutral-500
        '>
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathRoomCount} bathrooms
          </div>
        </div>
        <hr/>
        {
          category && (
            <ListingCategory
              icon={category.icon}
              label={category.label}
              description={category.description}
            />
          )
        }
        <hr/>
        <div className="text-lg font-light text-neutral-500">
          {description}
        </div>
        <hr/>
        <Map center={coordinates}/>
      </div>
    </div>
   );
}
 
export default LisitingInfo;