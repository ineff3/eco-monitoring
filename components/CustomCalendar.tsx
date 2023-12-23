'use client'
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import { Exo } from 'next/font/google'
import { BsDashLg } from "react-icons/bs";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})
interface CalendarRangeType {
    startDate: Date;
    endDate: Date;
    key: string;
}
interface Props {
    range: CalendarRangeType[]
    setRange: any
}

const DateRangeComp = ({ range, setRange }: Props) => {

    // date state
    // const [range, setRange] = useState([
    //     {
    //         startDate: new Date() as Date,
    //         endDate: addDays(new Date(), 7) as Date,
    //         key: 'selection'
    //     }
    // ])
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
        <div className={` w-full relative ${exo.className}`} ref={refOne}>
            <div className=' flex justify-between'>
                <div>From</div>
                <div className=' relative -left-[60px]'>To</div>
            </div>
            <div
                onClick={() => setOpen(!open)}
                className=" flex justify-between items-center outline-none py-1 bg-[#f0f0f0] hover:text-gray-500 " >
                <div>{format(range[0].startDate, "MM.dd.yyyy")}</div>
                <BsDashLg />
                <div>{format(range[0].endDate, "MM.dd.yyyy")}</div>
                {/* {`${format(range[0].startDate, "MM.dd.yyyy")} - ${format(range[0].endDate, "MM.dd.yyyy")}`} */}
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
                        className="fixed z-50 left-[65%]"
                    />
                }
            </div>
        </div>
    )
}

export default DateRangeComp