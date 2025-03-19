const UserStats = ({ state }) => {
  return (
    <div style={{ margin: "20px 0" }} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        <div
          style={{ padding: "24px" }}
          className="border border-gray-200 hover:border-primary cursor-pointer bg-white shadow-md rounded-lg hover:scale-105 transition-all duration-200"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
            Total Payments
          </h2>
          <p className="text-2xl font-bold">${state.totalPayments}</p>
        </div>

        <div
          style={{ padding: "24px" }}
          className="border border-gray-200 hover:border-primary cursor-pointer bg-white shadow-md rounded-lg hover:scale-105 transition-all duration-200"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
          Toal Reviews
          </h2>
          <p className="text-2xl font-bold">{state.totalReviews}</p>
        </div>

        <div
          style={{ padding: "24px" }}
          className="border border-gray-200 hover:border-primary cursor-pointer bg-white shadow-md rounded-lg hover:scale-105 transition-all duration-200"
        >
          <h2 style={{ marginBottom: "8px" }} className="text-xl font-semibold">
          Total Products
          </h2>
          <p className="text-2xl font-bold">{state.totalPurchasedProducts}</p>
        </div>

      </div>
    </div>
  );
};

export default UserStats;
