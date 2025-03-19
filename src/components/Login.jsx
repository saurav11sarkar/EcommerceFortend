import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await loginUser(userData).unwrap();
      // console.log(JSON.stringify(response));
      const { data } = response;
      dispatch(setUser(data));
      alert(response.message);
      navigate("/");
    } catch (error) {
      setMessage(error?.data?.message);
    }
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <div
        style={{ padding: "24px" }}
        className="max-w-sm border border-gray-100 shadow mx-auto bg-white rounded-md"
      >
        <h2
          style={{ padding: "20px 0px 0px 0px" }}
          className="text-2xl font-semibold"
        >
          Please Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{ padding: "24px 0 0 0" }}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
            style={{ padding: "12px 20px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-md"
            style={{ padding: "12px 20px", margin: "20px 0 10px 0" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && <p className="text-red-500">{message}</p>}
          <button
            style={{ margin: "20px 0 0 0", padding: "10px 0px" }}
            className="w-full bg-primary text-white hover:bg-indigo-500 font-medium rounded-md py-3"
            type="submit"
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "10px" }} className="italic text-sm text-center">
          Don't have an account?{" "}
          <Link
            style={{ textDecoration: "underline" }}
            className="text-red-500 hover:text-red-800"
            to={"/register"}
          >
            Register
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;
