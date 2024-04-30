import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerSignupPage from './views/seller/SellerSignupPage';
import HomePage from './views/HomePage';
import ProductPage from './views/ProductPage';
import SellerLoginPage from './views/seller/SellerLoginPage';
import SellerVerifyAccountPage from './views/seller/SellerVerifyAccountPage';
import { SellerServicesData } from './context/SellerContext'
import SellerProfilePage from './views/seller/SellerProfilePage';
import SellerForgotPasswordPage from './views/seller/SellerForgotPasswordPage';
import { AuthData } from './context/AuthContext';
import SellerListingsPage from './views/seller/SellerListingsPage';
import { ProductServicesData } from './context/ProductContext';
import SellerProductPage from './views/seller/SellerProductPage';
import SellerListProductPage from './views/seller/SellerListProductPage';
import { UserServicesData } from './context/UserContext';
import UserSignupPage from './views/UserSignupPage';
import UserVerifyAccountPage from './views/UserVerifyAccountPage';
import UserLoginPage from './views/UserLoginPage';
import UserForgotPasswordPage from './views/UserForgotPasswordPage';
import UserProfilePage from './views/UserProfilePage';
import UserCartPage from './views/UserCartPage';
import { CartServicesData } from './context/CartContext';

function App() {
  return (
    <>
      <Router>
        <AuthData>
          <UserServicesData>
            <SellerServicesData>
              <ProductServicesData>
                <CartServicesData>
                  <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/seller/signup" element={<SellerSignupPage />}/>
                    <Route path="/seller/login" element={<SellerLoginPage />}/>
                    <Route path="/seller/verify-account" element={<SellerVerifyAccountPage />}/>
                    <Route path="/seller/forgot-password" element={<SellerForgotPasswordPage />}/>
                    <Route path="/seller/:sellerId/profile" element={<SellerProfilePage />}/>
                    <Route path="/listings" element={<SellerListingsPage />}/>
                    <Route path="/listings/:productId" element={<SellerProductPage />}/>
                    <Route path="/list" element={<SellerListProductPage />}/>
                    <Route path="/listing/:productId" element={<ProductPage />}/>
                    <Route path="/signup" element={<UserSignupPage />}/>
                    <Route path="/verify-account" element={<UserVerifyAccountPage />}/>
                    <Route path="/login" element={<UserLoginPage />}/>
                    <Route path="/forgot-password" element={<UserForgotPasswordPage />}/>
                    <Route path="/:userId/profile/details" element={<UserProfilePage />}/>
                    <Route path="/:userId/cart" element={<UserCartPage />}/>
                  </Routes>
                </CartServicesData>
              </ProductServicesData>
            </SellerServicesData>
          </UserServicesData>
        </AuthData>
      </Router>
    </>
  );
}

export default App;
