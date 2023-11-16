import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
// Components
import Login from "./components/auth/LoginUser";
import Signup from "./components/auth/SignupUser";
import UpdateUser from "./components/auth/UpdateUser";
import UserTours from "./components/manage/UserBookings";
import ResetPassword from "./components/auth/ResetPassword";
import Home from "./components/homepage/Home";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import TourDetails from "./components/tourDetails/TourDetails";
import UpdateTour from "./components/tourDetails/UpdateTour";
import AddTour from "./components/tourDetails/AddTour";
import ManageTours from "./components/manage/ManageTours";
import ManageUsers from "./components/manage/ManageUsers";
import ManageReviews from "./components/manage/ManageReviews";
import UserBookings from "./components/manage/UserBookings";
import UserReviews from "./components/manage/UserReviews";
import ManageBookings from "./components/manage/ManageBookings";
import DemoUsers from "./components/auth/DemoUsers";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />

        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/top-6-cheap" element={<Home />} />
          <Route exact path="/tour-details/:id" element={<TourDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/demo-users" element={<DemoUsers />} />
          <Route exact path="/user-profile" element={<UpdateUser />} />
          <Route exact path="/my-tours" element={<UserBookings />} />
          <Route exact path="/my-reviews" element={<UserReviews />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/manage-reviews"
            element={<ProtectedRoute Component={ManageReviews} />}
          />
          <Route
            path="/manage-users"
            element={<ProtectedRoute Component={ManageUsers} />}
          />
          <Route
            path="/tour-update/:id"
            element={<ProtectedRoute Component={UpdateTour} />}
          />
          <Route
            path="/add-tour"
            element={<ProtectedRoute Component={AddTour} />}
          />
          <Route
            path="/manage-tours/:year"
            element={<ProtectedRoute Component={ManageTours} />}
          />
          <Route
            path="/manage-bookings"
            element={<ProtectedRoute Component={ManageBookings} />}
          />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
