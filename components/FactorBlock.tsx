'use client'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { ZodTypeAny } from 'zod'

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface FactorBlockProps {
    pathToIcon: string
    altText: string
    tagName: string
    desc: string
    quantity?: string,
    name: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    validation: (inputData: string) => boolean;
}

const FactorBlock = ({ pathToIcon, altText, tagName, desc, quantity, name, value, handleChange, validation }: FactorBlockProps) => {
    const [inputData, setInputData] = useState('');

    useEffect(() => {
        setInputData(value || '');

    }, [value]);

    return (
        <div className={` min-h-[210px] h-full ${validation(inputData) ? 'bg-white' : 'bg-gray-200'} flex flex-col gap-4 p-6 rounded-[20px] border border-[#d3d3d3]`}>

            <div className=' flex justify-between items-center'>
                <Image
                    src={pathToIcon}
                    alt={altText}
                    width={55}
                    height={55}
                    quality={100}
                />
                <div className=' font-bold text-4xl tracking-wider'>{tagName}</div>
            </div>

            <div className=' text-sm'>{desc}</div>
            <div className={`flex flex-auto justify-between gap-1 items-end ${exo.className}`}>
                <span className=' block overflow-hidden'>
                    <input
                        className=' text-xl font-light bg-transparent outline-none'
                        type="text"
                        required
                        name={name}
                        onChange={(e) => {
                            setInputData(e.target.value);
                            handleChange(e);
                        }}
                        value={inputData}
                        placeholder='- - -'
                    />
                </span>
                <div className=' text-[#7f7f7f]'>{quantity}</div>
            </div>

        </div>
    )
}

export default FactorBlock;