'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import {signOut} from 'next-auth/react'

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useRegisterModel from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';


interface UserMenuProps{
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const registerModal = useRegisterModel()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  
  const toggleopen = useCallback(()=>{
    setIsOpen((value) => !value)
  },[])

  const onRent = useCallback(()=>{
    if(!currentUser){
      return loginModal.onOpen()
    }

    return rentModal.onOpen()
  },[currentUser, loginModal, rentModal])


  return ( 
    <div className='relative'>
      <div>
        <div className='flex flex-row items-center gap-3'>
          <div
            onClick={onRent}
            className='
              hidden
              md:block
              text-sm
              font-semibold
              py-3
              px-4
              rounded-full
              hover:bg-neutral-100
              transition
              cursor-pointer
            '
          >
            Airbnb your home
          </div>
          <div
            onClick={toggleopen}
            className='
              p-4
              md:py-1
              md:px-2
              border-[1px]
              border-neutral-200
              flex
              flex-row
              items-center
              cursor-pointer
              rounded-full
              gap-3
              hover:shadow-md
              transition
            '
          >
            <AiOutlineMenu/>
            <div className='hidden md:block'>
              <Avatar src={currentUser?.image}/>
            </div>
          </div>
        </div>
      </div>
      {
        isOpen && (
          <div
            className='
              absolute
              w-[40vw]
              rounded-xl
              shadow-md
              md:w-3/4
              bg-white
              overflow-hidden
              right-0
              top-12
              text-sm
            '
          >
            {
              currentUser ? (
                <>
                  <div className='flex flex-col cursor-pointer'>
                    <MenuItem 
                    onClick={() => router.push('/trips')}
                    label='My trips'
                  />
                  <MenuItem 
                  onClick={()=>router.push('/favorites')}
                  label='My favourites'
                  />
                  <MenuItem 
                  onClick={()=>router.push('/reservations')}
                  label='My reservations'
                  />
                  <MenuItem 
                  onClick={()=>router.push('/properties')}
                  label='My properties'
                  />
                  <MenuItem 
                  onClick={rentModal.onOpen}
                  label='Airbnb my home'
                  />
                  <hr/>
                  <MenuItem 
                  onClick={()=>{signOut()}}
                  label='Logout'
                  />
                  </div>
                </>

              ) : (
                <>
                  <div className='flex flex-col cursor-pointer'>
                      <MenuItem 
                        onClick={loginModal.onOpen}
                        label='Login'
                      />
                      <MenuItem 
                        onClick={registerModal.onOpen}
                        label='Signup'
                      />
                  </div>                
                 </>
              )
            }
          </div>
        )
      }
    </div>
   );
}
 
export default UserMenu;