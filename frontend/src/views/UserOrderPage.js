import UserOrder from "../components/UserOrder";
import Navbar from "../components/shared/Navbar";
import UserSideNav from "../components/shared/UserSideNav";

const UserOrderPage = () => {
    return(
        <>
            <Navbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <UserSideNav />
                </div>
                <div className="content-body">
                    <UserOrder />
                </div>
            </div>
        </>
    )
}

export default UserOrderPage;