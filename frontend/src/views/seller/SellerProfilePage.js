import SellerProfile from "../../components/seller-platform/profile/SellerProfile";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import SellerSideNav from "../../components/shared/seller-side-nav/SellerSideNav";

const SellerProfilePage = () => {

    return (
        <>
            <SellerNavbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav />
                </div>
                <div className="content-body">
                    <SellerProfile />
                </div>
            </div>
        </>
    )
}

export default SellerProfilePage;