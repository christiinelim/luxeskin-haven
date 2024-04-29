import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import VerifyAccount from "../components/shared/VerifyAccount";

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