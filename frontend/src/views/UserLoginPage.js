import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import UserLogin from "../components/user-login/UserLogin";

const UserLoginPage = () => {
    return(
        <>
            <Navbar />
            <UserLogin />
            <Footer />
        </>
    )
}

export default UserLoginPage;