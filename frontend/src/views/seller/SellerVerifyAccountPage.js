import Footer from "../../components/shared/Footer";
import SellerNavbar from "../../components/shared/SellerNavbar";
import VerifyAccount from "../../components/shared/VerifyAccount";

const SellerVerifyAccountPage = () => {

    return (
        <>
            <SellerNavbar />
            <VerifyAccount formType="seller" />
            <Footer />
        </>
    )
}

export default SellerVerifyAccountPage;