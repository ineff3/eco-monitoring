import EmissionTaxesContent from "./EmissionTaxesContent"
import { getCompanies } from '@/actions/basic-actions/actions'


const EmissionTaxesPage = async () => {
    const companies = await getCompanies();
    return (
        <EmissionTaxesContent
            companies={companies}
        />
    )
}

export default EmissionTaxesPage