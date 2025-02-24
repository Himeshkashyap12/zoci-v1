import React, { useState } from "react";
import {  ConfigProvider, Input } from "antd";
import { Link, useNavigate } from "react-router";
import { loginWithNumberAndPassword } from "../../feature/auth/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
const SignIn = ({ setSingnin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    mobile: "",
    password: "",
  });
  const inputHandler = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const signInHandler = async () => {
    if (input.mobile.length < 10 || input.mobile == "")
      return toast.error("Please enter valid mobile number");
    if (input.password == "" || input.password.length < 6)
      return toast.error("Please enter valid password");
    try {
      const res = await loginWithNumberAndPassword(input);
      if (res.status) {
        toast.success(res.message);

        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("userId", res.data?._id);
        localStorage.setItem("role", res.data?.role);
        localStorage.setItem("cart", res.data.cart.length);
        localStorage.setItem("wish", res.data.wishlist.length);
        dispatch(loginSuccess({ token: res.data.token, users: res.data }));
        if (res.data.role === "admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setInput({
        mobile: input.mobile,
        password: "",
      });
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#214344",
        },
      }}
    >
      <div className="w-[100%] flex flex-col gap-3  justify-center ">
        <Input
          type="number"
          name="mobile"
          value={input.mobile}
          onChange={(e) => {
            inputHandler(e);
          }}
          placeholder="Enter mobile Number "
          className="w-[100%] px-4 py-2 rounded-full"
        />
        <Input.Password
          name="password"
          value={input.password}
          onChange={(e) => {
            inputHandler(e);
          }}
          placeholder="Enter Password"
          className="w-[100%] px-4 py-2 rounded-full"
        />
        <button
          onClick={() => {
            signInHandler();
          }}
          className="w-[100%] bg-[#214344] text-[#fff] rounded-full py-2 "
        >
          Sign in
        </button>
        <div className="pt-4 flex justify-center ">
          <Link
            className="text-[#214334] font-[400] text-[16px] hover:text-[#214344]"
            onClick={() => {
              setSingnin(false);
            }}
          >
            New to zoci ? Create an account
          </Link>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default SignIn;
