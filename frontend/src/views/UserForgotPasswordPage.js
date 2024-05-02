import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import UserForgotPassword from "../components/user-forgot-password/UserForgotPassword";

const UserForgotPasswordPage = () => {
    return(
        <>
            <Navbar />
            <UserForgotPassword />
            <Footer />
        </>
    )
}

export default UserForgotPasswordPage;