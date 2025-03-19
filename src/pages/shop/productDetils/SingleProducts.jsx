import React from "react";
import { Link, useParams } from "react-router";
import RattingStars from "../../../components/RattingStars";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewCart from "../reviews/ReviewCart";

const SingleProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const product = data?.data;
  const singleProduct = product?.result || {};
  const productReviews = product?.reviews || [];

  // console.log(singleProduct);
  // console.log(productReviews);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong! {error.message}</p>;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <section className="section__container bg-[#f4e5ec] ">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-[#ed3849]">
            <Link to={"/"}>Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-[#ed3849]">
            <Link to={"/shop"}>Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-[#ed3849]">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="rounded-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3
              className="text-2xl font-semibold"
              style={{ marginBottom: "16px" }}
            >
              {singleProduct.name}
            </h3>
            <p
              className="text-xl text-[#ed3849]"
              style={{ marginBottom: "16px" }}
            >
              ${singleProduct?.price}{" "}
              {singleProduct?.oldPrice && <s>${singleProduct?.oldPrice}</s>}
            </p>
            <p className="text-gray-400" style={{ marginBottom: "16px" }}>
              {singleProduct?.description}
            </p>

            {/* aditional product info */}
            <div className="flex flex-col gap-2">
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Ratting: </strong>
                <RattingStars rating={singleProduct?.rating} />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation(), handleAddToCart(singleProduct);
              }}
              className="  bg-[#ed3849] text-white rounded-md"
              style={{ marginTop: "1.5rem", padding: "8px 16px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* display review */}
      {/* Todo */}
      <section className="section__container" style={{ marginTop: "2rem" }}>
        <ReviewCart productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProducts;
