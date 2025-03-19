import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProducts from "../pages/shop/productDetils/SingleProducts";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashbordLayout from "../pages/dashbord/DashbordLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashbord/users/dashbord/UserDMain";
import UserOrders from "../pages/dashbord/users/UserOrders";
import OrderDetails from "../pages/dashbord/users/OrderDetails";
import UserPayment from "../pages/dashbord/users/UserPayment";
import UserReviews from "../pages/dashbord/users/UserReviews";
import UserProfile from "../pages/dashbord/users/UserProfile";
import AdminDMain from "../pages/dashbord/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashbord/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashbord/admin/manageProduct/ManageProduct";
import UpdatedProduct from "../pages/dashbord/admin/manageProduct/UpdatedProduct";
import ManageUser from "../pages/dashbord/admin/users/ManageUser";
import ManageOrder from "../pages/dashbord/admin/manageOrder/ManageOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:id", element: <SingleProducts /> },
      { path: "/success", element: <PaymentSuccess /> },
      { path: "/orders/:orderId", element: <OrderDetails /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // dashBord satrs
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashbordLayout />
      </PrivateRoute>
    ), //use privet routes
    children: [
      // user routes
      { path: "", element: <UserDMain /> },
      { path: "orders", element: <UserOrders /> },
      { path: "payments", element: <UserPayment /> },
      { path: "profile", element: <UserProfile /> },
      { path: "reviews", element: <UserReviews /> },

      // admin routes include role filed
      {
        path: "admin",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminDMain />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute role={"admin"}>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role={"admin"}>
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role={"admin"}>
            <UpdatedProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role={"admin"}>
            <ManageUser />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role={"admin"}>
            <ManageOrder />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
