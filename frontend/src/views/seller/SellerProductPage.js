import SellerProduct from "../../components/seller-platform/SellerProduct";
import SellerNavbar from "../../components/shared/SellerNavbar";
import SellerSideNav from "../../components/shared/SellerSideNav";

const SellerProductPage = () => {

    return (
        <>
            <SellerNavbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav />
                </div>
                <div className="content-body">
                    <SellerProduct />
                </div>
            </div>
        </>
    )
}

export default SellerProductPage;