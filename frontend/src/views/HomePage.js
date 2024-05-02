import Cta from "../components/home/Cta";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/shared/footer/Footer";
import Navbar from "../components/shared/navbar/Navbar";

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