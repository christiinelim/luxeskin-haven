import UserOrder from "../components/user-order/UserOrder";
import Navbar from "../components/shared/navbar/Navbar";
import UserSideNav from "../components/shared/user-side-nav/UserSideNav";

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