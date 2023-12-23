
export interface CustomServerResponse {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: any[];
}
export interface CustomServerResponseObj {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: any;
}

export interface CompanyType {
    name: string;
    description: string;
    id: number;
    city_id: number
}
export interface CityType {
    id: number
    name: string
    population: number
    isResort: boolean
    region_id: number
}

export interface PassportType {
    id: number
    company_id: string,
    year: string
    source_operating_time: number
}

export interface PollutionType {
    id: number
    name: string,
    value: string,
    passport_id: string
    cA_value: string
    cH_value: string
    pollutant_id: string
}

export interface RfcFactorType {
    id: number,
    name: string
    rfC_value: number
    damaged_organs: string
    sF_value: number
    gdK_value: number
    mass_flow_rate: number
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

export interface NewsType {
    id: number
    title: string
    body: string
    post_date: string
    source_url: string
    likes: number
    authors: string
    region_name: string
    company_names: string
}
export interface CustomServerFilteredNewsResponse {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: {
        remainingRowsCount: number,
        isItEnd: boolean,
        selectedNews: NewsType[]
    };
}
export interface SearchParamsProps {
    order: string,
    authors: string,
    companies: string,
    fromDate: string,
    toDate: string
}
