import SellerProduct from "../../components/seller-platform/product/SellerProduct";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import SellerSideNav from "../../components/shared/seller-side-nav/SellerSideNav";

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