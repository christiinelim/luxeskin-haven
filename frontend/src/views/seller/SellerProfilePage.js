import SellerProfile from "../../components/seller-platform/SellerProfile";
import SellerNavbar from "../../components/shared/SellerNavbar";
import SellerSideNav from "../../components/shared/SellerSideNav";

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