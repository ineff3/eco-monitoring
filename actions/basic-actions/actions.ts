"use server"
import fetch from 'node-fetch';
import https from 'https';
import { CityType, CustomServerResponse, CustomServerResponseObj, RfcFactorType } from '@/types';
import { CarcinogenicFactorsSchema, CompensationFactorsSchema, NonCarcinogenicFactorsSchema } from '@/schemas';
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
