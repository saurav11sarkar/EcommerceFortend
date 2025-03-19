import { useSelector } from "react-redux";
import { useGetReviewsQuery } from "../../../redux/features/reviews/reviewsApi";
import { useNavigate } from "react-router";

const UserReviews = () => {
  const navigate = useNavigate();
  const { data: user } = useSelector((stats) => stats.auth);
  const { data: userReviews, error, isLoading } = useGetReviewsQuery(user?._id);
  const reviews = userReviews?.data;
  // console.log(reviews);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Faild to load reviews</div>;

  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <div style={{ padding: "24px 0" }}>
      <h2 style={{ marginBottom: "32px" }} className="text-2xl font-bold">
        Your given reviews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {reviews &&
          reviews.map((review, index) => (
            <div
              style={{ padding: "16px" }}
              key={index}
              className="bg-white shadow-md rounded-xl border-gray-200 border cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <p
                style={{ marginBottom: "8px" }}
                className="text-lg font-semibold"
              >
                Rating: {review?.rating}
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Comment: </strong> {review?.comment}
              </p>

              <p className="text-sm text-gray-500">
                <strong>ProductId: </strong> {review?.productId}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Date: </strong>{" "}
                {new Date(review?.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        <div
          onClick={handleCardClick}
          style={{ padding: "24px" }}
          className="bg-gray-100 text-black flex items-center justify-center shadow-md rounded-xl border-gray-200 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 font-medium"
        >
          <span> +</span>
          <p>Add New reviews</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
