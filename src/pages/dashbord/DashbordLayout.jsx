import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import UserDashbord from "./UserDashbord";
import AdminDashbord from "./AdminDashbord";

const DashbordLayout = () => {
  const { data } = useSelector((state) => state.auth);
  if (!data) {
    return <Navigate to={"/login"} replace />;
  }
  const randerDashbord = () => {
    switch (data?.role) {
      case "admin":
        return <AdminDashbord />;
      case "user":
        return <UserDashbord />;
      default:
        return <Navigate to="/login" replace />;
    }
  };
  return (
    <div
      style={{ margin: "auto" }}
      className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start"
    >
      <header className="lg:w-1/5 sm:w-2/5 w-full border border-gray-300">
        {randerDashbord()}
      </header>
      <main
        style={{ padding: "32px", marginTop: "20px" }}
        className="bg-white w-full border border-gray-300"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashbordLayout;
