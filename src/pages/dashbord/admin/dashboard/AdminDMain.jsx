import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import AdminStats from "./AdminStats";
import AdminstatsChart from "./AdminstatsChart";

const AdminDMain = () => {
  const { data: user } = useSelector((state) => state.auth);
  const { data: adminData, error, isLoading } = useGetAdminStatsQuery();
  const stats = adminData?.data;
  if (isLoading) return <div>Loading...</div>;
  if (!stats) return <div>No stats found.</div>;

  if (error) return <div>Faild to load stats!</div>;

  return (
    <div style={{ padding: "24px" }}>
      <div>
        <h1 style={{ marginBottom: "16px" }} className="text-2xl font-semibold">
          Admin Dashbord
        </h1>
        <p className="text-gray-500">
          Hi, {user?.username}! Welcome to the admin dashboard.
        </p>

        <AdminStats stats={stats} />
        <AdminstatsChart stats={stats}/>
      </div>
    </div>
  );
};

export default AdminDMain;
