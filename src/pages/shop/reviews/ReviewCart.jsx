import { useState } from "react";
import commentIcon from "../../../assets/avatar.png";
import RattingStars from "../../../components/RattingStars";
import { formetDate } from "../../../utils/formetDate";
import PostAReview from "./PostAReview";
const ReviewCart = ({ productReviews }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const reviews = productReviews || [];
  const handleOpenReviewModel = () => {
    setIsModelOpen(true);
  };
  const handleCloseReviewModel = () => {
    setIsModelOpen(false);
  };
  return (
    <div style={{ padding: "32px", margin: "24px 0" }} className="bg-white">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Commented .... </h3>
            <div>
              {reviews.map((review) => (
                <div
                  key={review._id}
                  style={{ marginTop: "16px" }}
                  className=""
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={commentIcon}
                      style={{ width: "56px", height: "56px" }}
                      alt="avatar"
                      className=""
                    />

                    <div className="space-y-1">
                      <p
                        style={{ marginTop: "4px" }}
                        className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400"
                      >
                        {review?.userId?.username}
                      </p>
                      <p
                        style={{ marginTop: "4px" }}
                        className="text-[12px] italic"
                      >
                        {formetDate(review?.createdAt)}
                      </p>
                      <div style={{ marginTop: "4px" }}>
                        <RattingStars rating={review?.rating} />
                      </div>
                    </div>
                  </div>
                  {/* comment */}
                  <div
                    style={{ marginTop: "20px", padding: "24px" }}
                    className="text-gray-600 border rounded-md border-gray-200"
                  >
                    <p className=" md:w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>No reviews</h2>
          </div>
        )}
      </div>

      {/* add reviews */}
      <div style={{ marginTop: "48px" }}>
        <button
          onClick={handleOpenReviewModel}
          style={{ padding: "12px 24px", marginTop: "10px" }}
          className="bg-primary text-white rounded-md"
        >
          Add A Review
        </button>
      </div>
      {/* review model */}
      <PostAReview isModelOpen={isModelOpen} handleClose={handleCloseReviewModel}/>
    </div>
  );
};

export default ReviewCart;
