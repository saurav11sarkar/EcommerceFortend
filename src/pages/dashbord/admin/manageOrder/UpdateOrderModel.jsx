import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi";

const UpdateOrderModel = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status);
  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();
  const handleUpdateorderStatus = async () => {
    try {
      await updateOrderStatus({ id: order?._id, status });
      onClose();
    } catch (error) {
      console.log("Failed to update order status", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div
        style={{ padding: "24px" }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

        <div style={{ marginBottom: "16px" }} className="mb-4">
          <label
            style={{ marginBottom: "16px" }}
            className="block text-gray-700 mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            style={{ padding: "8px" }}
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            style={{ padding: "8px 16px" }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateorderStatus}
            style={{ padding: "8px 16px" }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModel;
