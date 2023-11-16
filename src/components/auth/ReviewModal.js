import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import icons from "../../utils/images/icons.svg";
import "./css/reviewModal.css";

function ReviewModal({ tourName, tourId, onClose, onSubmit }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // Initialize with 0 to represent no rating given
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (!review || !rating) {
      setFormSubmitted(true);
      return;
    }

    onSubmit(tourId, review, rating);
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="custom-header__modal">
          Give Review for {tourName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card1 mb-4">
          <div className="card-body p-4 custom-modal-body">
            <table className="table table-custom">
              <tbody>
                {/* Your review form content goes here */}
                <tr>
                  <td>
                    <p
                      className="small text-muted mb-4"
                      style={{ textAlign: "initial" }}
                    >
                      Please share your experience:
                    </p>
                    <textarea
                      className={`form__input ${
                        formSubmitted && !review ? "is-invalid" : ""
                      }`}
                      placeholder="Write your review here..."
                      value={review}
                      onChange={handleReviewChange}
                      required
                    />
                    {formSubmitted && !review && (
                      <div
                        className="invalid-feedback"
                        style={{ textAlign: "initial" }}
                      >
                        Review is required.
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex flex-row align-items-center">
                      <p
                        className="small text-muted mb-4 me-3"
                        style={{ textAlign: "initial" }}
                      >
                        Your Rating:
                      </p>
                      <div className="reviews__rating__modal">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`reviews__star__modal ${
                              formSubmitted && rating === 0 ? "is-invalid" : ""
                            } reviews__star--${
                              rating >= star
                                ? "active__modal"
                                : "inactive__modal"
                            }`}
                            onClick={() => handleRatingClick(star)}
                          >
                            <use xlinkHref={`${icons}#icon-star`} />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {formSubmitted && !rating && (
                      <div className="invalid-feedback">
                        Rating is required.
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <span variant="light" className="btn__modal" onClick={onClose}>
          Cancel
        </span>
        <span className="btn__modal btn--green" onClick={handleSubmit}>
          Submit Review
        </span>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
