import {create} from 'zustand'

interface RegisterModelStroe{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const useRegisterModel = create<RegisterModelStroe>((set)=>({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default useRegisterModel