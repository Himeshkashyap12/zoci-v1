import { Circles, Grid, Hourglass } from "react-loader-spinner";
const Loading = () => {
  const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "18px",
    color: "#555",
  };

  return (
    <div style={loadingStyle} className="bg-[rgba(0,0,0,0.5)] h-[100vh] fixed left-0 right-0 mx-auto  z-[9999]">
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
  );
};

export default Loading;
