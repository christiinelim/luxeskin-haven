import SellerListings from "../../components/seller-platform/SellerListings";
import SellerNavbar from "../../components/shared/SellerNavbar";
import SellerSideNav from "../../components/shared/SellerSideNav";

const SellerListingsPage = () => {

    return (
        <>
            <SellerNavbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav />
                </div>
                <div className="content-body">
                    <SellerListings />
                </div>
            </div>
        </>
    )
}

export default SellerListingsPage;