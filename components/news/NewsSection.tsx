import RecentNewsBarChart from "./RecentNewsBarChart"
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { Exo } from 'next/font/google'
import { CustomButton, Reveal } from "..";

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})


const NewsSection = () => {
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
                            <div className=" h-[300px] hidden sm:block"><RecentNewsBarChart /></div>
                            <div className=" flex ">
                                <CustomButton
                                    title="Read more..."
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal>
                    <NewsBlock />
                </Reveal>
                <Reveal>
                    <NewsBlock />
                </Reveal>
                <Reveal>
                    <NewsBlock />
                </Reveal>
                <Reveal>
                    <NewsBlock />
                </Reveal>

            </div>

        </div>
    )
}

export default NewsSection

const NewsBlock = () => {
    return (
        <div className="border border-[#d3d3d3] rounded-[20px] p-6 min-h-[280px] flex flex-col justify-between hover:bg-gray-200 transition-colors duration-200">
            <div className=" flex font-bold text-xl sm:text-3xl tracking-[0.04rem]">
                Lorem ipum door siame...
            </div>
            <div className=" text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia officia nostrum illo consectetur! Voluptates tempora architecto consequuntur illum aliquid sint ipsa alias laboriosam odit, esse omnis suscipit nisi voluptatum atque aliquam, consequatur unde laudantium nulla.
            </div>
            <div className={`flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between ${exo.className} text-[12px]`} >
                <div className=" flex gap-2">
                    <IoCalendarOutline size={16} />
                    <p>8:41, December 1, 2023</p>
                </div>
                <div className=" flex gap-2">
                    <IoLocationOutline size={16} />
                    <p>Volyn region, Jagodzin</p>

                </div>

            </div>

        </div>
    )
}