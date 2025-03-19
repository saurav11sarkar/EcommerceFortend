import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import { getBaseUrl } from "../../utils/baseUrl";

const OrderSummery = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  console.log(data);
  const products = useSelector((state) => state.cart.products);
  console.log("prodct", products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClear = () => {
    dispatch(clearCart());
  };

  // payment intregation
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLIC_KEY);
      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }

      const body = {
        products: products,
        userId: data?._id,
      };

      const response = await fetch(
        `${getBaseUrl()}/api/orders/create-chackout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData); // Debugging

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      if (!responseData?.data?.id) {
        throw new Error("Invalid session ID received");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: responseData.data.id,
      });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error);
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
    }
  };

  return (
    <div className="bg-primary-light rounded text-base">
      <div style={{ padding: "16px 24px" }} className="space-y-5">
        <h2 className="text-xl text-text-dark">Order Summery</h2>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Selected Item: {selectedItems}
        </p>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Total Price: {totalPrice.toFixed(2)}
        </p>
        <p style={{ marginTop: "8px" }} className="text-text-dark">
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 style={{ marginTop: "8px" }} className="font-bold">
          GrandTotal : ${grandTotal.toFixed(2)}
        </h3>

        <div style={{ padding: "0px 16px", marginBottom: "24px" }} className="">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            style={{
              padding: "6px 12px",
              marginBottom: "16px",
              marginTop: "20px",
            }}
            className="bg-red-500 text-white rounded-md flex justify-between items-center"
          >
            <span>Clear cart</span>{" "}
            <i
              style={{ marginLeft: "8px" }}
              className="ri-delete-bin-6-line"
            ></i>{" "}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              makePayment();
            }}
            style={{ padding: "6px 12px", marginTop: "20px" }}
            className="bg-green-500 text-white rounded-md flex justify-between items-center"
          >
            <span>Proced Checkout</span>{" "}
            <i style={{ marginLeft: "8px" }} className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
