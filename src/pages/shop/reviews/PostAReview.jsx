import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";

const PostAReview = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.auth);
  // console.log(data);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRatting = (star) => {
    setRating(star);
  };
  // submit handler
  const handlePostReview = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      rating,
      userId: data?._id,
      productId: id,
    };
    try {
      const res = await postReview(newComment).unwrap();
      console.log(JSON.stringify(res.data));
      alert(res.message);
      setComment("");
      setRating(0);
      refetch();
    } catch (error) {
      console.log(error);
      alert(error?.data?.message);
    }
    handleClose();
  };

  return (
    <div
      style={{ padding: "0 8px" }}
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 ${
        isModelOpen ? "block" : "hidden"
      }`}
    >
      <div
        style={{ padding: "24px" }}
        className="bg-white rounded-md shadow-lg w-96 max-w-md z-50"
      >
        <h2
          style={{ marginBottom: "16px" }}
          className="text-lg font-medium mb-4"
        >
          Post A Review
        </h2>
        <div style={{ marginBottom: "16px" }} className="flex items-center">
          {/* ratting */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              onClick={() => handleRatting(star)}
              key={star}
              className=" text-lg text-yellow-500 cursor-pointer"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>
        {/* comment */}
        <div>
          <textarea
            style={{ padding: "12px", marginBottom: "16px" }}
            className="w-full border rounded-md border-gray-200"
            placeholder="Write your review here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            style={{ padding: "10px 20px" }}
            className="bg-gray-300  rounded-md"
          >
            Cancle
          </button>
          <button
            onClick={handlePostReview}
            style={{ padding: "10px 20px" }}
            className="bg-primary text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
