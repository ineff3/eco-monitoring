'use client';
import { signIn } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'

import React from 'react'
import { CustomButton } from '.';

interface LoginModalProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {



    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
            if (res?.ok) {
                closeModal();
                return;
            }
            if (res?.error) {
                throw new Error(res?.error)
            }

        } catch (error) {
            console.log(error)
        }
    }
    // async () => {
    //     const res = await signIn('credentials', { username: 'sugoma', password: 'kruchniegay28', redirect: false, callbackUrl: 'http://localhost:3000/carcinogenic-risk' })
    //     if (res?.error) {
    //         console.log(res.error)
    //     }
    // }

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
                            <Dialog.Panel className="w-full max-w-[450px] h-[320px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <form className='h-full flex flex-col ' action={onFormSubmition}>
                                    <p className=' font-bold text-3xl'>Log in</p>
                                    <div className=' relative flex flex-col gap-5 mt-5'>
                                        <input
                                            type="text"
                                            placeholder='Username'
                                            name='username'
                                            required
                                            className=' border border-black py-2 px-3 rounded-md'
                                        />
                                        <input
                                            type="password"
                                            placeholder='Password'
                                            name='password'
                                            required
                                            className=' border border-black py-2 px-3 rounded-md'
                                        />
                                    </div>
                                    {/* {errorIsOpen && (
                                        <div className=' text-red-400 text-sm mt-1'>
                                            Credentials are invalid
                                        </div>
                                    )} */}
                                    <div className=' flex flex-auto h-full gap-3 justify-center items-end'>
                                        <CustomButton
                                            title='Close'
                                            onClick={() => closeModal()}
                                        />
                                        <CustomButton
                                            title='Sign in'
                                            type='submit'
                                        />
                                    </div>
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