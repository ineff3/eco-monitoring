'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { CustomButton, CustomDropdown, CustomDropdownEnhanced, ErrorToast, FactorBlock, SuccessfulToast } from '@/components';
import { CompanyType, PassportType } from '@/types';
import { getCalculatedTaxes, getPassportsByCompanyId } from '@/actions/basic-actions/actions';
import { CompensationFactorsSchema, TaxesInputSchema } from '@/schemas';
import { ZodIssue } from 'zod';
import { toast } from 'react-hot-toast';
import EmissionBarchart from './EmissionBarchart';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface Props {
    companies: CompanyType[]
    taxYears: string[]
}

const EmissionTaxesContent = ({ companies, taxYears }: Props) => {
    const [resultTaxes, setResultTaxes] = useState<number[]>([])
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const [selectedPassport, setSelectedPassport] = useState<PassportType | null>(null);
    const [selectedTaxYear, setSelectedTaxYear] = useState('')
    const [possiblePassports, setPossiblePassports] = useState([])


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
        setSelectedTaxYear('')
    }
    const clientGetCalculatedTaxes = async () => {
        //client-side validation
        const result = TaxesInputSchema.safeParse({
            company_id: selectedCompany?.id,
            passport_id: selectedPassport?.id,
            year: Number(selectedTaxYear)
        });
        if (!result.success) {
            handleSchemaIssues(result.error.issues)
            return;
        }

        //server response + error handling
        const response = await getCalculatedTaxes(result.data);
        if (response && typeof response === 'object' && 'error' in response) {
            toast.custom((t) => <ErrorToast t={t} message={response.error} />);
        } else {
            setResultTaxes(response)
            toast.custom((t) => <SuccessfulToast t={t} message='Emission taxes successfuly calculated' />, { duration: 1000 });
        }
    }
    return (
        <div className={`w-full flex flex-col gap-6 py-5 sm:py-12 px-4 sm:px-10`}>
            <form action={clientGetCalculatedTaxes}>
                <div className=' grid grid-rows-[repeat(auto-fill,minmax(210px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-5'>

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
                                    Taxes
                                </p>
                                <CustomDropdown
                                    items={taxYears}
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
                                    dataValues={resultTaxes}
                                />
                            </div>
                            <div className=' flex justify-between flex-auto'>
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-sm'>Sum of all taxes per substance</p>
                                    <div className=' flex flex-wrap gap-2 items-center'>
                                        <p className={`text-xl font-light break-words ${exo.className}`}>
                                            {resultTaxes.reduce((acc, tax) => acc + tax, 0).toFixed(2)}
                                        </p>
                                        <div className={` relative top-[0.1rem] text-[#7f7f7f] ${resultTaxes ? 'block' : 'hidden'}`}>UAH</div>
                                    </div>
                                </div>
                                <CustomButton
                                    title='CALCULATE'
                                    type='submit'
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default EmissionTaxesContent