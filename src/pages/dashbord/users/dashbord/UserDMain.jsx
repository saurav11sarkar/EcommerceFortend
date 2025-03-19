import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as chartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserStats from "./UserStats";
chartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

const UserDMain = () => {
  const { data: user } = useSelector((state) => state.auth);
  const {
    data: statsData,
    error,
    isLoading,
  } = useGetUserStatsQuery(user?.email);
  const stats = statsData?.data;
  console.log(stats);
  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (!stats)
    return <div className="text-center text-gray-500">No data available</div>;
  // if (error)
  //   return <div className="text-center text-red-500">{error?.message}</div>;

  const data = {
    labels: ["Total Payments", "Toal Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats?.totalPayments,
          stats?.totalReviews * 100,
          stats?.totalPurchasedProducts * 100,
        ],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 1,
      },
    ],
  };
  const option = {
    responsive: true,
    plugins: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          // if (tooltipItem.label === "Total Payments") {
          //   return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
          // }
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  };

  return (
    <div style={{ padding: "24px" }}>
      <div>
        <h1 style={{ marginBottom: "4px" }} className="text-2xl font-semibold">
          User Dashboard
        </h1>
        <p>Hi, {user?.username}! Welcome to your user dashbord</p>
      </div>
      <UserStats state={stats}/>
      <div>
        <Bar data={data} options={option} />
      </div>
    </div>
  );
};

export default UserDMain;
