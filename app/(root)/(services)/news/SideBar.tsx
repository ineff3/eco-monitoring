'use client';
import Image from 'next/image'
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { Disclosure, Transition } from '@headlessui/react'
import { RiArrowDownSLine } from "react-icons/ri";


const SideBar = () => {
    return (
        <div className='  flex flex-col items-center bg-white h-screen overflow-y-auto pt-8 pb-[120px] px-7 w-[320px]'>

            <div className=' flex gap-3 items-center  mb-12 text-2xl '>
                <Image
                    src='/factor-icons/news.png'
                    alt='News'
                    width={49}
                    height={49}
                    quality={100}
                />
                <div>News</div>
            </div>
            <div className=' w-full flex flex-col gap-8'>

                <div className=' flex items-center justify-between border border-[#d3d3d3] rounded-[10px] bg-white py-2.5 px-5'>
                    <input
                        placeholder='Search region'
                        className=' outline-none w-full'
                        type="text"
                    />
                    <PiMagnifyingGlassLight size={20} />
                </div>
                <div className=' flex flex-col gap-3 '>
                    <NewsDisclosure title='Volyn' />
                    <NewsDisclosure title='Kyiv Region' />
                    <NewsDisclosure title='Ivano-Frankiv Region' />
                </div>
            </div>

        </div>
    )
}
export default SideBar;

interface NewsDisclosureProps {
    title: string
}

const NewsDisclosure = ({ title }: NewsDisclosureProps) => {
    return (
        <div className="mx-auto w-full max-w-md flex flex-col ">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between text-xl">
                            <span>{title}</span>
                            <RiArrowDownSLine
                                className={`${open ? 'rotate-180 transform' : ''
                                    }  `}
                                size={30}
                            />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className=" flex flex-col gap-3 bg-[#f0f0f0] rounded-[10px] mt-3 mb-5 px-3 py-3 text-sm  ">
                                <DisclosureTopic />
                                <DisclosureTopic />
                                <DisclosureTopic />
                                <DisclosureTopic />
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>

        </div>
    )
}

const DisclosureTopic = () => {
    return (
        <div className=' flex gap-3 items-center hover:text-gray-500'>
            <div>
                <div className=' bg-primary w-[12px] h-[12px] rounded-full'></div>
            </div>
            <p>Тим часом на польському кордоні триває страйк перевізників. На польській стороні</p>
        </div>
    )
}