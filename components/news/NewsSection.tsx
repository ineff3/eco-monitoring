'use client'
import RecentNewsBarChart from "./RecentNewsBarChart"
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { Exo } from 'next/font/google'
import { CustomButton, Reveal } from "..";
import { useEffect, useState } from "react";
import { getActiveRegions, getNewsForHomePage } from "@/actions/basic-actions/actions";
import { ActiveRegionType, NewsType } from "@/types";
import { format, parseISO } from 'date-fns';
import Link from 'next/link'
import { useRouter } from "next/navigation";

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})


const NewsSection = () => {
    const [news, setNews] = useState<NewsType[]>([])
    const [activeRegions, setActiveRegions] = useState<ActiveRegionType[]>([])

    useEffect(() => {
        const fetchNews = async (numberOfNews: number) => {
            const response = await getNewsForHomePage(numberOfNews)
            setNews(response.selectedNews)
        }
        const fetchActiveRegions = async (numberOfRegions: number) => {
            const response = await getActiveRegions(numberOfRegions)
            setActiveRegions(response)
        }
        fetchNews(4)
        fetchActiveRegions(4)
    }, [])

    return (
        <div className=" max-w-[1500px] px-3 sm:px-10 mx-auto w-full my-20 ">
            <div className=" grid grid-rows-[repeat(auto-fill,minmax(210px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-5 sm:gap-8">
                <div className=" row-span-2">
                    <Reveal width="100%" height="100%">
                        <div className=" h-full border border-[#d3d3d3] rounded-[20px] p-6 bg-white flex flex-col justify-between">
                            <div className=" flex justify-between">
                                <p className=" relative top-[0.2rem] font-bold text-[22px] sm:text-4xl tracking-wider">
                                    RECENT NEWS
                                </p>
                                <div className={`  font-bold ${exo.className} border border-[#d3d3d3] bg-primary rounded-[10px] px-1 sm:px-4 flex items-center text-dark text-xl tracking-widest `}>+10</div>
                            </div>
                            <p className=" text-sm">The most active regions of Ukraine over the past 24 hours</p>
                            <div className=" h-[300px] hidden sm:block">
                                <RecentNewsBarChart
                                    labels={activeRegions.map((region) => region.name)}
                                    values={activeRegions.map((region) => region.count)}
                                />
                            </div>
                            <div className=" flex ">
                                <Link href={'/news?order=Newer%20to%20older'}>
                                    <CustomButton
                                        title="Read more..."
                                    />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {news.map((item) => (
                    <Reveal key={item.id}>
                        <NewsBlock
                            id={item.id}
                            title={item.title}
                            body={item.body}
                            post_date={item.post_date}
                            region_names={item.region_names}

                        />
                    </Reveal>
                ))}

            </div>

        </div>
    )
}

export default NewsSection
interface NewsBlockProps {
    id: number
    title: string
    body: string
    post_date: string
    region_names: string
}

const NewsBlock = ({ id, title, body, post_date, region_names }: NewsBlockProps) => {
    const router = useRouter()
    const addSelectedNewsFilter = () => {
        router.push(`/news?order=Newer%20to%20older&selectedNewsId=${id}`);
    }
    //formatting date
    const parsedDate = parseISO(post_date);
    const formattedDate = format(parsedDate, "h:mm, MMMM d, yyyy");

    const formatInputStringAddingSpace = (items: string) => {
        return items
            .split(',')
            .map(item => item.trim())
            .join(', ');
    }

    //formatting regions
    let formattedRegions = ''
    if (region_names) {
        formattedRegions = formatInputStringAddingSpace(region_names)
    }
    return (
        <div className="border bg-white border-[#d3d3d3] rounded-[20px] p-6 min-h-[280px] flex flex-col justify-between hover:bg-gray-200 transition-colors duration-200"
            onClick={addSelectedNewsFilter}
        >
            <div className=" flex font-bold text-xl sm:text-3xl tracking-[0.04rem]">
                {title.length > 20 ? title.substring(0, 22) + '...' : title}
            </div>
            <div className=" text-sm whitespace-pre-line">
                {body.length > 300 ? body.substring(0, 300) + '...' : body}
            </div>
            <div className={`flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between ${exo.className} text-[12px]`} >
                <div className=" flex gap-2">
                    <IoCalendarOutline size={16} />
                    <p>{formattedDate}</p>
                </div>
                <div className=" flex gap-2">
                    <IoLocationOutline size={16} />
                    <p>{formattedRegions}</p>

                </div>

            </div>

        </div>
    )
}