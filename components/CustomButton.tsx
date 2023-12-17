'use client'
import { Exo } from 'next/font/google'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface CustomButtonProps {
    title: string
    type?: 'submit' | 'reset'
    onClick?: () => void
    styleType?: 'default' | 'light'
    bgColor?: string
}

const CustomButton = ({ title, type, onClick, bgColor = 'bg-transparent', styleType = 'default' }: CustomButtonProps) => {
    const buttonStyles = {
        default: 'border-[2px] px-5 py-2 text-xl',
        light: 'border px-4 py-2 text-lg',
    };

    return (
        <button
            className={` ${bgColor} ${buttonStyles[styleType]} border-black rounded-[10px] hover:bg-slate-200 duration-150 tracking-wider ${exo.className} `}
            type={type}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default CustomButton