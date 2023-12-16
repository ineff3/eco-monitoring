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

    const handleClickOutside = (event: MouseEvent) => {
        if (refOne.current && !refOne.current.contains(event.target as Node)) {
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
        <div className={` relative ${exo.className}`} ref={refOne}>
            <div
                onClick={() => setOpen(!open)}
                className=" py-3 w-[223px] px-3 outline-none bg-[#f0f0f0] hover:text-gray-500 " >
                {`${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}`}
            </div>

            <div>
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
                        className="fixed z-50 right-[340px]"
                    />
                }
            </div>
        </div>
    )
}

export default DateRangeComp