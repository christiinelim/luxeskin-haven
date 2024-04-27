
import SellerProfile from "../../components/seller-platform/SellerProfile";
import SellerNavbar from "../../components/shared/SellerNavbar";
import SellerSideNav from "../../components/shared/SellerSideNav";

const SellerProfilePage = () => {

    return (
        <>
            <SellerNavbar></SellerNavbar>
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav></SellerSideNav>
                </div>
                <div className="content-body">
                    <SellerProfile></SellerProfile>
                </div>
            </div>
        </>
    )
}

export default SellerProfilePage;