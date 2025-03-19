import { Link, NavLink, useNavigate } from "react-router";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/add-product", label: "Add Product" },
  { path: "/dashboard/manage-products", label: "Manage Products" },
  { path: "/dashboard/users", label: "Users" },
  { path: "/dashboard/manage-orders", label: "Manage order" },
];

const AdminDashbord = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  return (
    <div
      style={{ padding: "30px", }}
      className="space-y-5 bg-white md:h-screen  flex flex-col justify-between"
    >
      <div>
        <div className="nav__logo">
          <Link to={"/"}>
            Lebaba<span>.</span>
          </Link>
          <p className="text-xs italic">Admin Dashboard</p>
        </div>
        <hr style={{ marginTop: "20px" }} />
        <ul style={{ marginTop: "15px" }} className="space-y-5">
          {navItems.map((item) => (
            <li style={{ marginTop: "15px" }} key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-black"
                }
                to={item.path}
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <hr style={{ marginBottom: "12px" }} />
        <button
          onClick={handleLogout}
          style={{ padding: "4px 20px" }}
          className="text-white bg-primary font-medium rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashbord;
