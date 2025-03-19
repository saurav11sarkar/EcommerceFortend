import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import CartModel from "../pages/shop/CartModel";
import avaterImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // show user if login in
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // dropdown menu
  const [isDropdown, setIsDropdown] = useState(false);
  const handleDropDownToggole = () => {
    setIsDropdown(!isDropdown);
  };

  // admin dropdown menue
  const adminDropdownMenu = [
    { lable: "Dashbord", path: "/dashboard/admin" },
    { lable: "Manage Items", path: "/dashboard/manage-products" },
    { lable: "All Order", path: "/dashboard/manage-orders" },
    { lable: "Add Product", path: "/dashboard/add-product" },
  ];

  // user dropdown menu
  const userDropdownMenu = [
    { lable: "Dashbord", path: "/dashboard" },
    { lable: "Profile", path: "/dashboard/profile" },
    { lable: "Payments", path: "/dashboard/payments" },
    { lable: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenu] : [...userDropdownMenu];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Faild to log out", error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav
        className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center"
        style={{ padding: "16px 0px" }}
      >
        <ul className="nav__links">
          <li className="link">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="link">
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li className="link">
            <Link to={"/pages"}>Pages</Link>
          </li>
          <li className="link">
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
        {/* nav logo */}
        <div className="nav__logo">
          <Link to={"/"}>
            Lebaba<span>.</span>
          </Link>
        </div>
        {/* nav icon */}
        <div className="nav__icons relative">
          <span>
            <Link to={"/search"}>
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button
              onClick={handleCartToggle}
              className=" hover:text-[#ed3849] transition-colors duration-200"
            >
              <i className="ri-shopping-bag-line text-xl"></i>
              <sup
                className=" text-sm inline-block  text-white rounded-full bg-[#ed3849] text-center"
                style={{ padding: "0px 5px" }}
              >
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user && user ? (
              <>
                <img
                  onClick={handleDropDownToggole}
                  src={user?.profileImage || avaterImg}
                  alt={user?.username}
                  style={{ width: "24px", height: "24px" }}
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                {isDropdown && (
                  <div
                    style={{ marginTop: "12px", right: 0, padding: "16px" }}
                    className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <ul
                      style={{ padding: "8px" }}
                      className="font-medium space-y-4"
                    >
                      {dropdownMenus.map((menu, index) => (
                        <li style={{ marginTop: "10px" }} key={index}>
                          <Link
                            onClick={() => setIsDropdown(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.lable}
                          </Link>
                        </li>
                      ))}
                      <li style={{ marginTop: "10px" }}>
                        <Link
                          onClick={handleLogout}
                          className="dropdown-items"
                          // to={"/"}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <i className="ri-user-line"></i>
                </Link>
              </>
            )}
          </span>
        </div>
      </nav>
      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
