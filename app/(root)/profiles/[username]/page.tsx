'use client'

import { NewsSection } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from 'next/image'

const UserProfilePage = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });

    return (
        <div className="w-full ">

            <div className=" w-full  mx-auto ">
                <div className=' bg-[linear-gradient(to_right,_rgb(182,_244,_146),_rgb(51,_139,_147))]'>
                    <div className='bg-primary bg-opacity-80 py-10 px-10 md:px-[100px] h-[150px] md:h-[250px]'>
                        <div className=" w-full h-full mx-auto flex justify-end items-center">
                            <p className="font-bold text-[#4e7a54] text-2xl md:text-[70px] text-opacity-30 tracking-widest uppercase unde">
                                Profile Page
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" relative w-full max-w-[1100px] mx-auto px-8">
                    <div className=" absolute -top-[40px] md:-top-[55px] inline-block bg-primary border-[3px] md:border-4 border-[#4e7a54] rounded-full p-3 md:p-5">
                        <div className=" relative w-[65px] md:w-[100px] h-[65px] md:h-[100px]">
                            <Image
                                src='/factor-icons/account.png'
                                alt='account'
                                fill
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
                <div className=" w-full bg-white h-[600px] ">
                    <div className=" w-full max-w-[1100px] mx-auto pl-[145px] md:pl-[210px] pr-12 py-3">
                        <div className="flex">
                            <div className=" flex flex-col gap-1 ">
                                <p className=" font-bold text-dark text-2xl md:text-4xl ">{session?.user.userName}</p>
                                <p className=" text-dark text-sm md:text-lg tracking-wider">{session?.user.email}</p>
                                <div className=" flex gap-4 py-3  border-t border-[#d3d3d3] ">
                                    <div className=" w-[25px] h-[25px] relative">
                                        <Image
                                            src='/socials/facebook.png'
                                            alt='account'
                                            fill
                                            quality={100}
                                        />
                                    </div>
                                    <div className=" w-[25px] h-[25px] relative">
                                        <Image
                                            src='/socials/instagram.png'
                                            alt='account'
                                            fill
                                            quality={100}
                                        />
                                    </div>
                                    <div className=" w-[25px] h-[25px] relative">
                                        <Image
                                            src='/socials/twitter.png'
                                            alt='account'
                                            fill
                                            quality={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="  w-full max-w-[1400px] mx-auto">
                        <p className=" border-b border-[#d3d3d3] text-center text-3xl tracking-wider text-gray-400 py-4">
                            YOUR POSTS
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserProfilePage

// <a target="_blank" href={`http://localhost:3001`}>
//     aboba
// </a>