'use client';
import { Exo } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { PiMagnifyingGlass } from "react-icons/pi";

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface CustomDropdownEnhancedProps {
    items: any[]
    selected: any
    setSelected: (selected: any) => void
    displayField: string
    roundedBg?: string
    paddingY?: string
}

const CustomDropdownEnhanced = ({ items, selected, setSelected, roundedBg = 'rounded-[8px]', paddingY = 'py-2', displayField }
    : CustomDropdownEnhancedProps
) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`flex flex-col w-[200px] relative ${exo.className} `} ref={dropdownRef}>
            <div
                className={` flex items-center justify-between bg-white border border-[#d3d3d3] pl-3 pr-2 ${paddingY} ${roundedBg}`}
                onClick={() => setOpen(!open)}
            >
                <div className={` text-[16px] ${!selected && 'text-[#7f7f7f]'}`}>
                    {selected ?
                        selected[displayField]?.length > 20 ? selected[displayField]?.substring(0, 15) + '...' : selected[displayField]
                        : 'Select item'}
                </div>
                <RiArrowDownSLine size={25} className={` ${open && 'rotate-180'}`} />
            </div>
            <ul className={` bg-white w-[200px] border border-[#d3d3d3] max-h-[243px] overflow-y-auto ${!open ? 'hidden' : 'absolute top-[52px]'} z-10 shadow-xl rounded-lg`}>
                <div className='  flex items-center pl-3 pr-3 py-2 text-[14px] text-[#7f7f7f] gap-2 border-b'>
                    <PiMagnifyingGlass size={17} />
                    <input
                        type="text"
                        placeholder='Search'
                        className=' outline-none placeholder:text-[#7f7f7f]'
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        value={inputValue}
                    />
                </div>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`  pl-3 pr-3 py-2 text-[14px]  ${selected && String(selected[displayField])?.toLowerCase() === String(item[displayField]).toLowerCase() ? 'bg-dark bg-opacity-80 text-white' : 'hover:bg-gray-100'} ${String(item[displayField]).toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
                        onClick={() => {
                            if (selected) {
                                if (String(item[displayField]).toLocaleLowerCase() !== String(selected[displayField])?.toLocaleLowerCase()) {
                                    setSelected(item)
                                    setOpen(!open)
                                    setInputValue('')
                                }
                            } else {
                                setSelected(item)
                                setOpen(!open)
                                setInputValue('')
                            }
                        }}
                    >
                        {item[displayField]}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default CustomDropdownEnhanced;