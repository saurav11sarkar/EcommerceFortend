import React from "react";

const AdminStats = ({ stats }) => {
  console.log(stats);
  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginTop: "16px" }} className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <div
          style={{ padding: "24px" }}
          className="bg-white shadow-md rounded-lg border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
            Total Earning
          </h2>
          <p className="text-2xl font-bold">{stats?.totalEarning.toFixed(2)}</p>
        </div>

        <div
          style={{ padding: "24px" }}
          className="bg-white shadow-md rounded-lg border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
            All Orders
          </h2>
          <p className="text-2xl font-bold">{stats?.totalOrders}</p>
        </div>

        <div
          style={{ padding: "24px" }}
          className="bg-white shadow-md rounded-lg border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
            All user
          </h2>
          <p className="text-2xl font-bold">{stats?.totalUsers}</p>
        </div>

        <div
          style={{ padding: "24px" }}
          className="bg-white shadow-md rounded-lg border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
            Total products
          </h2>
          <p className="text-2xl font-bold">{stats?.totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
