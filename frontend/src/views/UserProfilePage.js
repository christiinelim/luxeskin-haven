import UserProfile from "../components/UserProfile";
import Navbar from "../components/shared/Navbar";
import UserSideNav from "../components/shared/UserSideNav";

const UserProfilePage = () => {
    return(
        <>
            <Navbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <UserSideNav />
                </div>
                <div className="content-body">
                    <UserProfile />
                </div>
            </div>
        </>
    )
}

export default UserProfilePage;