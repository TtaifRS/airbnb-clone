'use client';

import {signIn} from 'next-auth/react'
import { useState } from 'react';
import axios from 'axios';
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

import useRegisterModel from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Intput';
import Button from '../Button';


const LoginModal = () => {

  const router = useRouter()

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
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false)

      if(callback?.ok){
        toast.success("Logged in")
        router.refresh()
        loginModal.onClose()
      }

      if(callback?.error){
        toast.error(callback.error)
      }
    })
  }

  const BodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome Back to Airbnb'
        subtitle='Log in to your account!'
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
        onClick={()=>{}}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={()=>{}}
      />

      <div className='text-neutral-400 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div className='
            text-neutral-800
            cursor-pointer
            hover:underline
            
          '>
            signup
          </div>
        </div>
      </div>
    </div>
  )

  return ( 
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={BodyContent}
      footer={FooterContent}
    />
   );
}
 
export default LoginModal;