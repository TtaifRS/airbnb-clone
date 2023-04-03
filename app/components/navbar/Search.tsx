'use client';

import {BiSearch} from 'react-icons/bi'

const Search = () => {
  return ( 
    <div
      className='
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      '
    >
      <div
        className='
          flex
          flex-row
          items-center
          justify-between
        '
      >
        <div
          className='
            text-sm
            font-semibold
            px-6
          '
        >
            anywhere
        </div>
        <div
          className='
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            text-center
            flex-1
          '
        >
          Any week
        </div>
        <div
          className='
            flex
            flex-row
            items-center
            text-sm
            pl-6
            pr-2
            gap-3
            text-gray-600
          '
        >
         <div className='hidden sm:block'>Add Guest</div>
         <div className='
          p-2
          bg-red-500
          text-white
          rounded-full
         '>
            <BiSearch size={18}/>
          </div> 
        </div>
      </div>
    </div>
   );
}
 
export default Search;