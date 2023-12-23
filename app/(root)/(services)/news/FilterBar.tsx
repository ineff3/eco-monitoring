'use client'
import { Exo } from 'next/font/google'
import { LuSettings2 } from "react-icons/lu";
import { Switch } from '@headlessui/react'
import { useEffect, useState, Fragment } from 'react'
import { CustomButton, CustomCalendar } from "@/components";
import { Listbox, Transition } from '@headlessui/react'
import { PiMagnifyingGlass } from "react-icons/pi";
import { CompanyType, SearchParamsProps } from "@/types";
import { getCompanies } from "@/actions/basic-actions/actions";
import { parse, addDays, subDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import format from 'date-fns/format'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})
const orderOptions = ['Newer to older', 'Older to newer', 'By relevance'];


const FilterBar = ({
    searchParams
}: {
    searchParams: SearchParamsProps
}) => {
    const router = useRouter()
    const [selectedAuthors, setSelectedAuthors] = useState<AuthorType[]>([])
    const [selectedCompanies, setSelectedCompanies] = useState<CompanyType[]>([]);
    const [range, setRange] = useState([
        {
            startDate: searchParams.startDate ? parse(searchParams.startDate, 'yyyy-MM-dd', new Date()) : subDays(new Date(), 7),
            endDate: searchParams.endDate ? parse(searchParams.endDate, 'yyyy-MM-dd', new Date()) : new Date(),
            key: 'selection',
        },
    ]);
    const [selectedOption, setSelectedOption] = useState<string>(searchParams.order && orderOptions.includes(searchParams.order) ? searchParams.order : 'Newer to older');


    const addFilters = () => {
        const formattedStartDate = format(range[0].startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(range[0].endDate, 'yyyy-MM-dd');

        const queryParams = {
            order: selectedOption,
            authors: selectedAuthors.map(author => author.id).join(','),
            companies: selectedCompanies.map(company => company.id).join(','),
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        };
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        router.push(`/news?${queryString}`);
    }
    const resetFilters = () => {
        setSelectedOption('By relevance');
        setSelectedAuthors([]);
        setSelectedCompanies([]);
        setRange([
            {
                startDate: new Date(),
                endDate: addDays(new Date(), 7),
                key: 'selection',
            },
        ]);
    }

    return (
        <div className=" border border-[#d3d3d3] rounded-[20px] overflow-y-auto max-h-[80vh]  bg-white p-6 flex flex-col gap-7">
            <div className=' flex items-center justify-between'>
                <LuSettings2 size={35} />
                <div className=' relative top-[0.2rem] font-bold text-3xl md:text-3xl tracking-wider'>
                    FILTER
                </div>
            </div>
            <div className=" flex flex-col items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
                <CustomCalendar
                    range={range}
                    setRange={setRange}
                />
            </div>
            <OrderFilter
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <AuthorshipFilter
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
            />
            <CompanyMentionedFilter
                selectedCompanies={selectedCompanies}
                setSelectedCompoanies={setSelectedCompanies}
            />
            <div className=" flex justify-between">
                <CustomButton
                    title='APPLY'
                    type='submit'
                    styleType='light'
                    onClick={addFilters}
                />
                <CustomButton
                    title='RESET'
                    type='reset'
                    bgColor='bg-[#d3d3d3]'
                    styleType='light'
                    onClick={resetFilters}
                />
            </div>
        </div>
    )
}

export default FilterBar






interface OrderFilterProps {
    selectedOption: string
    setSelectedOption: (option: string) => void
}
const OrderFilter = ({ selectedOption, setSelectedOption }: OrderFilterProps) => {
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

// change for the real author type fetched
interface AuthorType {
    id: number
    name: string
}
interface AuthorshipFilterProps {
    selectedAuthors: AuthorType[]
    setSelectedAuthors: (newAuthor: any) => void
}
const AuthorshipFilter = ({ selectedAuthors, setSelectedAuthors }: AuthorshipFilterProps) => {
    const authors = [{ name: 'Aboba', id: 1 }, { name: 'Sugoma', id: 2 }, { name: 'Misungma', id: 3 }, { name: 'Misungma1', id: 4 }, { name: 'Misungma2', id: 5 }, { name: 'Misungma3', id: 6 }, { name: 'Misungma3', id: 7 }, { name: 'Misungma4', id: 8 }];
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

interface CompanyMentionedFilterProps {
    selectedCompanies: CompanyType[]
    setSelectedCompoanies: (newAuthor: any) => void
}
const CompanyMentionedFilter = ({ selectedCompanies, setSelectedCompoanies }: CompanyMentionedFilterProps) => {
    const [companies, setComapnies] = useState<CompanyType[]>([])
    useEffect(() => {
        const fetchAndSetCompanies = async () => {
            const result = await getCompanies();
            setComapnies(result)
        }
        fetchAndSetCompanies()
    }, [])
    return (
        <div className=" flex flex-col gap-3 items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" self-start text-sm">Company mentioned</p>
            <CustomMultiSelectionDropdown
                items={companies}
                selectedItems={selectedCompanies}
                setSelectedItems={setSelectedCompoanies}
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