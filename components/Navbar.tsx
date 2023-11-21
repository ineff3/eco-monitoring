'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { FaKhanda } from 'react-icons/fa'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbMenu2 } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { ImStatsDots } from "react-icons/im";
import { TiArrowBackOutline } from "react-icons/ti";
import Image from 'next/image'
import { PiUserCircleLight } from "react-icons/pi";

const Navbar = ({ menu, handleMenu }: { menu: boolean, handleMenu: () => void }) => {
    const [scroll, setScroll] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

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
                            <NavEndOptions handleSearchOpen={handleSearchOpen} />
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
    return (
        <div>
            <PiUserCircleLight size={50} />
        </div>
    )
}

const NavLinks = () => {
    const pathname = usePathname();

    const inactiveLinkStyles = 'flex items-center  gap-2 lg:gap-3 py-2 lg:py-3 px-2 lg:px-3 text-lg lg:text-lg';
    const activeLinkStyles = ' bg-secondary text-primary duration-300 transition-all ease-in-out rounded-2xl md:scale-110' + ' ' + inactiveLinkStyles;
    const inactiveHoverStyles = ' hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-2xl';

    return (
        <aside className=' flex flex-auto lg:flex-grow-0 flex-col lg:flex-row gap-2 lg:gap-3 items-start lg:items-center'>
            <nav className='w-full lg:w-auto' >
                <Link className={pathname === '/news' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <div className='hidden lg:flex' ><PiNewspaperClippingBold size={25} /></div>
                    <span className=' relative top-[0.2rem]'>News</span>
                </Link>
            </nav>
            <div className='lg:hidden border border-b-black border-opacity-40  w-full '></div>
            <nav className='w-full lg:w-auto' >
                <Link className={pathname === '/passports' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <div className='hidden lg:flex'><ImStatsDots size={20} /></div>
                    <span className=' relative top-[0.2rem]'>Passports</span>
                </Link>
            </nav>
            <div className='lg:hidden border border-b-black border-opacity-40  w-full '></div>
            <nav className='w-full lg:w-auto' >
                <Link className={pathname === '/info' ? activeLinkStyles : inactiveLinkStyles + inactiveHoverStyles} href={'/'}>
                    <div className='hidden lg:flex'><TiArrowBackOutline size={25} /></div>
                    <span className=' relative top-[0.2rem]'>Learn more</span>
                </Link>
            </nav>
            <div className='lg:hidden border border-b-black border-opacity-40 w-full '></div>
        </aside>
    )
}

const NavEndOptions = ({ handleSearchOpen }: { handleSearchOpen: () => void }) => {
    return (
        <div className=' flex items-center gap-4'>
            <div className='flex p-2 md:hidden' onClick={handleSearchOpen}>
                <FaMagnifyingGlass size={22} />
            </div>
            <div className=' bg-dark bg-opacity-80 text-white px-6 py-2 rounded-lg'>
                <span className=' relative top-[0.08rem]'>Sign In</span>
            </div>
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
                        className=' bg-transparent outline-none w-full font-mono'
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


