import Footer from "../components/shared/footer/Footer";
import Navbar from "../components/shared/navbar/Navbar";
import VerifyAccount from "../components/shared/verify-account/VerifyAccount";

const UserVerifyAccountPage = () => {

    return (
        <>
            <Navbar />
            <VerifyAccount formType="user" />
            <Footer />
        </>
    )
}

export default UserVerifyAccountPage;