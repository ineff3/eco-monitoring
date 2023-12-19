
export interface CustomServerResponse {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: any[];
}


export interface CompanyType {
    name: string;
    description: string;
    location: string
    id: number;
}

export interface PassportType {
    id: number
    company_id: string,
    year: string
}

export interface PollutionType {
    id: number
    factor_Name: string,
    factor_value: string,
    passport_id: string
    factor_Ca_value: string
    factor_Ch_value: string
    rfc_factor_id: string
}

export interface RfcFactorType {
    id: number,
    factor_Name: string
    factor_value: number
    damaged_organs: string
}

export interface passportsWithCompaniesType extends PassportType {
    company_name: string
}

export interface CarcinogenicDataType {
    ca: string,
    ch: string,
    tout: string,
    tin: string,
    vout: string,
    vin: string,
    ef: string,
    ed: string,
    bw: string,
    at: string
    sf: string
    pop: string
}
export interface BodyType {
    type: string
    bw: number
    tin: number
    tout: number
    vout: number
    vin: number
}
export interface NonCarcinogenicDataType {
    c: string
    rfc: string
}