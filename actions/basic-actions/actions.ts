"use server"
import fetch from 'node-fetch';
import https from 'https';
import { CityType, CustomServerFilteredNewsResponse, CustomServerGetNewsById, CustomServerLikeNewsResponse, CustomServerNewsActiveRegions, CustomServerRegionNewsResponse, CustomServerResponse, CustomServerResponseObj, NewsType, RfcFactorType, SearchParamsProps } from '@/types';
import { CarcinogenicFactorsSchema, CompensationFactorsSchema, NonCarcinogenicFactorsSchema, TaxesInputSchema } from '@/schemas';
import { formatServerErrors, getErrorMessage } from '../secondary-utils/errorHandling';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation';

const agent = new https.Agent({
    rejectUnauthorized: false
});

const link = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/CompanyData`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
export const getCityByCompanyId = async (id: number) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/CityData/id:int?id=${id}`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponseObj;

        return data.result as CityType
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
export const getNarrowCompanies = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/CompanyData/GetAllNarrowCompanies`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getPassports = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PassportData`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export const getPassportsByCompanyId = async (id: number) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PassportData/GetPassportsByCompany?company_id=${id}`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getPollutions = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PollutionData`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};
export const getPollutionsByPassportId = async (id: number) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PollutionData/GetPollutionsByPassport?passport_id=${id}`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getRfcFactors = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PollutantData`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export const getRfcFactorById = async (id: number) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/PollutantData/id:int?id=${id}`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponseObj;

        return data.result as RfcFactorType;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getTaxYears = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/TaxNormData/Years`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result as number[];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getFilteredNews = async (page?: number, filters?: SearchParamsProps) => {
    const session = await getServerSession(authOptions)
    // console.log(filters)
    let queryString = ''
    if (filters) {
        queryString = Object.entries(filters)
            .map(([key, value]) => {
                if (key === 'order') {
                    if (value === 'By relevance') {
                        key = 'byRelevance'
                        value = true
                    }
                    else if (value === 'Newer to older') {
                        key = 'newerToOlder'
                        value = true
                    }
                    else if (value === 'Older to newer') {
                        key = 'newerToOlder'
                        value = false
                    }
                }
                else if (key === 'companies') {
                    const companies = value.split(',')
                    if (companies?.length === 1 && companies.includes('')) {
                        return null
                    }
                    const separatadCompanies = companies.map((id: any) => `company_ids=${id}`).join('&');
                    return separatadCompanies
                }
                else if (key === 'authors') {
                    const authors = value.split(',')
                    if (authors?.length === 1 && authors.includes('')) {
                        return null
                    }
                    const separatedAuthors = authors.map((id: any) => `author_ids=${id}`).join('&');
                    return separatedAuthors
                }
                else if (key === 'regions') {
                    const regions = value.split(',')
                    if (regions?.length === 1 && regions.includes('')) {
                        return null
                    }
                    const separatedRegions = regions.map((id: any) => `region_ids=${id}`).join('&');
                    return separatedRegions
                }
                else if (key === 'selectedNewsId') {
                    return null
                }
                return `${key}=${value}`
            })
            .filter(Boolean)
            .join('&');
    }
    // console.log(queryString)

    const curPage = page ? page : '';
    const fetchOptions = session ? {
        method: 'GET',
        agent,
    } : {
        method: 'GET',
        'Authorization': `bearer ${session?.user.token}`,
        agent,
    };

    try {
        const fetchUrl = session?.user.id ?
            `${link}api/News/GetNewsByFilter?count=4&userId=${session?.user.id}&page=${curPage}&${queryString}` :
            `${link}api/News/GetNewsByFilter?count=4&page=${curPage}&${queryString}`
        console.log(fetchUrl)
        const response = await fetch(fetchUrl, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerFilteredNewsResponse;
        // console.log(data)

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return {
            isItEnd: true,
            selectedNews: []
        }
    }
}
export const getRegionNews = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/News/GetRegionNews?regionsCount=3&newsCount=4`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerRegionNewsResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
export const getNewsById = async (id: number) => {
    const session = await getServerSession(authOptions)
    const fetchOptions = session ? {
        method: 'GET',
        agent,
    } : {
        method: 'GET',
        'Authorization': `bearer ${session?.user.token}`,
        agent,
    };

    try {
        const fetchUrl = session?.user.id ?
            `${link}api/News/GetNewsById?newsId=${id}&userId=${session?.user.id}` :
            `${link}api/News/GetNewsById?newsId=${id}`
        const response = await fetch(fetchUrl, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerGetNewsById;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
export const getNewsForHomePage = async (count: number) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/News/GetNewsByFilter?count=${count}&page=0&newerToOlder=true`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerFilteredNewsResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return {
            isItEnd: true,
            selectedNews: []
        }
    }
}
export const getActiveRegions = async (numberOfRegions: number, fromDate: string, toDate: string) => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/News/GetNewsActiveRegions?countOfRegions=${numberOfRegions}&fromDate=2023-12-17&toDate=2023-12-24`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerNewsActiveRegions;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}
export const likeNews = async (userId: string, newsId: number) => {
    const session = await getServerSession(authOptions)
    try {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${session?.user.token}`
            },
            agent
        };
        const response = await fetch(`${link}api/News/LikeNews?userId=${userId}&newsId=${newsId}`, fetchOptions)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerLikeNewsResponse;
        return data.result;
    }
    catch (error) {
        console.log(error)
        return -1;
    }
}


export const getCalculatedCarcinogenicRisk = async (carcinogenicFactors: unknown) => {
    // const session = await getServerSession(authOptions)
    // console.log(session)
    try {
        //server-side validation
        const result = CarcinogenicFactorsSchema.safeParse(carcinogenicFactors);
        if (!result.success) {
            let errorMessage = '';
            result.error.issues.forEach((err) => {
                errorMessage += err.path[0] + ': ' + err.message + '. '
            })
            throw new Error(errorMessage);
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data),
            agent
        };
        const response = await fetch(`${link}api/DataAnalysis/CarcinogenicRisk`, fetchOptions)

        if (!response.ok) {
            const responseBody = await response.json() as CustomServerResponse;
            throw new Error(formatServerErrors(responseBody.errorMessages));
        }
        const data = await response.json() as CustomServerResponse;
        return data.result;
    }
    catch (error) {
        return { error: getErrorMessage(error) }
    }
}
export const getCalculatedNonCarcinogenicRisk = async (nonCarcinogenicFactors: unknown) => {
    try {
        //server-side validation
        const result = NonCarcinogenicFactorsSchema.safeParse(nonCarcinogenicFactors);
        if (!result.success) {
            let errorMessage = '';
            result.error.issues.forEach((err) => {
                errorMessage += err.path[0] + ': ' + err.message + '. '
            })
            throw new Error(errorMessage);
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data),
            agent
        };
        const response = await fetch(`${link}api/DataAnalysis/NonCarcinogenicRisk`, fetchOptions)

        if (!response.ok) {
            const responseBody = await response.json() as CustomServerResponse;
            throw new Error(formatServerErrors(responseBody.errorMessages));
        }
        const data = await response.json() as CustomServerResponse;

        return Number(data.result);
    }
    catch (error) {
        return { error: getErrorMessage(error) }
    }
}
export const getCalculatedCompensation = async (compensationFactors: unknown) => {
    try {
        //server-side validation
        const result = CompensationFactorsSchema.safeParse(compensationFactors);
        if (!result.success) {
            let errorMessage = '';
            result.error.issues.forEach((err) => {
                errorMessage += err.path[0] + ': ' + err.message + '. '
            })
            throw new Error(errorMessage);
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data),
            agent
        };
        const response = await fetch(`${link}api/DataAnalysis/Compensation`, fetchOptions)

        if (!response.ok) {
            const responseBody = await response.json() as CustomServerResponse;
            throw new Error(formatServerErrors(responseBody.errorMessages));
        }
        const data = await response.json() as CustomServerResponse;
        return data.result;
    }
    catch (error) {
        return { error: getErrorMessage(error) }
    }
}
export const getCalculatedTaxes = async (taxesInput: unknown) => {
    try {
        //server-side validation
        const result = TaxesInputSchema.safeParse(taxesInput);
        if (!result.success) {
            let errorMessage = '';
            result.error.issues.forEach((err) => {
                errorMessage += err.path[0] + ': ' + err.message + '. '
            })
            throw new Error(errorMessage);
        }
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data),
            agent
        };
        const response = await fetch(`${link}api/DataAnalysis/Taxes`, fetchOptions)

        if (!response.ok) {
            const responseBody = await response.json() as CustomServerResponse;
            throw new Error(formatServerErrors(responseBody.errorMessages));
        }
        const data = await response.json() as CustomServerResponse;
        return data.result;
    }
    catch (error) {
        return { error: getErrorMessage(error) }
    }
}

export const createUserAccount = async (formData: FormData) => {
    try {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                userName: formData.get('username'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword')
            }),
            agent
        };
        const response = await fetch(`${link}api/Auth/Register`, fetchOptions)

        const responseBody = await response.json() as CustomServerResponse;

        if (!response.ok) {
            throw new Error(formatServerErrors(responseBody.errorMessages));
        }
    }
    catch (error) {
        return { error: getErrorMessage(error) }
    }
    redirect('/');
}
export const getNarrowUsers = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/UserData/GetAllNarrowUsers`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export const getNarrowRegions = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/RegionData/GetAllNarrowRegions`, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json() as CustomServerResponse;

        return data.result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
