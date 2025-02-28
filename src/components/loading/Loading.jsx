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
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-[9998]">
    <div
      style={loadingStyle}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[70px] z-[9999]"
    >
      <img src="https://zoci-data.s3.ap-south-1.amazonaws.com/productVideos/1740724998454_ZOCI.gif" alt="loading" />
    </div>
  </div>
  );
};

export default Loading;
