'use client'
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import { Exo } from 'next/font/google'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

const DateRangeComp = () => {

    // date state
    const [range, setRange] = useState([
        {
            startDate: new Date() as Date,
            endDate: addDays(new Date(), 7) as Date,
            key: 'selection'
        }
    ])

    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle
    const refOne = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e: any) => {
        // console.log(e.key)
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e: any) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return (
        <div className={` relative ${exo.className}`}>

            <input
                value={`${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}`}
                readOnly
                className=" py-3 w-[223px] px-3 outline-none bg-[#f0f0f0] hover:text-gray-500 "
                onClick={() => setOpen(!open)}
            />

            <div ref={refOne}>
                {open &&
                    <DateRange
                        onChange={item => {
                            if (item.selection?.startDate && item.selection?.endDate) {
                                setRange([{
                                    startDate: item.selection.startDate as Date,
                                    endDate: item.selection.endDate as Date,
                                    key: 'selection'
                                }]);
                            }
                        }}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        rangeColors={['#67c9a5']}
                        direction="vertical"
                        className="absolute z-50 -top-10 right-[270px]"
                    />
                }
            </div>



        </div>
    )
}

export default DateRangeComp