import Footer from "../../components/shared/footer/Footer";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import VerifyAccount from "../../components/shared/verify-account/VerifyAccount";

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