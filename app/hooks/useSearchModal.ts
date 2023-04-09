import {create} from 'zustand'

interface SearchModalStroe{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const useSearchModal = create<SearchModalStroe>((set)=>({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useSearchModal