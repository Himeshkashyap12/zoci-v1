import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { useEffect } from "react";
import { addUserData } from "../../feature/auth/authSlice";
import { getUserData } from "../../feature/auth/authApi";

const ApiLoader = () => {
  const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const isLoading = useSelector((state) => state.load.pageLoading);
  return (
    <>
      {isLoading && (
        <>
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-[9998]">
          <div
            style={loadingStyle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[70px] "
          >
            <img src="https://zoci-data.s3.ap-south-1.amazonaws.com/productVideos/1741163961649_ZOCI%20%282%29.gif"  alt="...loading"/>
         
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default ApiLoader;
