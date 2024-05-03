import SellerOrders from "../../components/seller-platform/orders/SellerOrders";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import SellerSideNav from "../../components/shared/seller-side-nav/SellerSideNav";

const SellerOrdersPage = () => {

    return (
        <>
            <SellerNavbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav />
                </div>
                <div className="content-body">
                    <SellerOrders />
                </div>
            </div>
        </>
    )
}

export default SellerOrdersPage;