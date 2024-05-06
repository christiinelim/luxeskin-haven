import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthServicesData } from './context/AuthContext';
import { SellerServicesData } from './context/SellerContext'
import { ProductServicesData } from './context/ProductContext';
import { UserServicesData } from './context/UserContext';
import { CartServicesData } from './context/CartContext';
import { CartoutServicesData } from './context/CartoutContext';
import { OrderServicesData } from './context/OrderContext';

import SellerSignupPage from './views/seller/SellerSignupPage';
import HomePage from './views/HomePage';
import ProductPage from './views/ProductPage';
import SellerLoginPage from './views/seller/SellerLoginPage';
import SellerVerifyAccountPage from './views/seller/SellerVerifyAccountPage';
import SellerProfilePage from './views/seller/SellerProfilePage';
import SellerForgotPasswordPage from './views/seller/SellerForgotPasswordPage';
import SellerListingsPage from './views/seller/SellerListingsPage';
import SellerProductPage from './views/seller/SellerProductPage';
import SellerListProductPage from './views/seller/SellerListProductPage';
import UserSignupPage from './views/UserSignupPage';
import UserVerifyAccountPage from './views/UserVerifyAccountPage';
import UserLoginPage from './views/UserLoginPage';
import UserForgotPasswordPage from './views/UserForgotPasswordPage';
import UserProfilePage from './views/UserProfilePage';
import UserCartPage from './views/UserCartPage';
import UserOrderPage from './views/UserOrderPage';
import ShopProductsPage from './views/ShopProductsPage';
import SellerOrdersPage from './views/seller/SellerOrdersPage';
import CollectionsPage from './views/CollectionsPage';
import ContactPage from './views/ContactPage';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <AuthServicesData>
          <UserServicesData>
            <SellerServicesData>
              <ProductServicesData>
                <CartServicesData>
                  <CartoutServicesData>
                    <OrderServicesData>
                      <Routes>
                        {/* GENERAL ROUTES */}
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/listing/:productId" element={<ProductPage />}/>
                        <Route path="/shop" element={<ShopProductsPage />}/>
                        <Route path="/shop/search-product" element={<ShopProductsPage />}/>
                        <Route path="/collections" element={<CollectionsPage />}/>
                        <Route path="/contact-us" element={<ContactPage />}/>

                        {/* SELLER PLATFORM ROUTES */}
                        <Route path="/seller/signup" element={<SellerSignupPage />}/>
                        <Route path="/seller/login" element={<SellerLoginPage />}/>
                        <Route path="/seller/verify-account" element={<SellerVerifyAccountPage />}/>
                        <Route path="/seller/forgot-password" element={<SellerForgotPasswordPage />}/>

                        {/* SELLER PROTECTED ROUTES */}
                        <Route path="/seller/:sellerId/profile" element={<PrivateRoute Component={SellerProfilePage} status={'seller'}/>}/>
                        <Route path="/seller/listings" element={<PrivateRoute Component={SellerListingsPage} status={'seller'}/>}/>
                        <Route path="/seller/listings/:productId" element={<PrivateRoute Component={SellerProductPage} status={'seller'}/>}/>
                        <Route path="/seller/list" element={<PrivateRoute Component={SellerListProductPage} status={'seller'}/>}/>
                        <Route path="/seller/orders" element={<PrivateRoute Component={SellerOrdersPage} status={'seller'}/>}/>

                        {/* USER ROUTES */}
                        <Route path="/signup" element={<UserSignupPage />}/>
                        <Route path="/verify-account" element={<UserVerifyAccountPage />}/>
                        <Route path="/login" element={<UserLoginPage />}/>
                        <Route path="/forgot-password" element={<UserForgotPasswordPage />}/>

                        {/* USER PROTECTED ROUTES */}
                        <Route path="/profile/details" element={<PrivateRoute Component={UserProfilePage} status={'user'}/>}/>
                        <Route path="/profile/orders" element={<PrivateRoute Component={UserOrderPage} status={'user'}/>}/>
                        <Route path="/cart" element={<PrivateRoute Component={UserCartPage} status={'user'}/>}/>
                      </Routes>
                    </OrderServicesData>
                  </CartoutServicesData>
                </CartServicesData>
              </ProductServicesData>
            </SellerServicesData>
          </UserServicesData>
        </AuthServicesData>
      </Router>
    </>
  );
}

export default App;
