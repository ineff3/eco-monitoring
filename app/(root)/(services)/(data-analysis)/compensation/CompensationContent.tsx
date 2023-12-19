'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Exo } from 'next/font/google'
import { CustomButton, CustomDropdown, CustomDropdownEnhanced, ErrorToast, FactorBlock, SuccessfulToast } from '@/components';
import { CityType, CompanyType, PassportType, PollutionType, RfcFactorType } from '@/types';
import { getCalculatedCompensation, getCityByCompanyId, getPassportsByCompanyId, getPollutions, getPollutionsByPassportId, getRfcFactorById } from '@/actions/basic-actions/actions';
import { CompensationFactorsSchema } from '@/schemas';
import { ZodIssue } from 'zod';
import { toast } from 'react-hot-toast';
import CompensationBarchart from './CompensationBarchart';

const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})

interface CompensationFactorsType {
    env_factor: string,
    mass_flow_rate: string,
    pop: string
    min_salary: string
    kf: string
    time_hours: string
    gdk: string
}
interface Props {
    companies: CompanyType[]
}
const CompensationContent = ({ companies }: Props) => {
    const [compensationData, setCompensationData] = useState<CompensationFactorsType>({
        env_factor: '',
        mass_flow_rate: '',
        pop: '',
        min_salary: '3400',
        kf: '',
        time_hours: '',
        gdk: ''
    })
    const [results, setResults] = useState({
        compensation: '',
        permitAmount: '',
        actualAmount: ''
    })
    const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
    const [selectedPassport, setSelectedPassport] = useState<PassportType | null>(null);
    const [selectedSubstance, setSelectedSubstance] = useState<PollutionType | null>(null);
    const [possiblePassports, setPossiblePassports] = useState([])
    const [possibleSubstances, setPossibleSubstances] = useState([])

    //cleares the selectedPassport and possibleSubstances and fetches possiblePassports when company changes
    useEffect(() => {
        setSelectedPassport(null)
        setPossibleSubstances([])

        const fetchCityAndSetDefaultFactorValues = async () => {
            if (selectedCompany !== null) {
                const result = await getCityByCompanyId(selectedCompany?.city_id) as CityType
                setCompensationData({
                    ...compensationData,
                    pop: result ? String(result.population) : '',
                    kf: result ? (result.isResort ? '1.65' : '1') : ''
                })
            }
        }
        const fetchAndSetPossiblePassports = async () => {
            if (selectedCompany !== null) {
                const result = await getPassportsByCompanyId(selectedCompany?.id) as any;
                setPossiblePassports(result)
            }
        }
        fetchCityAndSetDefaultFactorValues();
        fetchAndSetPossiblePassports();
    }, [selectedCompany])

    //cleares selectedSubstance and fetches possibleSubstances when passport changes
    useEffect(() => {
        setSelectedSubstance(null)

        //setting default factor values
        if (selectedPassport !== null) {
            setCompensationData({
                ...compensationData,
                time_hours: String(selectedPassport.source_operating_time)
            })
        }

        const fetchAndSetPossibleSubstances = async () => {
            if (selectedPassport !== null) {
                const result = await getPollutionsByPassportId(selectedPassport?.id) as any
                setPossibleSubstances(result)
            }
        }
        fetchAndSetPossibleSubstances();
    }, [selectedPassport])

    //sets deafult values when selectedSubstance changes
    useEffect(() => {
        const fetchRfcFactorAndSetDeafultFactorValues = async () => {
            if (selectedSubstance !== null) {
                const result = await getRfcFactorById(Number(selectedSubstance?.rfc_factor_id)) as RfcFactorType
                setCompensationData({
                    ...compensationData,
                    env_factor: String(selectedSubstance.factor_value),
                    mass_flow_rate: result ? String(result.mass_flow_rate) : '',
                    gdk: result ? String(result.gdK_value) : ''
                })
            }
        }
        fetchRfcFactorAndSetDeafultFactorValues()
    }, [selectedSubstance])

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
        setPossibleSubstances([])
        setCompensationData({
            env_factor: '',
            mass_flow_rate: '',
            pop: '',
            min_salary: '3400',
            kf: '',
            time_hours: '',
            gdk: ''
        })
    }
    const clientGetCalculatedCompensation = async () => {
        //client-side validation
        const result = CompensationFactorsSchema.safeParse(compensationData);
        if (!result.success) {
            handleSchemaIssues(result.error.issues)
            return;
        }

        //server response + error handling
        const response = await getCalculatedCompensation(result.data);
        if (response && typeof response === 'object' && 'error' in response) {
            toast.custom((t) => <ErrorToast t={t} message={response.error} />);
        } else {
            const compens = response[0] as number
            setResults({
                compensation: compens.toFixed(2),
                permitAmount: response[1],
                actualAmount: response[2],
            })
            toast.custom((t) => <SuccessfulToast t={t} message='Carcinogenic risk successfuly calculated' />, { duration: 2500 });
        }

    }


    return (
        <div className={`w-full flex flex-col gap-6 py-5 sm:py-12 px-4 sm:px-10`}>
            <form action={clientGetCalculatedCompensation}>
                <div className=' grid grid-rows-[repeat(auto-fill,minmax(210px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-5'>
                    <div className=' order-1'>
                        <FactorBlock
                            pathToIcon='/factor-icons/chemistry.png'
                            altText='chemistry'
                            tagName='MES'
                            desc='Mass of the emitted substance'
                            quantity='mg/m³'
                            name='env_factor'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.env_factor}
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
                            name='mass_flow_rate'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.mass_flow_rate}
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
                            name='min_salary'
                            quantity='UAH'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.min_salary}
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
                                <CustomDropdownEnhanced
                                    items={possibleSubstances}
                                    selected={selectedSubstance}
                                    setSelected={setSelectedSubstance}
                                    displayField='factor_Name'

                                />
                            </div>
                            <CustomButton
                                title='RESET'
                                type='reset'
                                onClick={resetAllSelectedFields}
                            />

                        </div>
                    </div>

                    <div className=' order-6 1/5xl:order-7'>
                        <FactorBlock
                            pathToIcon='/factor-icons/hourglass (1).png'
                            altText='time'
                            tagName='Time'
                            desc='Operating time of the emission source'
                            name='time_hours'
                            quantity='h/year'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.time_hours}
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
                            <div className={` h-[190px] `}>
                                <CompensationBarchart
                                    dataValues={[Number(results.permitAmount), Number(results.actualAmount)]}
                                    satisfies={Number(results.actualAmount) <= Number(results.permitAmount)}

                                />
                            </div>
                            <div className=' flex flex-col gap-8 flex-auto'>
                                <div className=' flex flex-col gap-2'>
                                    <p className=' text-sm'>Amounts of compensation required to be paid</p>
                                    <div className=' flex flex-wrap gap-2 items-center'>
                                        <p className={`text-xl font-light break-words ${exo.className}`}>{results.compensation}</p>
                                        <div className={` text-[#7f7f7f] ${results.compensation ? 'block' : 'hidden'}`}>UAH</div>
                                    </div>
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
                            name='gdk'
                            quantity='g/sec'
                            handleChange={handleCompensationFactorsChange}
                            value={compensationData.gdk}
                            validation={positiveNumberValidation}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CompensationContent