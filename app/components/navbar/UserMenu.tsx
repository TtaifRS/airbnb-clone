'use client';
import { useCallback, useState } from 'react';
import {User} from '@prisma/client'
import {AiOutlineMenu} from 'react-icons/ai'
import {signOut} from 'next-auth/react'

import Avatar from '../Avatar';


import MenuItem from './MenuItem';
import useRegisterModel from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface UserMenuProps{
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const registerModal = useRegisterModel()
  const loginModal = useLoginModal()

  const [isOpen, setIsOpen] = useState(false)
  
  const toggleopen = useCallback(()=>{
    setIsOpen((value) => !value)
  },[])


  return ( 
    <div className='relative'>
      <div>
        <div className='flex flex-row items-center gap-3'>
          <div
            onClick={()=>{}}
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
              <Avatar/>
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
                    onClick={() => {}}
                    label='My trips'
                  />
                  <MenuItem 
                  onClick={()=>{}}
                  label='My favourites'
                  />
                  <MenuItem 
                  onClick={()=>{}}
                  label='My reservations'
                  />
                  <MenuItem 
                  onClick={()=>{}}
                  label='My properties'
                  />
                  <MenuItem 
                  onClick={()=>{}}
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