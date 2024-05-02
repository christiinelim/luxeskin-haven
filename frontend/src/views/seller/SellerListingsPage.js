import SellerListings from "../../components/seller-platform/listings/SellerListings";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import SellerSideNav from "../../components/shared/seller-side-nav/SellerSideNav";

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