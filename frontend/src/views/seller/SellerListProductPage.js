import SellerListProduct from "../../components/seller-platform/SellerListProduct";
import SellerNavbar from "../../components/shared/SellerNavbar";
import SellerSideNav from "../../components/shared/SellerSideNav";

const SellerListProductPage = () => {

    return (
        <>
            <SellerNavbar></SellerNavbar>
            <div className="content-wrap">
                <div className="content-nav">
                    <SellerSideNav></SellerSideNav>
                </div>
                <div className="content-body">
                    <SellerListProduct></SellerListProduct>
                </div>
            </div>
        </>
    )
}

export default SellerListProductPage;