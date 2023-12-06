"use server"
import fetch from 'node-fetch';
import https from 'https';
import { CustomServerResponse } from '@/types';
import { CarcinogenicFactorsSchema, NonCarcinogenicFactorsSchema } from '@/schemas';
import { formatServerErrors, getErrorMessage } from '../secondary-utils/errorHandling';

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

export const getPollutions = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/EnvData`, fetchOptions);

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

export const getRfcFactors = async () => {
    const fetchOptions = {
        method: 'GET',
        agent,
    };

    try {
        const response = await fetch(`${link}api/RfcData`, fetchOptions);

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

export const getCalculatedCarcinogenicRisk = async (carcinogenicFactors: unknown) => {
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

        return Number(data.result);
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
