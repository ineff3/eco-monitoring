'use client'
import { Exo } from 'next/font/google'
import { LuSettings2 } from "react-icons/lu";
import { Switch } from '@headlessui/react'
import { useEffect, useState, Fragment } from 'react'
import { CustomButton, CustomCalendar } from "@/components";
import { Listbox, Transition } from '@headlessui/react'
import { PiMagnifyingGlass } from "react-icons/pi";
import { CompanyType, SearchParamsProps } from "@/types";
import { getCompanies, getNarrowCompanies, getNarrowRegions, getNarrowUsers } from "@/actions/basic-actions/actions";
import { parse, addDays, subDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import format from 'date-fns/format'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})
const orderOptions = ['Newer to older', 'Older to newer', 'By relevance'];

interface NarrowCompanyType {
    id: number
    name: string
}
interface NarrowAuthorType {
    id: string
    userName: string
}
interface NarrowRegionType {
    id: number
    name: string
}


const FilterBar = ({
    searchParams
}: {
    searchParams: SearchParamsProps
}) => {
    const router = useRouter()
    const [selectedAuthors, setSelectedAuthors] = useState<NarrowAuthorType[]>([])
    const [selectedCompanies, setSelectedCompanies] = useState<NarrowCompanyType[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<NarrowRegionType[]>([]);
    const [range, setRange] = useState([
        {
            startDate: searchParams.fromDate ? parse(searchParams.fromDate, 'yyyy-MM-dd', new Date()) : subDays(new Date(), 7),
            endDate: searchParams.toDate ? parse(searchParams.toDate, 'yyyy-MM-dd', new Date()) : new Date(),
            key: 'selection',
        },
    ]);
    const [selectedOption, setSelectedOption] = useState<string>(
        searchParams.order && orderOptions.includes(searchParams.order) ? searchParams.order : 'Newer to older'
    );
    const [authors, setAuthors] = useState<NarrowAuthorType[]>([])
    const [companies, setComapnies] = useState<NarrowCompanyType[]>([])
    const [regions, setRegions] = useState<NarrowRegionType[]>([])
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [loadingRegions, setLoadingRegions] = useState(true);

    //initially fetches companies and authors
    useEffect(() => {
        const fetchAndSetAuthors = async () => {
            const result = await getNarrowUsers();
            setAuthors(result)
            setLoadingAuthors(false);
        }
        const fetchAndSetCompanies = async () => {
            const result = await getNarrowCompanies();
            setComapnies(result)
            setLoadingCompanies(false);
        }
        const fetchAndSetRegions = async () => {
            const result = await getNarrowRegions()
            setRegions(result)
            setLoadingRegions(false)
        }
        fetchAndSetAuthors()
        fetchAndSetCompanies()
        fetchAndSetRegions()
    }, [])

    // waits until authors being fetched from the server and sets selected authors
    useEffect(() => {
        if (!loadingAuthors && searchParams?.authors) {
            const selectedAuthorIds = searchParams.authors.split(',').map(id => id.trim());
            const selectedAuthorsFromParams = authors.filter(author => selectedAuthorIds.includes(author.id));
            setSelectedAuthors(selectedAuthorsFromParams);
        }
    }, [loadingAuthors]);

    // waits until companies being fetched from the server and sets selected companies
    useEffect(() => {
        if (!loadingCompanies && searchParams?.companies) {
            const selectedCompaniesIds = searchParams.companies.split(',').map(Number);
            const selectedCompaniesFromParams = companies.filter(company => selectedCompaniesIds.includes(company.id));
            setSelectedCompanies(selectedCompaniesFromParams);
        }
    }, [loadingCompanies]);

    // waits until regions being fetched from the server and sets selected regions
    useEffect(() => {
        if (!loadingRegions && searchParams?.regions) {
            const selectedRegionsIds = searchParams.regions.split(',').map(Number);
            const selectedRegionsFromParams = regions.filter(region => selectedRegionsIds.includes(region.id));
            setSelectedRegions(selectedRegionsFromParams);
        }
    }, [loadingRegions]);




    const addFilters = () => {
        const formattedStartDate = format(range[0].startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(range[0].endDate, 'yyyy-MM-dd');

        const queryParams = {
            order: selectedOption,
            authors: selectedAuthors.map(author => author.id).join(','),
            companies: selectedCompanies.map(company => company.id).join(','),
            regions: selectedRegions.map(region => region.id).join(','),
            fromDate: formattedStartDate,
            toDate: formattedEndDate,
        };
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        router.push(`/news?${queryString}`);
    }
    const resetFilters = () => {
        setSelectedOption('Newer to older');
        setSelectedAuthors([]);
        setSelectedCompanies([]);
        setSelectedRegions([]);
        setRange([
            {
                startDate: subDays(new Date(), 7),
                endDate: new Date(),
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
                authors={authors}
            />
            <CompanyMentionedFilter
                selectedCompanies={selectedCompanies}
                setSelectedCompoanies={setSelectedCompanies}
                companies={companies}
            />
            <RegionMentionedFilter
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
                regions={regions}
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

interface AuthorshipFilterProps {
    selectedAuthors: NarrowAuthorType[]
    setSelectedAuthors: (newAuthor: any) => void
    authors: NarrowAuthorType[]
}
const AuthorshipFilter = ({ selectedAuthors, setSelectedAuthors, authors }: AuthorshipFilterProps) => {

    return (
        <div className=" flex flex-col gap-3 items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" self-start text-sm">By the authorship</p>
            <CustomMultiSelectionDropdown
                title='Choose authors'
                items={authors}
                selectedItems={selectedAuthors}
                setSelectedItems={setSelectedAuthors}
                displayField="userName"
                compareField="id"
            />
        </div>
    )
}

interface CompanyMentionedFilterProps {
    selectedCompanies: NarrowCompanyType[]
    setSelectedCompoanies: (newAuthor: any) => void
    companies: NarrowCompanyType[]
}
const CompanyMentionedFilter = ({ selectedCompanies, setSelectedCompoanies, companies }: CompanyMentionedFilterProps) => {

    return (
        <div className=" flex flex-col gap-3 items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" self-start text-sm">Company mentioned</p>
            <CustomMultiSelectionDropdown
                title='Choose companies'
                items={companies}
                selectedItems={selectedCompanies}
                setSelectedItems={setSelectedCompoanies}
                displayField="name"
                compareField="id"
            />
        </div>
    )
}

interface RegionMentionedFilterProps {
    selectedRegions: NarrowRegionType[]
    setSelectedRegions: (newAuthor: any) => void
    regions: NarrowRegionType[]
}
const RegionMentionedFilter = ({ regions, selectedRegions, setSelectedRegions }: RegionMentionedFilterProps) => {

    return (
        <div className=" flex flex-col gap-3 items-center justify-center border border-[#d3d3d3] bg-[#f0f0f0] rounded-[10px] p-3">
            <p className=" self-start text-sm">Regions mentioned</p>
            <CustomMultiSelectionDropdown
                title='Choose regions'
                items={regions}
                selectedItems={selectedRegions}
                setSelectedItems={setSelectedRegions}
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
    title: string

}
const CustomMultiSelectionDropdown = ({ title, items, selectedItems, setSelectedItems, displayField, compareField }: CustomMultiSelectionDropdownProps) => {
    const [inputValue, setInputValue] = useState('')
    return (
        <Listbox value={selectedItems} onChange={setSelectedItems} multiple by={compareField}>
            <Listbox.Button className={` flex relative w-full bg-white border border-[#d3d3d3] px-3 py-2 rounded-[20px] ${selectedItems.length === 0 && ' text-[#7f7f7f]'}`}>
                {selectedItems.length === 0 ? title : selectedItems.map((au) => au[displayField]).join(', ')}
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