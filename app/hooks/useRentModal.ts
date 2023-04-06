import {create} from 'zustand'

interface RentModalStroe{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const useRentModal = create<RentModalStroe>((set)=>({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useRentModal