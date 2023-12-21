import NonCarcinogenicRiskContent from './NonCarcinogenicRiskContent'
import { getCompanies, getPassports, getPollutions, getRfcFactors } from '@/actions/basic-actions/actions';
import { PollutionType, passportsWithCompaniesType } from '@/types';

const NonCarcinogenicRiskPage = async () => {
    const companies = await getCompanies();
    const passports = await getPassports();
    const pollutions = await getPollutions();
    const rfcFactors = await getRfcFactors();

    const companyNames = companies.map(company => (company.name));
    const rfcFactorNames = rfcFactors.map(rfcFactor => (rfcFactor.name))


    const passportsWithCompanies = passports.map(passport => ({
        ...passport,
        company_name: companies.find(company => company.id === passport.company_id).name
    }));

    return (
        <NonCarcinogenicRiskContent
            pollutions={pollutions as PollutionType[]}
            rfcFactors={rfcFactors}
            companyNames={companyNames as string[]}
            rfcFactorNames={rfcFactorNames}
            passportsWithCompanies={passportsWithCompanies as passportsWithCompaniesType[]}

        />
    )
}

export default NonCarcinogenicRiskPage