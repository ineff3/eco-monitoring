'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { NonCarcinogenicDataType, PollutionType, RfcFactorType, passportsWithCompaniesType } from '@/types';
import { CustomButton, CustomDropdown, ErrorToast, FactorBlock, SuccessfulToast } from '@/components';
import { getCalculatedNonCarcinogenicRisk } from '@/actions/basic-actions/actions';
import { NonCarcinogenicFactorsSchema } from '@/schemas';
import { toast } from 'react-hot-toast';
import { ZodIssue } from 'zod';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface NonCarcinogenicRiskContentProps {
    pollutions: PollutionType[]
    rfcFactors: RfcFactorType[]
    companyNames: string[]
    passportsWithCompanies: passportsWithCompaniesType[]
    rfcFactorNames: string[]
}

const NonCarcinogenicRiskContent = ({ pollutions, companyNames, passportsWithCompanies, rfcFactorNames, rfcFactors
}: NonCarcinogenicRiskContentProps) => {
    const [calculatedNonCarcinogenicRisk, setCalculatedNonCarcinogenicRisk] = useState('')

    const [possiblePassports, setPossiblePassports] = useState<string[]>([])
    const [possibleSubstances, setPossibleSubstances] = useState<string[]>([]);
    const [damagedOrgans, setDamagedOrgans] = useState<string[]>([])

    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedPassport, setSelectedPassport] = useState('');
    const [selectedSubstance, setSelectedSubstance] = useState('');
    const [selectedRFCSubstance, setSelectedRFCSubstance] = useState('');

    const [nonCarcinogenicData, setNonCarcinogenicData] = useState<NonCarcinogenicDataType>({
        c: '',
        rfc: ''
    })

    //finding passports relating to specific company name
    useEffect(() => {
        setPossiblePassports(passportsWithCompanies
            .filter((passport) => passport.company_name === selectedCompany)
            .map(passport => (String(passport.year)))
        )
        setSelectedPassport('');
        setSelectedSubstance('')
        setPossibleSubstances([])
        setSelectedRFCSubstance('')
    }, [selectedCompany])

    //finding pollutions relating to specific passport (by year) and company name
    useEffect(() => {
        const selectedPassportId = getSelectedPassportId();

        if (selectedPassportId !== undefined) {
            const filteredPollutionsByPassport = getSubstancesByPassportId(selectedPassportId);
            setPossibleSubstances(filteredPollutionsByPassport.map(poll => (String(poll.name))))
        }
        setSelectedSubstance('')
    }, [selectedPassport])

    //sets default Ca, Ch values when passport changed, also cleares inputs when substance sets to ''
    useEffect(() => {
        const selectedPassportId = getSelectedPassportId();
        if (selectedPassportId !== undefined) {
            const filteredPollutionsByPassport = getSubstancesByPassportId(selectedPassportId);
            const selectedSubstanceByPassport = filteredPollutionsByPassport.find(poll => poll.name == selectedSubstance)
            const caValue = selectedSubstanceByPassport?.cA_value;
            const selectedRfcFactor = getRfcSubstanceById(Number(selectedSubstanceByPassport?.pollutant_id))
            const rfcValue = selectedRfcFactor?.rfC_value
            setSelectedRFCSubstance(selectedRfcFactor?.name !== undefined ? selectedRfcFactor?.name : '')

            setNonCarcinogenicData({
                ...nonCarcinogenicData,
                c: caValue !== undefined ? String(caValue) : '',
                rfc: rfcValue !== undefined ? String(rfcValue) : ''
            })

        }

    }, [selectedSubstance])

    //sets rfc to respective value
    useEffect(() => {
        const rfcSelectedSubstance = getRfcSubstanceByName(selectedRFCSubstance);
        const rfcValue = rfcSelectedSubstance?.rfC_value
        setNonCarcinogenicData({
            ...nonCarcinogenicData,
            rfc: rfcValue !== undefined ? String(rfcValue) : ''
        })
        if (rfcSelectedSubstance !== undefined) {
            setDamagedOrgans(rfcSelectedSubstance?.damaged_organs.split(", ").map(el => el.toLowerCase()))
        }

    }, [selectedRFCSubstance])


    const handleNonCarcinogenicFactorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNonCarcinogenicData({
            ...nonCarcinogenicData,
            [e.target.name]: e.target.value
        })

    }
    const getSelectedPassportId = () => {
        return passportsWithCompanies.find(p => p.company_name == selectedCompany && p.year == selectedPassport)?.id
    }
    const getSubstancesByPassportId = (id: number) => {
        return pollutions.filter((poll) => poll.passport_id == String(id));
    }
    const getRfcSubstanceById = (rfcFactorId: number) => {
        return rfcFactors.find(rfcFactor => rfcFactorId == rfcFactor.id)
    }
    const getRfcSubstanceByName = (rfcFactorName: string) => {
        return rfcFactors.find(rfcFactor => rfcFactorName == rfcFactor.name)
    }
    const handleSchemaIssues = (errors: ZodIssue[]) => {
        let errorMessage = '';
        errors.forEach((err) => {
            errorMessage += err.path[0] + ': ' + err.message + '. '
        })
        toast.custom((t) => <ErrorToast t={t} message={errorMessage} />);
    }
    const clientGetCalculatedNonCarcinogenicRisk = async () => {
        //client-side validation
        const result = NonCarcinogenicFactorsSchema.safeParse(nonCarcinogenicData);
        if (!result.success) {
            handleSchemaIssues(result.error.issues)
            return;
        }

        //server response + error handling
        const response = await getCalculatedNonCarcinogenicRisk(result.data);
        if (response && typeof response === 'object' && 'error' in response) {
            toast.custom((t) => <ErrorToast t={t} message={response.error} />);
        } else {
            setCalculatedNonCarcinogenicRisk(String(response))
            toast.custom((t) => <SuccessfulToast t={t} message='Non-Carcinogenic risk successfuly calculated' />, { duration: 2500 });
        }

    }
    const positiveNumberValidation = (inputData: string) => {
        const numericValue = Number(inputData);
        return !isNaN(numericValue) && numericValue > 0;
    }


    return (
        <div className=" w-full flex flex-col gap-6 py-12 px-10">
            <form action={clientGetCalculatedNonCarcinogenicRisk}>
                <div className=' grid grid-rows-[repeat(auto-fill,minmax(210px,auto_1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
                    <div className=' flex flex-col gap-8 bg-white border border-[#d3d3d3] rounded-[20px] p-6 row-span-2 sm:col-span-2 order-1'>
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
                                <CustomDropdown
                                    items={companyNames}
                                    selected={selectedCompany}
                                    setSelected={setSelectedCompany}
                                />
                            </div>
                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    Passport
                                </p>
                                <CustomDropdown
                                    items={possiblePassports}
                                    selected={selectedPassport}
                                    setSelected={setSelectedPassport}
                                />
                            </div>
                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    Substance
                                </p>
                                <CustomDropdown
                                    items={possibleSubstances}
                                    selected={selectedSubstance}
                                    setSelected={setSelectedSubstance}
                                />
                            </div>
                            <div className=' flex flex-col sm:flex-row items-center w-full justify-between '>
                                <p className=' max-w-[83px] sm:text-base md:text-sm'>
                                    RfC Substance
                                </p>
                                <CustomDropdown
                                    items={rfcFactorNames}
                                    selected={selectedRFCSubstance}
                                    setSelected={setSelectedRFCSubstance}
                                />
                            </div>

                        </div>
                    </div>

                    <div className=' order-2'>
                        <FactorBlock
                            pathToIcon='/factor-icons/chemistry.png'
                            altText='chemistry'
                            tagName='C'
                            desc='Concentration of the substance in the ambient air'
                            quantity='mg/m³'
                            name='c'
                            handleChange={handleNonCarcinogenicFactorsChange}
                            value={nonCarcinogenicData.c}
                            validation={positiveNumberValidation}
                        />
                    </div>

                    <div className=' flex flex-col flex-auto gap-5 bg-white border border-[#d3d3d3] rounded-[20px] p-6 row-span-2 order-5 xl:order-3  md:col-span-2 xl:col-span-1'>
                        <div className=' flex items-center justify-between'>
                            <Image
                                src='/calculator-icon.png'
                                alt='Setting'
                                width={43}
                                height={43}
                                quality={100}
                            />
                            <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider border border-[#d3d3d3] bg-primary rounded-[10px] px-3 pb-[0.1rem] pt-[0.3rem]'>HQ</div>
                        </div>
                        <p className=' text-sm'>Characterization of the risk of non-carcinogenic effects</p>
                        <p className={`text-xl font-light min-h-[28px] break-words ${exo.className}`}>
                            {calculatedNonCarcinogenicRisk}
                        </p>
                        <p className=' text-sm'>Critical organs/systems</p>
                        <div className={` ${exo.className} text-red-400 text-lg flex flex-col gap-4 leading-5 max-h-[100px] overflow-y-scroll`}>
                            {damagedOrgans.map((disease, index) => (
                                <div key={index}>
                                    {disease}
                                </div>
                            ))}
                        </div>
                        <div className=' flex flex-auto items-end'>
                            <CustomButton
                                title='CALCULATE'
                                type='submit'
                            />
                        </div>
                    </div>

                    <div className=' flex flex-col gap-7 bg-white border border-[#d3d3d3] rounded-[20px] p-6 row-span-2 order-4'>
                        <div className=' flex items-center justify-between'>
                            <Image
                                src='/factor-icons/bronchus.png'
                                alt='Setting'
                                width={43}
                                height={43}
                                quality={100}
                            />
                            <div className=' relative top-[0.2rem] font-bold text-3xl md:text-4xl tracking-wider border border-[#d3d3d3] bg-primary rounded-[10px] px-3 pb-[0.1rem] pt-[0.3rem]'>OG</div>
                        </div>
                        <div className=' flex justify-center relative'>
                            <Image
                                src='/factor-icons/body/empty.png'
                                alt='body'
                                width={167}
                                height={336}
                                priority
                            />
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('cns') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/CNS.png'
                                    alt='CNS'
                                    width={167}
                                    height={336}
                                />
                            </div>
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('respiratory organs') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/respiratory.png'
                                    alt='Respiratory'
                                    width={167}
                                    height={336}
                                />
                            </div>
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('kidneys') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/kidneys.png'
                                    alt='Kidneys'
                                    width={167}
                                    height={336}
                                />
                            </div>
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('liver') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/liver.png'
                                    alt='Liver'
                                    width={167}
                                    height={336}
                                />
                            </div>
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('reproductive system') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/reproduct.png'
                                    alt='Reproduct'
                                    width={167}
                                    height={336}
                                />
                            </div>
                            <div className={` absolute -top-2.5 ${damagedOrgans.includes('cardiovascular system') ? 'block' : 'hidden'}`}>
                                <Image
                                    src='/factor-icons/body/cardio.png'
                                    alt='Cardio'
                                    width={167}
                                    height={336}
                                />
                            </div>
                        </div>
                    </div>

                    <div className=' order-3 xl:order-5'>
                        <FactorBlock
                            pathToIcon='/factor-icons/hourglass (1).png'
                            altText='Time'
                            tagName='RfC'
                            desc='Daily exposure to a chemical over a lifetime'
                            quantity='mg/m³'
                            name='rfc'
                            handleChange={handleNonCarcinogenicFactorsChange}
                            value={nonCarcinogenicData.rfc}
                            validation={positiveNumberValidation}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default NonCarcinogenicRiskContent