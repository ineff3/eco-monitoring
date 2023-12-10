import { CustomButton, CustomUncontrolledInput } from '@/components'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className=' h-screen w-screen flex items-center justify-center px-5'>
            <div className=' max-w-[525px] h-[600px] w-full bg-white border border-[#d3d3d3] rounded-2xl px-4 py-8 sm:px-8'>
                <form className=' h-full flex flex-col'>
                    <div className=' text-center text-3xl font-bold '>CREATE ACCOUNT</div>
                    <div className=' flex flex-col mt-10 gap-5'>
                        <CustomUncontrolledInput
                            title='Username'
                            name='username'
                            color='black'
                            required
                        />
                        <CustomUncontrolledInput
                            title='Email'
                            name='email'
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
                        <CustomUncontrolledInput
                            title='Repeat your password'
                            name='password-repeat'
                            color='black'
                            type='password'
                            required
                        />
                    </div>
                    <div className=' flex gap-2 mt-4'>
                        <input type="checkbox" />
                        <p>I agree all statements in <span className=' text-sm font-bold underline'>Terms of service</span></p>
                    </div>
                    <div className=' flex justify-center mt-7'>
                        <CustomButton
                            title='SIGN UP'
                            type='submit'
                        />
                    </div>
                    <div className=' flex flex-auto justify-center items-end'>
                        <div>Have already an account?
                            <Link href="/?loginModal=true">
                                <span className=' text-sm font-bold underline'>Login here</span>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage