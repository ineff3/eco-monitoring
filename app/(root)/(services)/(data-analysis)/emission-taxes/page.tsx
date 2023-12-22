import EmissionTaxesContent from "./EmissionTaxesContent"
import { getCompanies, getTaxYears } from '@/actions/basic-actions/actions'


const EmissionTaxesPage = async () => {
    const companies = await getCompanies();
    const taxYears = await getTaxYears();
    const taxYearsStrings = taxYears.map((year) => String(year))
    return (
        <EmissionTaxesContent
            companies={companies}
            taxYears={taxYearsStrings}
        />
    )
}

export default EmissionTaxesPage