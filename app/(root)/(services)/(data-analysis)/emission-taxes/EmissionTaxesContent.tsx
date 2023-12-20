'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { CustomButton, CustomDropdown, CustomDropdownEnhanced, ErrorToast, FactorBlock, SuccessfulToast } from '@/components';
import { CompanyType, PassportType } from '@/types';
import { getPassportsByCompanyId } from '@/actions/basic-actions/actions';
import { CompensationFactorsSchema } from '@/schemas';
import { ZodIssue } from 'zod';
import { toast } from 'react-hot-toast';
import EmissionBarchart from './EmissionBarchart';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})
// interface EmissionType {
//     at: string,
//     wt: string,
//     wdt: string,
//     rat: string
//     trat: string
// }
interface Props {
    companies: CompanyType[]
}

const EmissionTaxesContent = ({ companies }: Props) => {
    // const [emissionData, setEmissionData] = useState<EmissionType>({
    //     at: '',
    //     wt: '',
    //     wdt: '',
    //     rat: '',
    //     trat: ''
    // })
    const [resultTaxes, setResultTaxes] = useState({
        air: '',
        water: '',
        disposalWastes: '',
        tadioactive: '',
        tempRadioactive: ''
    })
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const [selectedPassport, setSelectedPassport] = useState<PassportType | null>(null);
    const [selectedTaxYear, setSelectedTaxYear] = useState('')
    const [possiblePassports, setPossiblePassports] = useState([])
    const [possibleTaxYears, setPossibleTaxYears] = useState([])

    //cleares the selectedPassport and possibleSubstances and fetches possiblePassports when company changes
    useEffect(() => {
        setSelectedPassport(null)

        const fetchAndSetPossiblePassports = async () => {
            if (selectedCompany !== null) {
                const result = await getPassportsByCompanyId(selectedCompany?.id) as any;
                setPossiblePassports(result)
            }
        }
        fetchAndSetPossiblePassports();
    }, [selectedCompany])

    //cleares selectedSubstance and fetches possibleSubstances when passport changes
    useEffect(() => {
        // const fetchAndSetPossibleSubstances = async () => {
        //     if (selectedPassport !== null) {
        //         const result = await getPollutionsByPassportId(selectedPassport?.id) as any
        //         setPossibleSubstances(result)
        //     }
        // }
        // fetchAndSetPossibleSubstances();
    }, [selectedPassport])


    // const handleEmissionFactorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmissionData({
    //         ...emissionData,
    //         [e.target.name]: e.target.value
    //     })

    // }
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
    const handleSchemaIssues = (errors: ZodIssue[]) => {
        let errorMessage = '';
        errors.forEach((err) => {
            errorMessage += err.path[0] + ': ' + err.message + '. '
        })
        toast.custom((t) => <ErrorToast t={t} message={errorMessage} />);
    }
    const resetAllSelectedFields = () => {
        setSelectedCompany(null)
        setPossiblePassports([])
        setPossibleTaxYears([])
        // setEmissionData({
        //     at: '',
        //     wt: '',
        //     wdt: '',
        //     rat: '',
        //     trat: ''
        // })
    }
    return (
        <div className={`w-full flex flex-col gap-6 py-5 sm:py-12 px-4 sm:px-10`}>
            <form>
                <div className=' grid grid-rows-[repeat(auto-fill,minmax(210px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-5'>
                    <>
                        {/* <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='money'
                            tagName='AT'
                            desc='Tax rate for emissions into the atmosphere'
                            quantity='UAH'
                            name='at'
                            handleChange={handleEmissionFactorsChange}
                            value={emissionData.at}
                            validation={positiveNumberValidation}
                        />
                        <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='money'
                            tagName='WT'
                            desc='Tax rate for emissions into the atmosphere'
                            quantity='UAH'
                            name='wt'
                            handleChange={handleEmissionFactorsChange}
                            value={emissionData.wt}
                            validation={positiveNumberValidation}
                        />
                        <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='money'
                            tagName='WDT'
                            desc='Tax rate for waste storage'
                            quantity='UAH'
                            name='wdt'
                            handleChange={handleEmissionFactorsChange}
                            value={emissionData.wdt}
                            validation={positiveNumberValidation}
                        />
                        <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='money'
                            tagName='RaT'
                            desc='Tax rate for radioactive substances emissions'
                            quantity='UAH'
                            name='rat'
                            handleChange={handleEmissionFactorsChange}
                            value={emissionData.rat}
                            validation={positiveNumberValidation}
                        />
                        <FactorBlock
                            pathToIcon='/factor-icons/salary.png'
                            altText='money'
                            tagName='TRaT'
                            desc='Tax rate for temporary disposal of radioactive substances'
                            quantity='UAH'
                            name='trat'
                            handleChange={handleEmissionFactorsChange}
                            value={emissionData.trat}
                            validation={positiveNumberValidation}
                        /> */}
                    </>

                    <div className=' flex flex-col gap-8 min-h-[390px] bg-white border border-[#d3d3d3] rounded-[20px] p-6 row-span-2 col-span-full xl:col-span-2'>
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
                        <div className=' flex flex-col flex-auto gap-4 lg:gap-0  justify-between items-center '>

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
                                    items={possibleTaxYears}
                                    selected={selectedTaxYear}
                                    setSelected={setSelectedTaxYear}

                                />
                            </div>
                            <div className=' lg:self-start'>
                                <CustomButton
                                    title='RESET'
                                    type='reset'
                                    onClick={resetAllSelectedFields}
                                />
                            </div>

                        </div>
                    </div>

                    <div className=' bg-white border border-[#d3d3d3] rounded-[20px] p-6 flex flex-col row-span-2 col-span-full xl:col-span-3'>
                        <div className=' flex flex-col gap-5 md:gap-8 flex-auto '>
                            <div className=' flex items-center justify-between'>
                                <Image
                                    src='/factor-icons/paper.png'
                                    alt='Setting'
                                    width={43}
                                    height={43}
                                    quality={100}
                                />
                                <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider border border-[#d3d3d3] bg-primary rounded-[10px] px-3 pb-[0.1rem] pt-[0.3rem]'>TAX</div>
                            </div>
                            <div className={` h-[290px] `}>
                                <EmissionBarchart
                                    dataValues={[8500, 5200, 7100, 9100, 5000]}
                                />
                            </div>
                            <div className=' flex flex-col gap-8 flex-auto'>
                                {/* <div className=' flex flex-col gap-2'>
                                    <p className=' text-sm'>Amounts of compensation required to be paid</p>
                                    <div className=' flex flex-wrap gap-2 items-center'>
                                        <p className={`text-xl font-light break-words ${exo.className}`}>{results.compensation}</p>
                                        <div className={` text-[#7f7f7f] ${results.compensation ? 'block' : 'hidden'}`}>UAH</div>
                                    </div>
                                </div> */}
                                <div className=' flex flex-auto items-end self-end'>
                                    <CustomButton
                                        title='CALCULATE'
                                        type='submit'
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default EmissionTaxesContent