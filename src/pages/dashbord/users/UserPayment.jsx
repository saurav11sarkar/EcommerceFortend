import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";

const UserPayment = () => {
  const { data: user } = useSelector((state) => state.auth);
  const {
    data: userPayment,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);
  const orders = userPayment?.data || []; //object
  console.log(orders);

  const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0);
  console.log(totalPayment);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No order found!</div>;
  return (
    <div style={{ padding: "24px 16px" }}>
      <h3 style={{ marginBottom: "16px" }} className="text-xl font-semibold">
        Total Payments
      </h3>
      <div>
        <p style={{paddingBottom:"24px"}} className="text-lg font-medium text-gray-800">Total Spent: ${totalPayment || 0}</p>
        <ul>
          {orders &&
            orders.map((item, index) => (
              <li key={index}>
                <h5
                  style={{ marginBottom: "8px" }}
                  className="font-medium text-gray-800"
                >
                  Order # {index + 1}
                </h5>
                <div>
                  <span className="text-gray-600">Order # ${item?.amount}</span>
                </div>
                <div className="flex md:flex-row gap-2">
                  <span>
                    Date : {new Date(item?.createdAt).toLocaleString()}
                  </span>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      style={{ marginLeft: "8px", padding: "2px 2px" }}
                      className={`text-sm rounded ${
                        item?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item?.status === "pending"
                          ? "bg-red-200 text-red-700"
                          : item?.status === "processing"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </p>
                </div>
                <hr style={{margin:"8px 0"}} className="border border-gray-300" />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPayment;
