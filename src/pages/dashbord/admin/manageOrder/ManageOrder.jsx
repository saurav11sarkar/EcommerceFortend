import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/orderApi";
import { formetDate } from "../../../../utils/formetDate";
import { Link } from "react-router";
import UpdateOrderModel from "./UpdateOrderModel";

const ManageOrder = () => {
  const [selectOrder, setSelectOrder] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { data: orderData, error, isLoading, refetch } = useGetAllOrdersQuery();
  const orders = orderData?.data;
  const [deleteOrder] = useDeleteOrderMutation();
  console.log(orders);

  const handleEditOrder = (order) => {
    setSelectOrder(order);
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setSelectOrder(null);
  };

  const handleDeletedOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order delete successfully");
      await refetch();
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went worng</div>;
  }

  return (
    <div style={{ padding: "24px" }} className="section__container">
      <h2 style={{ marginBottom: "16px" }} className="text-2xl font-semibold">
        Manage Order
      </h2>
      <table
        style={{ minWidth: "100%" }}
        className="min-w-full bg-white border-gray-200 rounded-lg"
      >
        <thead className="bg-gray-100">
          <tr>
            <th style={{ padding: "12px 4px" }} className="border-b">
              Order Id
            </th>
            <th style={{ padding: "12px 4px" }} className="border-b">
              Customer
            </th>
            <th style={{ padding: "12px 4px" }} className="border-b">
              Status
            </th>
            <th style={{ padding: "12px 4px" }} className="border-b">
              Date
            </th>
            <th style={{ padding: "12px 4px" }} className="border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={index} className="text-xs">
                <td style={{ padding: "12px 12px" }} className="border-b">
                  {/* {order?.orderId.split("_")[1]} //pi_ split  */}
                  {order?.orderId.split("_")[1]}
                </td>
                <td style={{ padding: "12px 12px" }} className="border-b">
                  {order?.email}
                </td>
                <td style={{ padding: "12px 12px" }} className="border-b">
                  <span
                    style={{ padding: "4px 12px" }}
                    className={`inline-block text-xs text-white rounded-full ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </td>
                <td style={{ padding: "12px 12px" }} className="border-b">
                  {formetDate(order?.updatedAt)}
                </td>
                <td style={{ padding: "12px 12px" }} className="border-b ">
                  <div
                    style={{
                      marginInlineEnd: "16px",
                      marginInlineStart: "16px",
                    }}
                    className="flex items-center  justify-between"
                  >
                    <Link
                      to={`#`}
                      className="text-blue-500 hover:underline hover:text-blue-700"
                    >
                      View
                    </Link>
                    <button
                      className="text-green-500 hover:underline hover:text-green-700"
                      onClick={() => handleEditOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline hover:text-red-700"
                      onClick={() => handleDeletedOrder(order?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* update order model */}
      {selectOrder && (
        <UpdateOrderModel
          order={selectOrder}
          isOpen={isModelOpen}
          onClose={handleCloseModel}
        />
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

export default ManageOrder;
