import SellerLogin from "../../components/seller-platform/login/SellerLogin";
import Footer from "../../components/shared/footer/Footer";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";

const SellerLoginPage = () => {

    return (
        <>
            <SellerNavbar />
            <SellerLogin />
            <Footer />
        </>
    )
}

export default SellerLoginPage;