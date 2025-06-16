import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Signup from "./Pages/Signup";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import TodaysDeals from "./Pages/TodaysDeals";
import Cart from "./Pages/Cart";
import SearchResults from "./Pages/SearchResults";
import BrowseProducts from "./Pages/BrowseProducts";
import User from "./Pages/User";
import Orders from "./Pages/Orders";
import Benefits from "./Pages/Benefits";
import Payments from "./Pages/Payments";
import Addresses from "./Pages/Addresses";
import CommunicationPreferences from "./Pages/Communication";
import LoginAndSecurity from "./Pages/Security";
import Checkout from "./Pages/Checkout";

const App = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-white text-black flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/deals" element={<TodaysDeals />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/browse" element={<BrowseProducts />} />
              <Route path="/user" element={<User />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/prime" element={<Benefits />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route
                path="/communication"
                element={<CommunicationPreferences />}
              />
              <Route path="/security" element={<LoginAndSecurity />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </Router>
    </>
  );
};

export default App;
