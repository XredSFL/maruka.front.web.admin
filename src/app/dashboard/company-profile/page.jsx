import DashboardLayout from "../layout/DashboardLayout";
import { CompanyProfileMainSection } from "../components/company-profile/CompanyProfileMainSection";
function CompanyProfilePage() {
    return (
        <DashboardLayout>
            <CompanyProfileMainSection />
        </DashboardLayout>
    );
}

export default CompanyProfilePage;