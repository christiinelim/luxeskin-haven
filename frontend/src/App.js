import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerSignupPage from './views/seller/SellerSignupPage';
import HomePage from './views/HomePage';
import SellerLoginPage from './views/seller/SellerLoginPage';

function App() {
  return (
    <>
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/seller/signup" element={<SellerSignupPage />}/>
          <Route path="/seller/login" element={<SellerLoginPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
