'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { CustomButton, CustomDropdown, CustomDropdownEnhanced, ErrorToast, FactorBlock, SuccessfulToast } from '@/components';
import { CompanyType } from '@/types';
import { getPassportsByCompanyId } from '@/actions/basic-actions/actions';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface CompensationFactorsType {
    ca: string,
    mfr: string,
    pop: string
    ms: string
    kf: string
    time: string
    mpe: string
}
interface Props {
    companies: CompanyType[]
}
const CompensationContent = ({ companies }: Props) => {
    const [compensationData, setCompensationData] = useState<CompensationFactorsType>({
        ca: '',
        mfr: '',
        pop: '',
        ms: '',
        kf: '',
        time: '',
        mpe: ''
    })
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedPassport, setSelectedPassport] = useState('');
    const [selectedSubstance, setSelectedSubstance] = useState('');
    const [possiblePassports, setPossiblePassports] = useState([])

    useEffect(() => {
        // const passports = getPassportsByCompanyId(selectedCompany.id)
    }, [selectedCompany])

    const aboba = ['Aboba1', 'Aboba2', 'Aboba3']
    const handleCompensationFactorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompensationData({
            ...compensationData,
            [e.target.name]: e.target.value
        })

    }
    const positiveNumberValidation = (inputData: string) => {
        const numericValue = Number(inputData);
        return !isNaN(numericValue) && numericValue > 0;
    }
    const positiveNumberWithUpperLimitValidation = (upperLimit: number) => {
        return (inputData: string) => {
            const numericValue = Number(inputData);
            return !isNaN(numericValue) && numericValue > 0 && numericValue <= upperLimit;
        };
    };

    return (
        <div className={`w-full flex flex-col gap-6 py-5 sm:py-12 px-4 sm:px-10`}>
            <form>
                <div className=' grid grid-rows-[repeat(auto-fill,minmax(210px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-5'>
                    <div className=' order-1'>
                        <FactorBlock
                            pathToIcon='/factor-icons/chemistry.png'
                            altText='chemistry'
                            tagName='Ca'
                            desc='Concentration of the substance in the ambient air'
                            quantity='mg/m³'
                            name='ca'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.ca}
                            validation={positiveNumberValidation}
                        />
                    </div>
                    <div className=' order-2'>
                        <FactorBlock
                            pathToIcon='/factor-icons/chemistry.png'
                            altText='chemistry'
                            tagName='MFR'
                            desc='Approved emission standard value'
                            quantity='mg/m³'
                            name='mfr'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.mfr}
                            validation={positiveNumberValidation}
                        />
                    </div>
                    <div className=' order-3'>
                        <FactorBlock
                            pathToIcon='/factor-icons/group.png'
                            altText='population'
                            tagName='Pop'
                            desc='Number of people in the city/ urban-type settlement'
                            name='pop'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.pop}
                            validation={positiveNumberValidation}
                        />
                    </div>
                    <div className=' order-4'>
                        <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='salary'
                            tagName='MS'
                            desc='The amount of the minimum salary'
                            name='ms'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.ms}
                            validation={positiveNumberValidation}
                        />
                    </div>
                    <div className=' order-5'>
                        <FactorBlock
                            pathToIcon='/factor-icons/territory.png'
                            altText='social'
                            tagName='Kf'
                            desc='Coefficient of territorial, social and environmental features'
                            name='kf'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.kf}
                            validation={positiveNumberValidation}
                        />
                    </div>

                    <div className=' flex flex-col gap-8 bg-white border border-[#d3d3d3] rounded-[20px] p-6 row-span-2 col-span-full xl:col-span-2 order-8 1/5xl:order-6'>
                        <div className=' flex items-center justify-center sm:justify-between'>
                            <Image
                                src='/settings-icon.png'
                                alt='Setting'
                                width={50}
                                height={50}
                                className='hidden sm:block'
                            />
                            <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider text-center sm:text-baseline'>
                                DEFAULT VALUES
                            </div>
                        </div>
                        <div className=' flex flex-col flex-auto gap-4 lg:gap-0  justify-between items-center sm:px-5'>

                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    Company
                                </p>
                                <CustomDropdownEnhanced
                                    items={companies}
                                    selected={selectedCompany}
                                    setSelected={setSelectedCompany}
                                    displayField='name'
                                />
                            </div>
                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    Passport
                                </p>
                                <CustomDropdownEnhanced
                                    items={possiblePassports}
                                    selected={selectedPassport}
                                    setSelected={setSelectedPassport}
                                    displayField='year'
                                />
                            </div>
                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    Substance
                                </p>
                                <CustomDropdown
                                    items={aboba}
                                    selected={selectedSubstance}
                                    setSelected={setSelectedSubstance}
                                />
                            </div>
                            <CustomButton
                                title='RESET'
                                type='reset'
                            />

                        </div>
                    </div>

                    <div className=' order-6 1/5xl:order-7'>
                        <FactorBlock
                            pathToIcon='/factor-icons/hourglass (1).png'
                            altText='time'
                            tagName='Time'
                            desc='Operating time of the emission source'
                            name='time'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.time}
                            validation={positiveNumberWithUpperLimitValidation(8760)}
                        />
                    </div>
                    <div className=' bg-white border border-[#d3d3d3] rounded-[20px] p-6 flex flex-col row-span-2 col-span-full xl:col-span-2 order-9 1/5xl:order-8'>
                        <div className=' flex flex-col gap-5 md:gap-8 flex-auto '>
                            <div className=' flex items-center justify-between'>
                                <Image
                                    src='/factor-icons/paper.png'
                                    alt='Setting'
                                    width={43}
                                    height={43}
                                    quality={100}
                                />
                                <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider border border-[#d3d3d3] bg-primary rounded-[10px] px-3 pb-[0.1rem] pt-[0.3rem]'>COMP</div>
                            </div>
                            <div className=' flex flex-col gap-8 flex-auto'>
                                <p className=' text-sm'>Comp Amounts of compensation required to be paid 20462.5 UAH Calculate</p>
                                <div className=' flex flex-wrap gap-2 items-center'>
                                    <p className={`text-xl font-light break-words ${exo.className}`}>20462.5</p>
                                    <div className={` text-[#7f7f7f]`}>UAH</div>
                                </div>
                                <div className=' flex flex-auto items-end'>
                                    <CustomButton
                                        title='CALCULATE'
                                        type='submit'
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className=' order-7 1/5xl:order-9'>
                        <FactorBlock
                            pathToIcon='/factor-icons/performance.png'
                            altText='emission'
                            tagName='MPE'
                            desc='Maximum permissible emission'
                            name='mpe'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.mpe}
                            validation={positiveNumberValidation}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CompensationContent