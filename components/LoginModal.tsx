'use client';
import { signIn } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { RiCloseFill } from "react-icons/ri";
import { CustomButton, CustomUncontrolledInput } from '.';
import { getErrorMessage } from '@/actions/secondary-utils/errorHandling';
import Link from 'next/link';

interface LoginModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
    const [errorIsOpen, setErrorIsOpen] = useState(false);
    const [errorState, setErrorState] = useState('')

    useEffect(() => {
        setErrorIsOpen(false)
        setErrorState('')
    }, [isOpen])

    function closeModal() {
        setIsOpen(false)
    }

    const onFormSubmition = async (formData: FormData) => {
        try {
            const res = await signIn('credentials',
                {
                    username: formData.get('username'),
                    password: formData.get('password'),
                    redirect: false
                }
            )
            if (res?.error) {
                throw new Error(res?.error)
            }
            if (res?.ok) {
                closeModal();
                return;
            }

        } catch (error) {
            setErrorIsOpen(true);
            setErrorState(getErrorMessage(error))
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-[450px] h-[350px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <form className='h-full flex flex-col ' action={onFormSubmition}>
                                    <div className=' flex justify-between items-center'>
                                        <p className=' font-bold text-3xl'>Log in</p>
                                        <div className=' p-2 rounded-full hover:bg-slate-200' onClick={() => closeModal()}>
                                            <RiCloseFill size={25} />
                                        </div>
                                    </div>
                                    <div className=' relative flex flex-col gap-5 mt-8'>
                                        <CustomUncontrolledInput
                                            title='Username'
                                            name='username'
                                            color='black'
                                            required
                                        />
                                        <CustomUncontrolledInput
                                            title='Password'
                                            name='password'
                                            color='black'
                                            type='password'
                                            required
                                        />
                                    </div>
                                    {errorIsOpen && (
                                        <div className=' text-red-400 text-sm mt-2'>
                                            {errorState}
                                        </div>
                                    )}
                                    <div className=' flex flex-auto h-full gap-3 justify-center items-end'>

                                        <CustomButton
                                            title='Sign in'
                                            type='submit'
                                        />
                                    </div>
                                    <Link
                                        href={'/registration'}
                                        className=' hover:text-gray-500'
                                        onClick={() => closeModal()}
                                    >
                                        <p className=' text-center text-sm mt-2'>Don`t have an account?</p>
                                    </Link>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}

export default LoginModal