import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData, logOutApi } from "../../feature/auth/authApi";
import { Typography } from "antd";
import { addUserData, logout } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";

const Profile = ({ setSentOtp, setWishCounter, setCartCounter }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.userData);
  const logoutHandler = async () => {
    try {
      const res = await logOutApi();
      dispatch(logout());
      setSentOtp(true);
      localStorage.removeItem("wish");
      localStorage.removeItem("cart");
      setWishCounter(0);
      setCartCounter(0);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getUserHandler = async () => {
    try {
      const res = await getUserData();
      dispatch(addUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserHandler();
  }, []);
  return (
    <>
      <>
        <Typography.Text className="text-[#214344] text-[24px] pt-5 font-semibold ">
          Your Profile
        </Typography.Text>

        <div className="flex flex-col gap-5 pt-5 bg-[#fff] px-5 py-3 rounded-md mt-5  ">
          <div className="flex gap-1 ">
            <Typography.Text className="text-[#214344] text-[16px] font-semibold ">
              Mobile:
            </Typography.Text>
            <Typography.Text className="text-[#214344] text-[16px] font-[400]">
              {" "}
              {users.mobile}
            </Typography.Text>
          </div>

          <div className="flex gap-1">
            <Typography.Text className="text-[#214344] text-[16px] font-semibold">
              Role:
            </Typography.Text>
            <Typography.Text className="text-[#214344] text-[16px] font-[400]">
              {" "}
              {users.role}
            </Typography.Text>
          </div>
          <div className="flex gap-1">
            <Typography.Text className="text-[#214344] text-[16px] font-semibold">
              Referral Code:
            </Typography.Text>
            <Typography.Text className="text-[#214344] text-[16px] font-[400]">
              {" "}
              {users.referralCode}
            </Typography.Text>
          </div>
          <div
            className="cursor-pointer bg-[#dfb38e] px-3 py-2 rounded-full"
            onClick={() => {
              logoutHandler();
            }}
          >
            Logout
          </div>
        </div>
      </>
    </>
  );
};

export default Profile;
