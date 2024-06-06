import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/manageTours.css";
import { useSelector } from "react-redux";
import SideNav from "../header/SideNav";
import { toast } from "react-toastify";

function UserReviews() {
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState(user ? user._id : "");
  const [reviewData, setReviewData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState(false);
  const [tourName, setTourName] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Set user ID if user is available
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/reviews`);

      const filteredReviews = response.data.data.data.filter(
        (review) => review.user._id === userId
      );
      // console.log("filteredReviews: ", filteredReviews);

      setReviewData(
        filteredReviews.map((review) => ({
          _id: review._id,
          review: review.review,
          rating: review.rating,
          tour: review.tour,
        }))
      );

      const tourIds = filteredReviews.map((review) => review.tour);
      const tourName = tourIds.map((tour) => tour.name);
      setTourName(tourName);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  const handleUpdateReview = async (id, index) => {
    const url = `${base_url}/api/v1/reviews/${id}`;
    const reviewToUpdate = reviewData.find((review) => review._id === id);

    if (!reviewToUpdate) {
      // Review not found in the state, handle the error as needed
      console.error("Review not found in the state.");
      return;
    }

    const data = {
      review: reviewToUpdate.review,
      rating: reviewToUpdate.rating,
    };

    try {
      await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Review has been updated");
      setEditingIndex(-1);
    } catch (error) {
      console.log(error);
      toast.error("Rating should be betweem 1 to 5.");
    }
  };

  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete review? This action cannot be undone."
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${base_url}/api/v1/reviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Review has been deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUpdate = () => {
    setEditingIndex(-1);
  };

  // if (error) {
  //   return (
  //     <div className="text-center" style={{ margin: "5rem", fontSize: "2rem" }}>
  //       Error loading tour data. Please try again later.
  //     </div>
  //   );
  // }

  return (
    <main className="main1">
      <div className="user-view">
        <SideNav
          isAdmin={user.role === "admin" || user.role === "lead-guide"}
        />
        <div className="user-view__content">
          <div className="event-schedule-area-two bg-color pad100">
            <div className="container">
              <h1 className="h1-title">You Reviews</h1>
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade active show"
                      id="home"
                      role="tabpanel"
                    >
                      {reviewData.length > 0 && (
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  TOUR
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  REVIEW
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  RATINGS
                                </th>
                                <th
                                  className="text-center title-list"
                                  scope="col"
                                >
                                  UPDATE / DELETE
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviewData.map((review, index) => (
                                <tr key={review._id} className="inner-box">
                                  <td>
                                    <div className="text-user">
                                      {tourName[index]}
                                    </div>
                                  </td>
                                  <td>
                                    {editingIndex === index ? (
                                      <div className="text-user">
                                        <textarea
                                          id="name"
                                          className="form__input__review form__input"
                                          value={review.review}
                                          required
                                          onChange={(e) =>
                                            setReviewData((prevReviewData) => {
                                              const updatedReviewData = [
                                                ...prevReviewData,
                                              ];
                                              updatedReviewData[index].review =
                                                e.target.value;
                                              return updatedReviewData;
                                            })
                                          }
                                        ></textarea>
                                      </div>
                                    ) : (
                                      <div className="text-user">
                                        {review.review}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {editingIndex === index ? (
                                      <div className="text-user">
                                        <input
                                          id="name"
                                          className="form__input__rating form__input"
                                          type="number"
                                          value={review.rating}
                                          required
                                          name="rating"
                                          onChange={(e) =>
                                            setReviewData((prevReviewData) => {
                                              const updatedReviewData = [
                                                ...prevReviewData,
                                              ];
                                              updatedReviewData[index].rating =
                                                e.target.value;
                                              return updatedReviewData;
                                            })
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div className="text-user">
                                        {review.rating}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    <div className="event-wrap">
                                      {editingIndex === index ? (
                                        <>
                                          {/* Save Review and Cancel buttons */}
                                          <button
                                            className="btn btn--small btn--yellow"
                                            type="button"
                                            onClick={() =>
                                              handleUpdateReview(
                                                review._id,
                                                index
                                              )
                                            }
                                            style={{ color: "#444" }}
                                          >
                                            Save Review
                                          </button>
                                          <button
                                            className="btn btn--small btn-light"
                                            type="button"
                                            onClick={handleCancelUpdate}
                                          >
                                            Cancel
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          {/* Update Review and Delete Review buttons */}
                                          <button
                                            className="btn btn--small btn--yellow"
                                            type="button"
                                            onClick={() =>
                                              setEditingIndex(index)
                                            }
                                            style={{ color: "#444" }}
                                          >
                                            Update Review
                                          </button>
                                          <button
                                            className="btn btn--small btn--red"
                                            type="button"
                                            onClick={() =>
                                              handleDeleteReview(review._id)
                                            }
                                          >
                                            Delete Review
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {reviewData.length === 0 && (
                        <p className="no-data">You did not review any tour.</p>
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

export default UserReviews;
