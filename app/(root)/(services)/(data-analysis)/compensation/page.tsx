import { getCompanies } from '@/actions/basic-actions/actions'
import CompensationContent from './CompensationContent'

const CompensationPage = async () => {
    const companies = await getCompanies();

    return (
        <CompensationContent
            companies={companies}
        />
    )
}

export default CompensationPage