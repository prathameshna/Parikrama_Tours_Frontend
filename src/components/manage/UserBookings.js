import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/manageTours.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideNav from "../header/SideNav";
import ReviewModal from "../auth/ReviewModal";

function UserBookings() {
  const userData = useSelector((state) => state.user);
  const [userId, setUserId] = useState(userData ? userData._id : "");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTourName, setSelectedTourName] = useState("");
  const [selectedTourId, setSelectedTourId] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (userData) {
      setUserId(userData._id);
    }
  }, [userData]);
  // console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/v1/booking/${userId}`
        );
        const bookedTours = response.data;
        setBookings(bookedTours.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel your booking? This action cannot be undone."
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${base_url}/api/v1/booking/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Booking has been canceled");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (tourName, tourId) => {
    setSelectedTourName(tourName);
    setSelectedTourId(tourId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTourName(null);
    setSelectedTourId(null);
  };

  const handleSubmitReview = async (tourId, review, rating) => {
    try {
      const url = `${base_url}/api/v1/reviews`;
      const data = {
        review,
        rating,
        tour: tourId,
        user: userData._id,
      };
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.status === "success") {
        toast.success("Thank you for giving review");
      } else {
        console.log("responseData error", responseData);
      }
    } catch (error) {
      toast.error("You already gave the review!");
    }
  };

  if (error) {
    return (
      <div className="text-center" style={{ margin: "5rem", fontSize: "2rem" }}>
        Error loading tour data. Please try again later.
      </div>
    );
  }

  return (
    <main className="main1">
      <div className="user-view">
        <SideNav
          isAdmin={userData.role === "admin" || userData.role === "lead-guide"}
        />
        <div className="user-view__content">
          <div className="event-schedule-area-two bg-color pad100">
            <div className="container">
              <h1 className="h1-title">Your Bookings</h1>
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade active show"
                      id="home"
                      role="tabpanel"
                    >
                      {bookings.length > 0 && (
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Tour Name
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Start Date
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Members
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Price
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Total Price
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  Cancel Booking
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((booking) => {
                                const startDate = new Date(booking.startDate);
                                const today = new Date();
                                const showReviewButton = startDate < today; // Compare dates

                                return (
                                  <tr key={booking._id} className="inner-box">
                                    <td scope="row">
                                      <div className="text-user">
                                        {booking.tourName}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-user">
                                        {startDate.toLocaleDateString("en-US", {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-user">
                                        {booking.members}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-user">
                                        {booking.price}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-user">
                                        {booking.totalPrice}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="event-wrap">
                                        {showReviewButton ? ( // Render the appropriate button based on the comparison
                                          <button
                                            className="btn btn--small btn--yellow"
                                            type="button"
                                            onClick={() =>
                                              handleOpenModal(
                                                booking.tourName,
                                                booking.tourId
                                              )
                                            }
                                          >
                                            Give Your Review
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn--small btn--red"
                                            type="button"
                                            onClick={() =>
                                              handleDeleteBooking(booking._id)
                                            }
                                          >
                                            Cancel Booking
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            {showModal && (
                              <ReviewModal
                                tourName={selectedTourName}
                                tourId={selectedTourId}
                                onClose={handleCloseModal}
                                onSubmit={handleSubmitReview}
                              />
                            )}
                          </table>
                        </div>
                      )}
                      {bookings.length === 0 && (
                        <p className="no-data">You have no tour bookings.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserBookings;
