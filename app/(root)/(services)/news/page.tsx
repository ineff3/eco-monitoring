
import { Exo } from 'next/font/google'
import { Reveal } from "@/components";
import FilterBar from "./FilterBar";
import InfiniteScrollNews from './InfiniteScrollNews';
import { getFilteredNews } from '@/actions/basic-actions/actions';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})


const NewsPage = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const response = await getFilteredNews();
    const news = response.selectedNews;
    const isEnd = response.isItEnd


    return (
        <div className=" w-full py-10">
            <div className=" grid grid-cols-[1fr_290px] gap-[60px] px-10">

                <InfiniteScrollNews
                    initialNews={news}
                    initialIsEnd={isEnd}
                />

                <div>
                    <div className=" fixed w-[290px] ">
                        <FilterBar
                            searchParams={searchParams as any}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewsPage



