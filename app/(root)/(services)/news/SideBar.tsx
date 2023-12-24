'use client';
import Image from 'next/image'
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { Disclosure, Transition } from '@headlessui/react'
import { RiArrowDownSLine } from "react-icons/ri";
import { NewsByRegoinType, NewsNarrowType } from '@/types';
import { useEffect, useState } from 'react';
import { getRegionNews } from '@/actions/basic-actions/actions';
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const [newsByRegion, setNewsByRegion] = useState<NewsByRegoinType[]>([])

    useEffect(() => {
        const getNewsByRegion = async () => {
            const result = await getRegionNews();
            setNewsByRegion(result)
        }

        getNewsByRegion()
    }, [])



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

                {/* <div className=' flex items-center justify-between border border-[#d3d3d3] rounded-[10px] bg-white py-2.5 px-5'>
                    <input
                        placeholder='Search region'
                        className=' outline-none w-full'
                        type="text"
                    />
                    <PiMagnifyingGlassLight size={20} />
                </div> */}
                <div className=' flex flex-col gap-3 '>
                    {newsByRegion.map((item, index) => (
                        <NewsDisclosure
                            title={item.region_name}
                            narrowNews={item.news}
                            key={index}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
export default SideBar;

interface NewsDisclosureProps {
    title: string
    narrowNews: NewsNarrowType[]
}

const NewsDisclosure = ({ title, narrowNews }: NewsDisclosureProps) => {
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
                                {narrowNews.map((item) => (
                                    <DisclosureTopic
                                        title={item.title}
                                        id={item.id}
                                        key={item.id}
                                    />
                                ))}
                                {/* <DisclosureTopic />
                                <DisclosureTopic />
                                <DisclosureTopic />
                                <DisclosureTopic /> */}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>

        </div>
    )
}

const DisclosureTopic = ({ title, id }: { title: string, id: number }) => {
    const router = useRouter()
    const addSelectedNewsFilter = () => {
        router.push(`/news?order=Newer%20to%20older&selectedNewsId=${id}`);
    }
    return (
        <div className=' flex gap-3 items-center hover:text-gray-500'
            onClick={addSelectedNewsFilter}
        >
            <div>
                <div className=' bg-primary w-[12px] h-[12px] rounded-full'></div>
            </div>
            <p>{title}</p>
        </div>
    )
}