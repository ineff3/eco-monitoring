'use client'
import { IoCalendarOutline, IoLocationOutline, IoEyeOutline } from "react-icons/io5"
import { BsBuildings } from "react-icons/bs";
import { PiFeatherLight } from "react-icons/pi";
import { Exo } from 'next/font/google'
import { LuSettings2 } from "react-icons/lu";
import { Switch } from '@headlessui/react'
import { useEffect, useState, Fragment } from 'react'
import { CircularBtn, CustomButton, CustomCalendar, CustomDropdown, CustomDropdownEnhanced, Reveal } from "@/components";
import { Listbox, Transition } from '@headlessui/react'
import { PiMagnifyingGlass } from "react-icons/pi";

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})


const NewsPage = () => {
    return (
        <div className=" w-full py-10">
            <div className=" grid grid-cols-[1fr_290px] gap-[60px] px-10">

                <div className=" flex flex-col gap-10 ">
                    <div className=" flex flex-col gap-[120px]">
                        <Reveal><NewsBlock /></Reveal>
                        <Reveal><NewsBlock /></Reveal>
                        <Reveal><NewsBlock /></Reveal>
                        <Reveal><NewsBlock /></Reveal>
                        <Reveal><NewsBlock /></Reveal>
                    </div>
                    <div className=" w-full flex flex-col items-center">
                        <button className={` max-w-fit bg-white rounded-[24px] border border-[#d3d3d3] px-20 py-2 text-lg ${exo.className} tracking-widest hover:bg-slate-200 duration-200 `}>
                            SHOW MORE
                        </button>
                        <div className=" -z-10 relative -top-[23px] w-full h-[2px] bg-[#d3d3d3]"></div>
                    </div>
                </div>

                <div>
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
        <div className="border border-[#d3d3d3] bg-white rounded-[20px] p-6 min-h-[280px] flex flex-col gap-10 justify-between hover:bg-gray-200 transition-colors duration-200">
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
                    <p className=' text-lg tracking-wider'>
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
    const [selectedAuthors, setSelectedAuthors] = useState<AuthorType[]>([])
    const authors = [{ name: 'Aboba', id: 1 }, { name: 'Sugoma', id: 2 }, { name: 'Misungma', id: 3 }, { name: 'Misungma1', id: 4 }, { name: 'Misungma2', id: 5 }, { name: 'Misungma3', id: 6 }, { name: 'Misungma3', id: 7 }, { name: 'Misungma4', id: 8 }];


    return (
        <div className=" border border-[#d3d3d3] rounded-[20px] overflow-y-auto max-h-[80vh]  bg-white p-6 flex flex-col gap-7">
            <div className=' flex items-center justify-between'>
                <LuSettings2 size={35} />
                <div className=' relative top-[0.2rem] font-bold text-3xl md:text-3xl tracking-wider'>
                    FILTER
                </div>
            </div>
            <RangeDateFilter />
            <OrderFilter />
            <AuthorshipFilter
                authors={authors}
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
            />
            <div className=" flex justify-between">
                <CustomButton
                    title='APPLY'
                    type='submit'
                    styleType='light'
                />
                <CustomButton
                    title='RESET'
                    type='reset'
                    bgColor='bg-[#d3d3d3]'
                    styleType='light'
                />
            </div>
        </div>
    )
}

const OrderFilter = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const orderOptions = ['Newer to older', 'Older to newer', 'By relevance'];

    return (
        <div className=" flex flex-col gap-3 border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" text-sm">Order</p>
            {orderOptions.map((order) => (
                <div key={order} className=" flex justify-between text-sm">
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
        <div className=" flex flex-col items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <CustomCalendar />
        </div>
    )
}
// change for the real author type fetched
interface AuthorType {
    id: number
    name: string
}
interface AuthorshipFilterProps {
    authors: AuthorType[]
    selectedAuthors: AuthorType[]
    setSelectedAuthors: (newAuthor: any) => void
}
const AuthorshipFilter = ({ authors, selectedAuthors, setSelectedAuthors }: AuthorshipFilterProps) => {

    return (
        <div className=" flex flex-col gap-3 items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" self-start text-sm">By the authorship</p>
            <CustomMultiSelectionDropdown
                items={authors}
                selectedItems={selectedAuthors}
                setSelectedItems={setSelectedAuthors}
                displayField="name"
                compareField="id"
            />
        </div>
    )
}

interface CustomMultiSelectionDropdownProps {
    items: any[]
    selectedItems: any[]
    setSelectedItems: (newItems: any[]) => void
    displayField: string
    compareField: string

}

const CustomMultiSelectionDropdown = ({ items, selectedItems, setSelectedItems, displayField, compareField }: CustomMultiSelectionDropdownProps) => {
    const [inputValue, setInputValue] = useState('')
    return (
        <Listbox value={selectedItems} onChange={setSelectedItems} multiple by={compareField}>
            <Listbox.Button className={` flex relative w-full bg-white border border-[#d3d3d3] px-3 py-2 rounded-[20px] ${selectedItems.length === 0 && ' text-[#7f7f7f]'}`}>
                {selectedItems.length === 0 ? 'Choose authors' : selectedItems.map((au) => au[displayField]).join(', ')}
            </Listbox.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Listbox.Options className='   w-[182px] bg-white border border-[#d3d3d3]  rounded-lg overflow-hidden overflow-y-auto max-h-[149px]'>
                    <div className='  flex items-center px-3 py-2 text-[14px] text-[#7f7f7f] gap-2 border-b'>
                        <PiMagnifyingGlass size={17} />
                        <input
                            type="text"
                            placeholder='Search'
                            className=' w-[120px] outline-none placeholder:text-[#7f7f7f]'
                            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                            value={inputValue}
                        />
                    </div>
                    {items.map((item) => (
                        <Listbox.Option
                            key={item[compareField]}
                            value={item}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={` px-3 py-2 text-[14px]
                                        ${selected ? 'bg-dark bg-opacity-80 text-white hover:bg-opacity-70' : 'hover:bg-gray-100'}
                                        ${item[displayField].toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
                                >
                                    {item[displayField]}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}