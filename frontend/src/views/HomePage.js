import Cta from "../components/home-view/Cta";
import FeaturedProducts from "../components/home-view/FeaturedProducts";
import Newsletter from "../components/home-view/Newsletter";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const HomePage = () => {
    return(
        <>
            <Navbar />
            <Cta />
            <FeaturedProducts />
            <Newsletter />
            <Footer />
        </>
    )
}

export default HomePage;