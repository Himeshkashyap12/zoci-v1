import React, { useState } from "react";
import { Button, Tooltip, Typography } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { Flex, Progress } from "antd";
import { Link } from "react-router-dom";
import CustomDrawer from "../CustomDrawer";
import { addToCartData } from "../../feature/categary/cartApi";
import Cart from "../cart/Cart";
import { addToWishlistData } from "../../feature/wishlist/wishlistApi";
import wishlist from "../../assets/wishlist.png";
import bag from "../../assets/icons/bagYellow.png";
import "./advancefilter.css";
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Circles } from "react-loader-spinner";
import Loading from "../loading/Loading";
import { headerActiveTab, headermenuHandler } from "../../feature/header/headerSlice";
import Cookies from 'js-cookie';
// This is my card .start here
const ShopCard = ({ item, shop }) => {
  const [open, setOpen] = useState(false);
  const [loadingVideo, setVideoLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [thumbnailButton, setThumbnailButton] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const wishlistData = useSelector((state) => state?.wish.wishlist);
    const token = Cookies.get("token");

  const dispatch = useDispatch();
  const addCartHandler = async (item, status) => {
    if (!token) return  dispatch(headermenuHandler(true),dispatch(headerActiveTab("profile")))
    setCartStatus(status);
    const user = localStorage.getItem("userId");
    const data = {
      userId: user,
      productId: item._id,
      quantity: 1,
      price: item.price,
    };
    try {
      const res = await addToCartData(data, token);
      setOpen(true);
      toast.success(res?.message);
      localStorage.setItem("cart", parseInt(cart.length) + 1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const addToWishlistHandler = async (item, status) => {
    if (!token) return dispatch(headermenuHandler(true),dispatch(headerActiveTab("profile")))
    setCartStatus(status);
    const data = { userId: localStorage.getItem("userId"), prodId: item?._id };
    try {
      const res = await addToWishlistData(data);
      setOpen(true);
      toast.success(res?.message);
      localStorage.setItem("wish", parseInt(wishlistData.length) + 1);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="relative shopcard">
        <Link
          to={`/product/${
            item.title.includes(" ")
              ? item.title.split(" ").join("-")
              : item?.title?.charAt(0)?.toLowerCase() + item?.title?.slice(1)
          }/${item?._id}`}
        >
          <div
            onMouseEnter={() => {
              setThumbnailButton(true);
            }}
            onMouseLeave={() => {
              setThumbnailButton(false);
            }}
            className="w-[100%] mx-auto rounded-3xl  shadow-2xl"
          >
            <div className=" relative">
              <div className=" border-[#214344] rounded-xl sm:h-[370px] h-[165px]  ">
                {imageLoading && (
                  <div className="absolute  inset-0 flex justify-center items-center rounded-xl  backdrop-blur-sm z-10">
                                           <Loading/>

                   </div>
                )}
                {!thumbnailButton && (
                  <>
                  <div className="sm:hidden h-full">
                  <img
                    onLoad={() => setImageLoading(false)}
                    className=" rounded-t-2xl w-full  h-full object-cover  "
                    src={item.images.productImage}
                    alt="product image"
                  />
                  </div>
                  <div className=" hidden sm:block h-full">
                  <img
                    onLoad={() => setImageLoading(false)}
                    className=" rounded-t-2xl w-full  h-full object-cover"
                    src={item.images.modalImage}
                    alt="product image"
                  />
                  </div>
                  </>
                )}
                {thumbnailButton && (
                  <div className="w-full   border-[5px] border-[#214344] rounded-t-[19.5px]">
                    {loadingVideo && (
                      <div className="absolute inset-0 flex justify-center items-center rounded-xl backdrop-blur-sm z-10">
                        {/* <Circles height={80} width={80} color="#F0D5A0" /> */}
                        <Loading/>

                      </div>
                    )}
                    <video
                      key={item?.video[0]} // Force remounting by using the video source or index
                      className="w-full sm:h-[370px] h-[165px] rounded-t-2xl object-cover"
                      muted
                      onLoadedData={() => setVideoLoading(false)}
                      loop
                      autoPlay
                    >
                      <source
                        src={item?.video[0]}
                        alt="...Loading"
                        type="video/mp4"
                      />
                      <source src={item.video[0]} type="video/ogg" />
                    </video>
                  </div>
                )}
              </div>
            </div>

            <div className="relative  ">
              <div
                className={`sm:px-5 px-2 sm:py-4 pb-2  flex flex-col bg-[#214344] sm:gap-2 gap-1  rounded-b-3xl`}
              >
               <div className="hidden sm:block ">
                              <Tooltip title={item?.title} placement="top" color="#214344">
                                <div>
                                  <h5 className="md:text-[20px] text-[20px] font-semibold  text-white">
                                    {item?.title?.length > 25
                                      ? item?.title.slice(0, 25) + "..."
                                      : item?.title?.charAt(0)?.toUpperCase() +
                                        item?.title?.slice(1)}
                                  </h5>
                                </div>
                                
                              </Tooltip>
                              </div>
                              <div className="sm:hidden">
                              <Tooltip title={item?.title} placement="top" color="#214344">
                                <div>
                                  <h5 className="md:text-[20px] text-[20px] font-semibold  text-white">
                                    {item?.title?.length > 12
                                      ? item?.title.slice(0, 12) + "..."
                                      : item?.title?.charAt(0)?.toUpperCase() +
                                        item?.title?.slice(1)}
                                  </h5>
                                </div>
                                
                              </Tooltip>
                              </div>
                <div className="flex items-center justify-between ">
                  <div className="flex gap-2 items-center ">
                    <span className="text-[15px] font-semibold text-[#F0D5A0] ">
                      Rs. {item?.price}
                    </span>
                  </div>
                </div>
                <div className=" max-sm:hidden">
                  <Flex vertical>
                    <Progress
                      percent={Math.floor((item?.sold * 100) / item?.quantity)}
                      showInfo={false}
                      trailColor="white"
                      status="active"
                    />
                    <div className="flex flex-wrap justify-between">
                      <div className="flex gap-1">
                        <Typography.Text className="font-semibold text-[14px] text-[#F0D5A0] ">
                          Sold :
                        </Typography.Text>
                        <Typography.Text className="font-bold text-[14px] text-[#fff] ">
                          {item?.sold??0}
                        </Typography.Text>
                      </div>
                      <div className="flex gap-1">
                        <Typography.Text className="font-semibold text-[#F0D5A0]">
                          Available :
                        </Typography.Text>
                        <Typography.Text className="font-bold text-[14px] text-[#fff] ">
                          {item?.quantity}
                        </Typography.Text>
                      </div>
                    </div>
                  </Flex>
                </div>
                <div className="pt-3">
                  <Button className="rounded-full w-[100%] hover:!border-[#214344] font-semibold text-[#214344] py-5 hover:!text-[#214344]">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute flex flex-col gap-2 sm:right-5 right-3 sm:top-5 top-3 sm:size-[35px] size-[24px] cursor-pointer">
          <Tooltip placement="left" title={"Add to Wishlist"}>
            <div
              onClick={() => {
                addToWishlistHandler(item, "wishlist");
              }}
              className="bg-[#214344] cursor-pointer flex justify-center items-center sm:size-[40px] size-[24px] rounded-full"
            >
              <img className="sm:size-[20px] size-[10px]" src={wishlist} alt="wishlist" />
            </div>
          </Tooltip>
          {/* {thumbnailButton &&<Tooltip placement="left" title={"Compare"}> <button  className="text-[#fff] bg-[#214344] p-2 rounded-full text-sm"><ReloadOutlined   style={{fontSize:"20px" ,color:"#F0D5A0"}} /></button></Tooltip>} */}

          {/* desktop screen */}
          <div className="max-sm:hidden sm:block card-icon absolute top-10  hover:block hover:left-0  transition-all duration-200 ease-in-out  overflow-hidden">
            <div className="flex gap-1.5 flex-col ">
              {thumbnailButton && (
                <Tooltip placement="left" title={"Cart"}>
                  <div
                    onClick={() => {
                      addCartHandler(item, "cart");
                    }}
                    className="text-white bg-[#214344] hover:bg-[#214344]  text-sm  flex justify-center items-center size-[40px]  rounded-full text-center"
                  >
                    <img className="h-[20px] w-[18px]" src={bag} alt="bag" />
                  </div>
                </Tooltip>
              )}
              {thumbnailButton && (
                <Tooltip placement="left" title={"Share"}>
                  <RWebShare
                    data={{
                      text: item?.title,
                      url: `https://zoci.in/product/${
                        item.title.includes(" ")
                          ? item.title.split(" ").join("-")
                          : item?.title?.charAt(0)?.toLowerCase() +
                            item?.title?.slice(1)
                      }/${item?._id}`,
                      title: "Zoci",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <div className="text-[#fff] bg-[#214344]   size-[40px] flex justify-center items-center rounded-full text-sm">
                      <ShareAltOutlined
                        style={{ fontSize: "18px", color: "#F0D5A0" }}
                      />
                    </div>
                  </RWebShare>
                </Tooltip>
              )}
            </div>
          </div>
          {/* desktop screen */}
          {/* Mobile screen */}
          <div className="sm:hidden block  card-icon absolute  top-7  ">
            <div className="flex gap-1 flex-col ">
              <Tooltip placement="left" title={"Cart"}>
                <div
                  onClick={() => {
                    addCartHandler(item, "cart");
                  }}
                  className="text-white bg-[#214344] hover:bg-[#214344]  text-sm  p-2 size-[24px] rounded-full text-center"
                >
                  <img src={bag} alt="bag" />
                </div>
              </Tooltip>
              <Tooltip placement="left" title={"Share"}>
                <RWebShare
                  data={{
                    text: item?.title,
                    url: `https://zoci.in/product/${
                      item.title.includes(" ")
                        ? item.title.split(" ").join("-")
                        : item?.title?.charAt(0)?.toLowerCase() +
                          item?.title?.slice(1)
                    }/${item?._id}`,
                    title: "Zoci",
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <div className="text-[#fff] bg-[#214344] p-[2px] flex justify-center items-center size-[24px]  rounded-full text-sm">
                    <ShareAltOutlined
                      style={{ fontSize: "10px", color: "#F0D5A0" }}
                    />
                  </div>
                </RWebShare>
              </Tooltip>
            </div>
          </div>
          {/* Mobile screen */}
        </div>
        <div
          className={`fixed inset-0 transition-all duration-300 ${
            open ? " backdrop-blur-md" : "bg-transparent"
          } ${open ? "z-[998]" : "z-[-1]"}`}
          onClick={onClose}
        ></div>
      </div>

      <CustomDrawer
        cartStatus={cartStatus}
        component={<Cart />}
        open={open}
        setOpen={setOpen}
        onClose={onClose}
      />
    </>
  );
};
export default ShopCard;
// This is my card .End here
