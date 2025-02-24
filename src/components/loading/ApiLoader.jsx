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
          <div
            style={loadingStyle}
            className="bg-[rgba(0,0,0,0.5)] h-[100vh] fixed left-0 right-0 mx-auto  z-[9999]"
          >
            <video width="80px" height="80px" muted loop autoPlay>
              <source
                src={
                  "https://zoci-data.s3.ap-south-1.amazonaws.com/productVideos/1739968128208_loader.mp4"
                }
                type="video/mp4"
              />
              <source
                src={
                  "https://zoci-data.s3.ap-south-1.amazonaws.com/productVideos/1739968128208_loader.mp4"
                }
                type="video/ogg"
              />
            </video>
          </div>
        </>
      )}
    </>
  );
};

export default ApiLoader;
