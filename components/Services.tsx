import Image from 'next/image'
import Link from 'next/link'

const Services = () => {
    const blockStyles = " min-w-[250px] max-h-[220px] flex flex-col gap-3 items-center p-10 bg-secondary rounded-[35px] shadow-[10px_10px_26px_-13px_rgba(66,68,90,1)] hover:scale-105 duration-300 transition-transform ease-in-out";

    const contrastBlockStyles = "min-w-[250px] max-h-[220px] flex flex-col gap-3 items-center p-10 bg-[#367b6e] rounded-[35px] shadow-[10px_10px_26px_-13px_rgba(66,68,90,1)] text-secondary hover:scale-105 duration-300 transition-transform ease-in-out";

    return (
        <div className=" w-full text-[#367b6e]">
            <div className="h-[1300px] sm:h-[1000px] 2xl:h-[900px] relative">

                <div className=" absolute overflow-hidden bg-[url(/services-left.png)] w-[894px] h-[362px] top-0 2xl:top-[200px] -left-[600px] sm:-left-[350px] z-10 md:-left-[280px] lg:-left-48 xl:left-0">
                </div>
                <div className=" font-bold  max-w-[150px] sm:max-w-none text-xl sm:text-2xl lg:text-3xl xl:text-4xl absolute z-10 top-[175px] md:top-[190px] 2xl:top-[390px] left-[60px] sm:left-[110px] md:left-[165px]  xl:left-[200px] ">What services do we provide?</div>

                <div className="absolute overflow-hidden bg-[url(/services-right.png)] w-[300px] md:w-[600px]  lg:w-[800px] h-[790px] right-0 top-[200px] 2xl:top-[0px] ">
                </div>

                <div className=" hidden lg:flex  lg:absolute right-[220px] top-[420px] 2xl:top-[220px] z-20 ">
                    <div className=" flex flex-col gap-8">

                        <div className=" flex gap-10 font-bold text-lg ">

                            <Link className={blockStyles} href={'/carcinogenic-risk'}>
                                <Image
                                    src="/services-icons/data-analysis-icon.png"
                                    alt="Data analysis"
                                    width={100}
                                    height={100}
                                    quality={100}
                                />
                                <div className=' uppercase'>Data analysis</div>
                            </Link>

                            <div className={blockStyles}>
                                <Image
                                    src="/services-icons/env-passports-icon.png"
                                    alt="Env passports"
                                    width={100}
                                    height={100}
                                    quality={100}
                                />
                                <div className=' uppercase'>Env. passports</div>
                            </div>

                        </div>

                        <div className=" flex gap-10 font-bold text-lg ml-12">

                            <Link className={blockStyles} href={'/news?order=Newer%20to%20older'}>
                                <Image
                                    src="/services-icons/news-icon.png"
                                    alt="News"
                                    width={100}
                                    height={100}
                                    color='#2e7268'
                                    quality={100}
                                />
                                <div className=' uppercase'>News</div>
                            </Link>

                            <div className={contrastBlockStyles}>
                                <Image
                                    src="/services-icons/options-icon.png"
                                    alt="Options"
                                    width={100}
                                    height={100}
                                    color='#2e7268'
                                    quality={100}
                                />
                                <div className=' uppercase'>All services</div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className=' w-screen h-full sm:pb-[120px] px-12 flex items-end justify-center lg:hidden relative z-20'>
                    <div className=" flex flex-col gap-8">

                        <div className=" flex justify-center flex-wrap gap-10 font-bold text-lg ">

                            <Link className={blockStyles} href={'/carcinogenic-risk'}>
                                <Image
                                    src="/services-icons/data-analysis-icon.png"
                                    alt="Data analysis"
                                    width={100}
                                    height={100}
                                />
                                <div className=' uppercase'>Data analysis</div>
                            </Link>

                            <div className={blockStyles}>
                                <Image
                                    src="/services-icons/env-passports-icon.png"
                                    alt="Env passports"
                                    width={100}
                                    height={100}
                                />
                                <div className=' uppercase'>Env. passports</div>
                            </div>

                        </div>

                        <div className=" flex justify-center flex-wrap gap-10 font-bold text-lg">

                            <Link href={'/news?order=Newer%20to%20older'} className={blockStyles}>
                                <Image
                                    src="/services-icons/news-icon.png"
                                    alt="News"
                                    width={100}
                                    height={100}
                                />
                                <div className=' uppercase'>News</div>
                            </Link>

                            <div className={contrastBlockStyles}>
                                <Image
                                    src="/services-icons/options-icon.png"
                                    alt="Options"
                                    width={100}
                                    height={100}
                                />
                                <div className=' uppercase'>All services</div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Services



