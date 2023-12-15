'use client'
import { IoCalendarOutline, IoLocationOutline, IoEyeOutline } from "react-icons/io5"
import { BsBuildings } from "react-icons/bs";
import { PiFeatherLight } from "react-icons/pi";
import { Exo } from 'next/font/google'
import { LuSettings2 } from "react-icons/lu";
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Reveal } from "@/components";

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})


const NewsPage = () => {
    return (
        <div className=" w-full py-20">
            <div className=" grid grid-cols-[1fr_290px] gap-[60px] px-10">
                <div className=" flex flex-col gap-[120px] ">
                    <Reveal><NewsBlock /></Reveal>
                    <Reveal><NewsBlock /></Reveal>
                    <Reveal><NewsBlock /></Reveal>
                    <Reveal><NewsBlock /></Reveal>
                    <Reveal><NewsBlock /></Reveal>
                </div>
                <div className="">
                    <div className=" fixed w-[290px] ">
                        <FilterBar />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewsPage


const NewsBlock = () => {
    return (
        <div className="border border-[#d3d3d3] rounded-[20px] p-6 min-h-[280px] flex flex-col gap-10 justify-between hover:bg-gray-200 transition-colors duration-200">
            <div className=" flex font-bold text-xl sm:text-3xl tracking-[0.04rem]">
                Lorem ipum door siame...
            </div>

            <div className=" text-sm ">
                <p>Тим часом на польському кордоні триває страйк перев знаків. На польській стороні учасники
                    пікету не пропускають вантажні автомобілі з гуманітарною допомогою, які їдуть до України.
                    Загалом на ранок 20…////листопада у черзі на в'їзд стоять близько 2900 вантажівок. Найбільше
                    навпроти Краковця - 1200, навпроти Ягодина - 1100, навпроти Рави-Руської - близько 600
                    вантажівок.</p>
                <br />

                <p>Тим часом на польському кордоні триває страйк перев знаків. На польській стороні учасники
                    пікету не пропускають вантажні автомобілі з гуманітарною допомогою, які їдуть до України.
                    Загалом на ранок 20…////листопада у черзі на в'їзд стоять близько 2900 вантажівок. Найбільше
                    навпроти Краковця - 1200, навпроти Ягодина - 1100, навпроти Рави-Руської - близько 600
                    вантажівок.</p>
            </div>

            <div className={`flex flex-row items-end justify-between ${exo.className} text-[12px]  `} >
                <div className=" flex flex-col gap-2 justify-end">
                    <div className=" flex gap-2">
                        <IoEyeOutline size={16} />
                        <p>12 307</p>
                    </div>
                    <div className=" flex gap-2">
                        <IoCalendarOutline size={16} />
                        <p>8:41, December 1, 2023</p>
                    </div>
                </div>
                <div className=" flex flex-col justify-end border-b border-black" >
                    <p className=' text-lg'>
                        SOURCE
                    </p>
                </div>
                <div className=" flex flex-col gap-2" >
                    <div className=" flex gap-2 justify-end">
                        <p>Aboba Company</p>
                        <BsBuildings size={16} />


                    </div>
                    <div className=" flex gap-2 justify-end">
                        <p>Volyn region, Jagodzin</p>
                        <IoLocationOutline size={16} />

                    </div>
                    <div className=" flex gap-2 justify-end">
                        <p>Written by. Sugoma</p>
                        <PiFeatherLight size={16} />

                    </div>
                </div>
            </div>

        </div>
    )
}

const FilterBar = () => {
    return (
        <div className=" border border-[#d3d3d3] rounded-[20px] bg-white p-6 flex flex-col gap-7">
            <div className=' flex items-center justify-between'>
                <LuSettings2 size={42} />
                <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider'>
                    FILTER
                </div>
            </div>
            <OrderFilter />
            <RangeDateFilter />
        </div>
    )
}

const OrderFilter = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const orderOptions = ['Newer to older', 'Older to newer', 'By relevance'];

    return (
        <div className=" flex flex-col gap-3 border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p>Order</p>
            {orderOptions.map((order) => (
                <div key={order} className=" flex justify-between text-lg">
                    <CustomSwitch
                        switchValue={order}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                    <p>{order}</p>
                </div>))}
        </div>
    )
}

interface CustomSwitchProps {
    switchValue: string
    selectedOption: string | null
    setSelectedOption: (value: string) => void
}

const CustomSwitch = ({ switchValue, selectedOption, setSelectedOption }: CustomSwitchProps) => {
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        setEnabled(switchValue === selectedOption)
    }, [selectedOption])

    return (
        <Switch
            checked={enabled}
            onChange={() => {
                setEnabled(true)
                setSelectedOption(switchValue)
            }}
            className={`${enabled ? 'bg-secondary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full border border-[#d3d3d3]`}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform transition ease-in-out duration-200 rounded-full bg-white `}
            />
        </Switch>
    )
}

const RangeDateFilter = () => {
    return (
        <div className=" flex flex-col gap-3 border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <div className=" flex justify-between items-end">
                <div className=" flex flex-col">
                    <p>From</p>
                    <div className={`${exo.className}`}>12.04.2017</div>
                </div>
                <div className=" ">-</div>
                <div className=" flex flex-col">
                    <p>To</p>
                    <div className={`${exo.className}`}>10.12.2023</div>
                </div>

            </div>
        </div>
    )
}