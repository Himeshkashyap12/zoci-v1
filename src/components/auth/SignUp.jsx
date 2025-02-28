import React, { useState } from "react";
import { useSelector } from "react-redux";
import profile from "../../assets/icons/GreenProfile.png";
import "./auth.css";
import Profile from "./Profile";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VeryfyOtp";
import SignIn from "./SignIn";
const SignUp = ({ setWishCounter, setCartCounter }) => {
  const [sentOtp, setSentOtp] = useState(true);
  const [mobile, setMobile] = useState(null);
  const [signin, setSingnin] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <div className="px-5  w-[100%] flex flex-col h-[100%]  items-center justify-center pt-10">
        <div className="w-[150px] h-[150px] rounded-full flex justify-center items-center  bg-[#fff]  border-[2px] border-[#dfb38e] ">
          <div className="p-2">
            <img className="w-full h-full" src={profile}  alt="Profile"/>
          </div>
        </div>
        {!isAuth && (
          <h4 className="text-[40px] text-[#214344] py-5 ">
            {signin ? "Sign in" : "Sign up"}
          </h4>
        )}
        {!isAuth ? (
          <div className="flex flex-col gap-5 w-full">
            {signin ? (
              <SignIn setSingnin={setSingnin} setSentOtp={setSentOtp} />
            ) : sentOtp ? (
              <SendOtp
                setMobile={setMobile}
                setSentOtp={setSentOtp}
                setSingnin={setSingnin}
              />
            ) : (
              <VerifyOtp mobile={mobile} />
            )}
          </div>
        ) : (
          <Profile
            setSentOtp={setSentOtp}
            setWishCounter={setWishCounter}
            setCartCounter={setCartCounter}
          />
        )}
      </div>
    </>
  );
};
export default SignUp;
