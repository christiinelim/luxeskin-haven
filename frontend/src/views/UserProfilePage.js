import UserProfile from "../components/user-profile/UserProfile";
import Navbar from "../components/shared/navbar/Navbar";
import UserSideNav from "../components/shared/user-side-nav/UserSideNav";

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