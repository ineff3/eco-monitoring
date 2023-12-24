'use client'
import { IoCalendarOutline, IoLocationOutline, IoEyeOutline } from "react-icons/io5"
import { BsBuildings } from "react-icons/bs";
import { PiFeatherLight } from "react-icons/pi";
import { Exo } from 'next/font/google'
import { Reveal } from "@/components";
import { NewsType, SearchParamsProps } from "@/types";
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { getFilteredNews } from "@/actions/basic-actions/actions";
import { useInView } from "react-intersection-observer";
import Image from 'next/image'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

const InfiniteScrollNews = ({
    initialNews,
    initialIsEnd,
    searchParams
}: {
    initialNews: NewsType[]
    initialIsEnd: boolean
    searchParams: SearchParamsProps
}) => {
    const [news, setNews] = useState(initialNews)
    const [page, setPage] = useState(0)
    const [ref, inView] = useInView()
    const [isEnd, setIsEnd] = useState(initialIsEnd)

    const loadMoreNews = async () => {
        const nextPage = page + 1;
        const response = (await getFilteredNews(nextPage, searchParams))
        const fetchedNews = response.selectedNews;
        if (response.isItEnd) {
            setIsEnd(true)
        }
        if (fetchedNews?.length) {
            setPage(nextPage)
            setNews((prev) => [
                ...(prev?.length ? prev : []),
                ...fetchedNews
            ])
        }
    }

    useEffect(() => {
        if (inView && !isEnd) {
            loadMoreNews()
        }
    }, [inView])


    return (
        <div className=" flex flex-col gap-10 ">
            <div className=" flex flex-col gap-[120px]">
                <div className={`${initialNews?.length ? 'hidden' : 'block'}`}>
                    <Reveal width="100%">
                        <div className={`border border-[#d3d3d3] bg-white rounded-[20px] p-6 min-h-[230px] flex flex-col gap-10 items-center`}>
                            <div className=" flex w-full justify-between items-center">
                                <Image
                                    src='/no-results.png'
                                    alt='not-results'
                                    width={55}
                                    height={55}
                                    quality={100}
                                />
                                <div className=" flex font-bold text-xl sm:text-3xl tracking-[0.04rem] uppercase">
                                    Nothing was found
                                </div>
                            </div>
                            <div className=" mt-10 text-gray-400">
                                Try changing filters or selecting a different date
                            </div>
                        </div>
                    </Reveal>
                </div>
                {news.map((curNews, index) => (
                    Number(searchParams?.selectedNewsId) === curNews.id && index > 0 ? <></> : <Reveal key={curNews.id}>
                        <NewsBlock
                            title={curNews.title}
                            body={curNews.body}
                            post_date={curNews.post_date}
                            source_url={curNews.source_url}
                            authors={curNews.authors}
                            likes={curNews.likes}
                            company_names={curNews.company_names}
                            region_names={curNews.region_names}
                        />
                    </Reveal>
                ))}
            </div>
            {/* <div className=" w-full flex flex-col items-center">
                <button className={` max-w-fit bg-white rounded-[24px] border border-[#d3d3d3] px-20 py-2 text-lg ${exo.className} tracking-widest hover:bg-slate-200 duration-200 `}>
                    SHOW MORE
                </button>
                <div className=" -z-10 relative -top-[23px] w-full h-[2px] bg-[#d3d3d3]"></div>
            </div> */}

            {/* loading spinner */}
            <div
                ref={ref}
                className={`col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4
                ${isEnd ? 'hidden' : 'flex'}`}
            >
                <svg
                    aria-hidden='true'
                    className='h-10 w-10 animate-spin fill-secondary text-gray-200 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                    />
                    <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                    />
                </svg>
                <span className='sr-only'>Loading...</span>
            </div>
        </div>
    )
}

export default InfiniteScrollNews


interface NewsBlockProps {
    title: string
    body: string
    post_date: string
    source_url: string
    authors: string
    likes: number
    company_names: string
    region_names: string
}
const NewsBlock = ({ title, body, post_date, source_url, authors, likes, company_names, region_names }: NewsBlockProps) => {
    //formatting date
    const parsedDate = parseISO(post_date);
    const formattedDate = format(parsedDate, "h:mm, MMMM d, yyyy");

    const formatInputStringAddingSpace = (items: string) => {
        return items
            .split(',')
            .map(item => item.trim())
            .join(', ');
    }
    //formatting authors
    let formattedAuthors = '';
    if (authors) {
        formattedAuthors = formatInputStringAddingSpace(authors)
    }

    //formatting authors
    let formattedCompanies = '';
    if (company_names) {
        formattedCompanies = formatInputStringAddingSpace(company_names)
    }

    //formatting regions
    let formattedRegions = ''
    if (region_names) {
        formattedRegions = formatInputStringAddingSpace(region_names)
    }

    return (
        <div className="border border-[#d3d3d3] bg-white rounded-[20px] p-6 min-h-[280px] flex flex-col gap-10 justify-between">
            <div className=" flex font-bold text-xl sm:text-3xl tracking-[0.04rem]">
                {title}
            </div>

            <div className=" text-sm whitespace-pre-line ">
                {body}
            </div>

            <div className={`flex flex-row items-end justify-between ${exo.className} text-[12px]  `} >
                <div className=" flex flex-col gap-2 justify-end">
                    <div className=" flex gap-2">
                        <IoEyeOutline size={16} />
                        <p>{likes}</p>
                    </div>
                    <div className=" flex gap-2">
                        <IoCalendarOutline size={16} />
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div className=" flex flex-col justify-end border-b border-black hover:text-gray-400 hover:border-gray-400" >
                    <a
                        target="_blank"
                        href={source_url}
                        className=' text-lg tracking-wider '
                    >
                        SOURCE
                    </a>
                </div>
                <div className=" flex flex-col gap-2" >
                    <div className=" flex gap-2 justify-end items-center max-w-[220px] text-right">
                        <p>{formattedCompanies}</p>
                        <div className=' flex w-[16px] h-[16px]'><BsBuildings size={16} /></div>
                    </div>
                    <div className=" flex gap-2 justify-end items-center max-w-[220px] text-right">
                        <p>{formattedRegions}</p>
                        <div className=' flex w-[16px] h-[16px]'><IoLocationOutline size={16} /></div>

                    </div>
                    <div className=" flex gap-2 justify-end items-center max-w-[220px] text-right">
                        <p className=" flex items-center">Written by. {formattedAuthors}</p>
                        <div className=' flex w-[16px] h-[16px]'><PiFeatherLight size={16} /></div>

                    </div>
                </div>
            </div>

        </div>
    )
}