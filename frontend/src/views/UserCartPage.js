import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import UserCart from "../components/user-cart/UserCart";

const UserCartPage = () => {
    return(
        <>
            <Navbar />
            <UserCart />
            <Footer />
        </>
    )
}

export default UserCartPage;