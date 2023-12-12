'use client';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react';
import { TbMenu2 } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image from 'next/image'
import { RiArrowDownSLine } from "react-icons/ri";
import { signOut, useSession } from 'next-auth/react'
import LoginModal from './LoginModal';
import { Menu, Transition } from '@headlessui/react'
import { IoSettingsOutline } from "react-icons/io5"
import { PiSignOut } from "react-icons/pi";
import { useSearchParams } from 'next/navigation'


const Navbar = ({ menu, handleMenu }: { menu: boolean, handleMenu: () => void }) => {
    const [scroll, setScroll] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchParams = useSearchParams()

    const loginModal = searchParams.get('loginModal')

    const handleSearchOpen = () => {
        setSearchOpen(!searchOpen);
    }

    const handleScroll = () => {
        setScroll(window.scrollY > 0);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    if (!searchOpen) {
        return (
            <div className={!scroll ? 'sticky z-50 top-0 w-full duration-300 transition-shadow bg-white' : 'sticky z-50 top-0 w-full duration-300 transition-shadow border-b-[1px] border-gray-300 shadow-sm backdrop-blur-lg bg-opacity-90 bg-white '}>
                <div className=' max-w-[1640px] mx-auto'>
                    <div className='flex items-center px-4 py-2 sm:py-3 lg:py-4 text-dark'>
                        <div
                            onClick={handleMenu}
                            className='flex lg:hidden'
                        >
                            {!menu ? <TbMenu2 size={28} /> : <AiOutlineClose size={28} />}
                            <div className={!menu ? 'fixed left-[-100%]' : 'fixed left-0 top-20 w-full px-3 transition-all duration-300 ease-in-out'}>
                                <NavLinks />
                            </div>
                        </div>

                        <div className='hidden lg:flex'>
                            <NavLinks />
                        </div>

                        <div className='hidden md:flex md:flex-auto'>
                            <SearchBar />
                        </div>


                        <div className='flex flex-auto md:flex-grow-0 justify-end items-center md:mx-3 lg:mx-8 gap-4'>
                            <NavEndOptions handleSearchOpen={handleSearchOpen} loginModalToOpen={Boolean(loginModal)} />
                            <UserProfile />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={!scroll ? 'sticky z-50 top-0 w-full duration-300 transition-shadow' : 'sticky z-50 top-0 w-full duration-300 transition-shadow border-b-[1px] border-gray-300 shadow-sm backdrop-blur-lg bg-opacity-90 bg-white '}>
                <div className=' max-w-[1640px] mx-auto'>
                    <div className='flex items-center px-4 py-3 lg:py-5 text-gray-600'>
                        <SearchBar autofocus />
                        <div className='px-3 py-2 cursor-pointer' onClick={handleSearchOpen}>Return</div>
                    </div>
                </div>
            </div>
        )
    }



}

export default Navbar



const UserProfile = () => {
    const { data: session } = useSession();

    return (
        <>
            {session?.user && (
                <Menu as="div" className="relative flex items-center text-left">
                    <Menu.Button>
                        <div className=' p-2 rounded-full border-2 border-[#4e7a54] hover:bg-slate-200'>
                            <Image
                                src='/factor-icons/account.png'
                                alt='account'
                                width={40}
                                height={40}
                            />
                        </div>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-[230px] w-56 origin-top-right   bg-white shadow-lg ring-1 ring-black/5 focus:outline-none flex flex-col rounded-xl overflow-hidden">
                            <Menu.Item>
                                {({ active }) => (
                                    <div className=' flex flex-col items-center px-5 py-3 text-black border-b border-gray-300 '>
                                        <div>{session.user.userName}</div>
                                        <div className=' text-sm'>{session.user.email}</div>

                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={`/profiles/${session.user.userName}`}
                                        className={`${active ?
                                            'bg-dark bg-opacity-80 text-white' :
                                            'bg-white text-black'} px-4 py-2 flex gap-4 items-center`}
                                    >
                                        <IoSettingsOutline size={17} />
                                        <p className=' relative top-[0.1rem]'>Manage Account</p>
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => signOut()}
                                        className={`${active ?
                                            'bg-dark bg-opacity-80 text-white' :
                                            'bg-white text-black'} px-4 py-2 flex gap-4 items-center`}
                                    >
                                        <PiSignOut size={17} />
                                        <p className=' relative top-[0.1rem]'>Sign out</p>
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}
        </>

    )
}

const NavLinks = () => {
    const pathname = usePathname();

    const inactiveLinkStyles = 'flex items-center gap-2 py-2 lg:py-3 px-2 lg:px-2 text-lg lg:text-lg';
    const activeLinkStyles = ' bg-secondary text-primary duration-300 transition-all ease-in-out rounded-2xl md:scale-110' + ' ' + inactiveLinkStyles;
    const inactiveHoverStyles = ' hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-xl';

    return (
        <aside className=' flex flex-auto lg:flex-grow-0 flex-col lg:flex-row gap-2 lg:gap-3 items-start lg:items-center'>
            <nav className={` w-full lg:w-auto ${pathname !== '/' ? ' block' : ' hidden'}`} >
                <Link className={pathname === '/' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <Image
                        src='/header-icons/home-header.png'
                        alt='News'
                        width={23}
                        height={23}
                        className='hidden lg:block'
                    />
                    <span className=' relative top-[0.2rem]'>Home</span>
                    <RiArrowDownSLine size={25} className=' relative top-[0.1rem] lg:hidden -rotate-90' />
                </Link>
            </nav>
            <div className={`lg:hidden border border-b-black border-opacity-40  w-full ${pathname !== '/' ? ' block' : ' hidden'} `}></div>

            <nav className={` w-full lg:w-auto ${pathname !== '/news' ? ' block' : ' hidden'}`} >
                <Link className={pathname === '/news' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <Image
                        src='/header-icons/news-header.png'
                        alt='News'
                        width={20}
                        height={20}
                        className='hidden lg:block'
                    />
                    <span className=' relative top-[0.2rem]'>News</span>
                    <RiArrowDownSLine size={25} className=' relative top-[0.1rem] lg:hidden -rotate-90' />
                </Link>
            </nav>
            <div className={`lg:hidden border border-b-black border-opacity-40  w-full ${pathname !== '/news' ? ' block' : ' hidden'} `}></div>

            <nav className={` w-full lg:w-auto ${pathname !== '/passports' ? ' block' : ' hidden'}`} >
                <Link className={pathname === '/passports' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <Image
                        src='/header-icons/eco-passports.png'
                        alt='Eco passports'
                        width={20}
                        height={20}
                        className='hidden lg:block'
                    />
                    <span className=' relative top-[0.2rem]'>Ecological passports</span>
                    <RiArrowDownSLine size={25} className=' relative top-[0.1rem] lg:hidden -rotate-90' />
                </Link>
            </nav>
            <div className={`lg:hidden border border-b-black border-opacity-40  w-full ${pathname !== '/passports' ? ' block' : ' hidden'} `}></div>

            <nav className={` w-full lg:w-auto ${pathname === '/carcinogenic-risk' || pathname === '/non-carcinogenic-risk' ? ' hidden' : ' block'}`} >
                <Link className={pathname === '/info' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/carcinogenic-risk'}>
                    <Image
                        src='/header-icons/data-analysis-header.png'
                        alt='Data analysis'
                        width={23}
                        height={23}
                        className='hidden lg:block'
                    />
                    <span className=' relative top-[0.2rem]'>Data analysis</span>
                    <RiArrowDownSLine size={25} className=' relative top-[0.1rem] lg:hidden -rotate-90' />
                </Link>
            </nav>
            <div className={`lg:hidden border border-b-black border-opacity-40 w-full ${pathname === '/carcinogenic-risk' || pathname === '/non-carcinogenic-risk' ? ' hidden' : ' block'}  `}></div>
        </aside>
    )
}

interface NavSectionProps {
    title: string
    pathName: string
    iconPath: string
    iconSize: number
}

const NavSection = () => {
    const pathname = usePathname();

    const inactiveLinkStyles = 'flex items-center gap-2 py-2 lg:py-3 px-2 lg:px-2 text-lg lg:text-lg';
    const activeLinkStyles = ' bg-secondary text-primary duration-300 transition-all ease-in-out rounded-2xl md:scale-110' + ' ' + inactiveLinkStyles;
    const inactiveHoverStyles = ' hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-xl';

    return (
        <>
            <nav className={` w-full lg:w-auto ${pathname === '/carcinogenic-risk' || pathname === '/non-carcinogenic-risk' ? ' hidden' : ' block'}`} >
                <Link className={pathname === '/info' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/carcinogenic-risk'}>
                    <Image
                        src='/header-icons/data-analysis-header.png'
                        alt='Data analysis'
                        width={23}
                        height={23}
                        className='hidden lg:block'
                    />
                    <span className=' relative top-[0.2rem]'>Data analysis</span>
                    <RiArrowDownSLine size={25} className=' relative top-[0.1rem] lg:hidden -rotate-90' />
                </Link>
            </nav>
            <div className={`lg:hidden border border-b-black border-opacity-40 w-full ${pathname === '/carcinogenic-risk' || pathname === '/non-carcinogenic-risk' ? ' hidden' : ' block'}  `}></div>
        </>
    )
}

const NavEndOptions = ({ handleSearchOpen, loginModalToOpen }: { handleSearchOpen: () => void, loginModalToOpen: boolean | null }) => {
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(!!loginModalToOpen)

    return (
        <div className=' flex items-center gap-4'>
            <div className='flex p-2 md:hidden' onClick={handleSearchOpen}>
                <FaMagnifyingGlass size={22} />
            </div>
            {session?.user ? (
                <>
                    {/* <button className=' bg-dark bg-opacity-80 text-white px-6 py-2 rounded-lg' onClick={() => signOut()}>
                        <span className=' relative top-[0.08rem]'>Sign Out</span>
                    </button> */}
                </>
            ) : (
                <>
                    <button className=' bg-dark bg-opacity-80 text-white px-6 py-2 rounded-lg'
                        onClick={() => setIsModalOpen(true)}>
                        <span className=' relative top-[0.08rem]'>Sign In</span>
                    </button>
                    <LoginModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                </>
            )}


        </div>
    )
}

const SearchBar = ({ autofocus }: { autofocus?: boolean }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className=' flex flex-auto bg-secondary rounded-[19px] px-5 py-2 lg:py-3 mx-4 lg:mx-6 text-white font-medium shadow-[inset_0px_1px_5px_0px_rgba(0,0,0,0.35)]'>
            <div className='flex flex-auto items-center relative'>
                <div className='flex flex-auto'>
                    <input
                        autoFocus={autofocus}
                        name="search-bar"
                        className=' relative top-[0.1rem] text-base bg-transparent outline-none w-full placeholder:text-white'
                        type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search'

                    />
                </div>
                <div className=' absolute -right-6 -top-3 lg:-top-3.5 py-3 lg:py-3.5 px-2 lg:px-2.5 bg-white rounded-[18px] hover:scale-105 duration-200 transition-transform ease-in-out shadow-[0px_3px_10px_0px_rgba(0,0,0,0.35)]' >
                    <Image
                        src={'/search.png'}
                        alt='search'
                        width={30}
                        height={35}
                    />
                </div>
            </div>
        </div>
    )
}


