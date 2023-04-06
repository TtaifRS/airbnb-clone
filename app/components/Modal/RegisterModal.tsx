'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast'

import useRegisterModel from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Intput';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
  const registerModal = useRegisterModel()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register, 
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/register', data)
      .then(()=> {
        registerModal.onClose()
      })
      .catch((err) =>{
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggleModal = useCallback(()=>{
    loginModal.onOpen()
    registerModal.onClose()
  },[loginModal, registerModal])

  const BodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  )

  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr/>
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={()=>signIn('google')}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={()=>signIn('github')}
      />

      <div className='text-neutral-400 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div
          onClick={toggleModal}
          className='
            text-neutral-800
            cursor-pointer
            hover:underline
            
          '>
            login
          </div>
        </div>
      </div>
    </div>
  )

  return ( 
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={BodyContent}
      footer={FooterContent}
    />
   );
}
 
export default RegisterModal;