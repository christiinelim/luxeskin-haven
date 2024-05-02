import SellerListProduct from "../../components/seller-platform/list-product/SellerListProduct";
import SellerNavbar from "../../components/shared/seller-navbar/SellerNavbar";
import SellerSideNav from "../../components/shared/seller-side-nav/SellerSideNav";

const SellerListProductPage = () => {

    return (
        <>
            <SellerNavbar />
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav />
                </div>
                <div className="content-body">
                    <SellerListProduct />
                </div>
            </div>
        </>
    )
}

export default SellerListProductPage;