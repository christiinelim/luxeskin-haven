import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import UserSignup from "../components/user-signup/UserSignup";

const UserSignupPage = () => {
    return(
        <>
            <Navbar />
            <UserSignup />
            <Footer />
        </>
    )
}

export default UserSignupPage;