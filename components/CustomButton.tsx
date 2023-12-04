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
    additionalStyles?: string
    onClick?: () => void

}

const CustomButton = ({ title, type, additionalStyles, onClick }: CustomButtonProps) => {
    return (
        <button
            className={` border-[2px] border-black px-5 py-2 text-xl rounded-[10px] hover:bg-slate-200 tracking-wider ${exo.className} ${additionalStyles}`}
            type={type}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default CustomButton