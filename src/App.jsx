import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Restaurant from "./components/restuarant/Restuarant";
import State from "./components/states/State";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import Wishlist from "./components/wishlist/Wishlight";
import Cart from "./components/cart/Cart";
import WishlistRestaurants from "./components/restuarant/WishlistRestaurants";
import Register from "./components/Account/Register";
import Login from "./components/Account/Login";
import Payment from "./components/payment/Payment";
function App() {
  return (
    <Router>
      <Navbar /> 
      <main className="content"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/states" element={<State />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/WishlistRestaurants" element={<WishlistRestaurants />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
