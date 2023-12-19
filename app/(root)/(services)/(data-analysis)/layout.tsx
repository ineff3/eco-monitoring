'use client';
import Link from 'next/link'
import { RiArrowDownSLine } from "react-icons/ri";
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const HomeLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    return (
        <div className="  w-full flex">
            <div className="hidden lg:flex lg:fixed"><SideBar /></div>
            <div className=" w-full lg:ml-[275px]">
                <div className=" max-w-[1340px] mx-auto flex flex-auto">{children}</div>
            </div>
        </div>
    )
}

export default HomeLayout


const SideBar = () => {
    const pathname = usePathname();
    const inactiveLinkStyles = ' flex justify-between items-center hover:bg-gray-200 hover:rounded-xl py-3 px-3';
    const activeLinkStyles = ' ' + ' ' + inactiveLinkStyles;


    return (
        <div className='  flex flex-col bg-white h-screen py-8 pl-7 pr-5 w-[275px]'>

            <div className=' flex gap-3 items-center justify-center mb-12 text-2xl '>
                <Image
                    src='/header-icons/data-analysis-header.png'
                    alt='Data analysis'
                    width={30}
                    height={30}
                />
                <div>Data analysis</div>
            </div>
            <div className=' flex flex-col gap-4 text-lg'>
                <Link href={'/carcinogenic-risk'} className={pathname === '/carcinogenic-risk' ? activeLinkStyles : inactiveLinkStyles}>
                    <div className={` relative top-[0.1rem] ${pathname === '/carcinogenic-risk' && 'border-b-2 border-[#4e7a54]'}`}>
                        Carcinogenic
                    </div>
                    <RiArrowDownSLine size={27} className={` ${pathname === '/carcinogenic-risk' && ' text-[#4e7a54] rounded-full bg-primary'} -rotate-90`} />
                </Link>
                <Link href={'/non-carcinogenic-risk'} className={pathname === '/non-carcinogenic-risk' ? activeLinkStyles : inactiveLinkStyles}>
                    <div className={` relative top-[0.1rem] ${pathname === '/non-carcinogenic-risk' && 'border-b-2 border-[#4e7a54]'}`}>
                        Non-carcinogenic
                    </div>
                    <RiArrowDownSLine size={27} className={` ${pathname === '/non-carcinogenic-risk' && ' text-[#4e7a54] rounded-full bg-primary'} -rotate-90`} />
                </Link>
                <Link href={'/compensation'} className={pathname === '/compensation' ? activeLinkStyles : inactiveLinkStyles}>
                    <div className={` relative top-[0.1rem] ${pathname === '/compensation' && 'border-b-2 border-[#4e7a54]'}`}>
                        Compensation for damages
                    </div>
                    <RiArrowDownSLine size={27} className={` ${pathname === '/compensation' && ' text-[#4e7a54] rounded-full bg-primary'} -rotate-90`} />
                </Link>
            </div>

        </div>
    )
}