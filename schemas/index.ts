import { z } from 'zod'




const DefaultFactorSchema = (factorName: string) => {
    return z.string().refine((value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue > 0;
    }, { message: `${factorName} value must be a positive number` });
}

const DefaultTimeFactorSchema = (factorName: string, upperLimit: number) => {
    return z.string().refine((value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue > 0 && numericValue <= upperLimit;
    }, { message: `${factorName} value must be grater than 0 and not more than ${upperLimit}` })
}

export const CarcinogenicFactorsSchema = z.object({
    ca: DefaultFactorSchema('Ca'),
    ch: DefaultFactorSchema('Ch'),
    tout: DefaultTimeFactorSchema('Tout', 24),
    tin: DefaultTimeFactorSchema('Tin', 24),
    vout: DefaultFactorSchema('Vout'),
    vin: DefaultFactorSchema('Vin'),
    ef: DefaultFactorSchema('Ef'),
    ed: DefaultTimeFactorSchema('Ed', 365),
    bw: DefaultTimeFactorSchema('Bw', 300),
    at: DefaultFactorSchema('At'),
    sf: DefaultFactorSchema('Sf'),
    pop: DefaultFactorSchema('Pop')
})

export const NonCarcinogenicFactorsSchema = z.object({
    c: DefaultFactorSchema('C'),
    rfc: DefaultFactorSchema('Rfc')
})

export const CompensationFactorsSchema = z.object({
    env_factor: DefaultFactorSchema('Ca'),
    mass_flow_rate: DefaultFactorSchema('Mfr'),
    pop: DefaultFactorSchema('Pop'),
    min_salary: DefaultFactorSchema('Ms'),
    kf: DefaultFactorSchema('Kf'),
    time_hours: DefaultTimeFactorSchema('Time', 8760),
    gdk: DefaultFactorSchema('Mpe')
})

export const TaxesInputSchema = z.object({
    company_id: z.number().int().positive(),
    passport_id: z.number().int().positive(),
    year: z.number().min(2000).max(2030)
})