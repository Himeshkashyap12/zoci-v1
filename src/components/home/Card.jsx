import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { Flex, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../CustomDrawer";
import { addToCartData, getCartData } from "../../feature/categary/cartApi";
import Cart from "../cart/Cart";
import {
  addToWishlistData,
  getWishlistData,
} from "../../feature/wishlist/wishlistApi";
import wishlist from "../../assets/wishlist.png";
import bag from "../../assets/icons/bagYellow.png";
import similarYellow from "../../assets/icons/similarYellow.png";
import "./hero.css";
import { RWebShare } from "react-web-share";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { getProductFilterApi } from "../../feature/product/productApi";
import { toast } from "react-toastify";
import { addToCart } from "../../feature/categary/cartSlice";
import { addToWishList } from "../../feature/wishlist/wishlistSlice";
import Loading from "../loading/Loading";
import {
  headerActiveTab,
  headermenuHandler,
} from "../../feature/header/headerSlice";
import Cookies from 'js-cookie';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [thumbnailButton, setThumbnailButton] = useState(false);
  const [loadingVideo, setVideoLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const user = localStorage.getItem("userId");
  const cart = useSelector((state) => state.cart.cart);
  const wish = useSelector((state) => state.wish.wishlist);
  // This function work as add to cart functionality
  const addCartHandler = async (item, status) => {
    if (!token) {
      dispatch(headermenuHandler(true));
      dispatch(headerActiveTab("profile"));
    } else {
      setCartStatus(status);
      const data = {
        userId: user,
        productId: item._id,
        quantity: 1,
        price: item.price,
      };
      try {
        const res = await addToCartData(data);
        setOpen(true);
        toast.success(res?.message);
        localStorage.setItem("cart", parseInt(cart.length) + 1);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };
  // This function work as to show modal

  const onClose = () => {
    setOpen(false);
  };
  // This function calculate percentage discount
  const addToWishlistHandler = async (item, status) => {
    if (!token){
      return dispatch(headermenuHandler(true), dispatch(headerActiveTab("profile")));

    }
    setCartStatus(status);
    const data = { userId: localStorage.getItem("userId"), prodId: item?._id };

    try {
      const res = await addToWishlistData(data);
      localStorage.setItem("wish", parseInt(wish?.length) + 1);

      setOpen(true);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const similerProductHandler = async () => {
    const filters = { category: item.category };
    try {
      const res = await getProductFilterApi({ filters });
      dispatch(addproductToshop(res?.products));
      dispatch(addCategary(item.category));
      navigate("/shop", { state: "similer" });
    } catch (error) {
      console.log(error);
    }
  };
  const getCartDataHandler = async () => {
    if (!localStorage.getItem("token"))
      return toast.error("Please login first");

    try {
      const data = await getCartData();

      dispatch(addToCart(data?.data?.cartItems));
    } catch (error) {
      if (error?.response?.data?.message === "No items in the cart") {
        dispatch(addToCart([]));
      }
    }
  };
  const getwishlistDataHandler = async () => {
    if (!localStorage.getItem("token"))
      return toast.error("Please login first");
    try {
      const data = await getWishlistData();

      dispatch(addToWishList(data?.wishlist));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (wish?.length === 0) return;
    getwishlistDataHandler();
  }, [wish?.length]);
  useEffect(() => {
    if (cart?.length === 0) return;
    getCartDataHandler();
  }, [cart?.length]);

  return (
    <>
      <div className="relative card ">
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
            className="w-[93%] mx-auto       border border-gray-200 rounded-xl "
          >
            <div className=" relative">
              <div className=" border-[#214344]  hover:rounded-t-[20px] h-[360px]  ">
                {imageLoading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-10">
                    <Loading />
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
                    className=" rounded-t-2xl w-full  h-full object-cover "
                    src={item.images.modalImage}
                    alt="product image"
                  />
                  </div>
                  </>
                  
                )}
                {thumbnailButton && (
                  <div className="w-full   border-[5px] border-[#214344] rounded-t-[19px]">
                    {loadingVideo && (
                      <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-10">
                        <Loading />
                      </div>
                    )}
                    <video
                     key={item?.video[0]} // Force remounting by using the video source or index
                      className="w-full h-[360px] rounded-t-2xl object-cover"
                      muted
                      loop
                      autoPlay
                      onLoadedData={() => setVideoLoading(false)}
                    >
                      <source
                        src={item?.video[0]}
                        alt="...Loading"
                        type="video/mp4"
                      />
                      <source src={item?.video[0]} type="video/ogg" />
                    </video>
                  </div>
                )}
              </div>
            </div>

            <div className="relative ">
              <div
                className={`px-3 pt-2 pb-12 flex flex-col bg-[#214344]  rounded-b-3xl`}
              >
                <div className="hidden sm:block ">
                <Tooltip title={item?.title} placement="top" color="#214344">
                  <div>
                    <h5 className="md:text-[20px] text-[20px] font-semibold  text-white">
                      {item?.title?.length > 30
                        ? item?.title.slice(0, 30) + "..."
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
                      {item?.title?.length > 25
                        ? item?.title.slice(0, 25) + "..."
                        : item?.title?.charAt(0)?.toUpperCase() +
                          item?.title?.slice(1)}
                    </h5>
                  </div>
                  
                </Tooltip>
                </div>
                <div className="flex items-center justify-between py-2 ">
                  <div className="flex gap-2 items-center ">
                    <span className="text-[15px] font-semibold text-[#F0D5A0] ">
                      Rs. {item?.price}
                    </span>
                  </div>
                </div>

                <div className="absolute w-[90%] bottom-2">
                  <Flex vertical>
                    <Progress
                      strokeColor={"#F0D5A0"}
                      percent={Math.floor((item?.sold * 100) / item?.quantity)}
                      showInfo={false}
                      trailColor="white"
                      status="active"
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <Typography.Text className="font-semibold text-[14px] text-[#F0D5A0] ">
                          Sold :
                        </Typography.Text>
                        <Typography.Text className="font-bold text-[14px] text-[#fff] ">
                          {item?.sold ?? 0}
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
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute  right-[30px] top-[16px]  cursor-pointer">
          <Tooltip placement="left" title={"Add to Wishlist"}>
            <div
              onClick={() => {
                addToWishlistHandler(item, "wishlist");
              }}
              className="bg-[#214344] h-[35px] w-[35px] flex justify-center  items-center rounded-full p-2 cursor-pointer  "
            >
              <img
                className="w-[20px] h-[18px]"
                src={wishlist}
                alt="wishlist"
              />
            </div>
          </Tooltip>
          {/* desktop screen  */}
          <div className="max-sm:hidden sm:block card-icon absolute left-2 top-10 hover:block hover:left-0  transition-all duration-100  ease-out  overflow-hidden">
            <div className="flex gap-1.5 flex-col ">
              {thumbnailButton && (
                <Tooltip placement="left" title={"Cart"}>
                  <div
                    onClick={() => {
                      addCartHandler(item, "cart");
                    }}
                    className="h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#214344] hover:bg-[#214344]  p-2"
                  >
                    <img className="h-[20px] w-[20px]" src={bag} alt="bag" />
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
                    <div className=" bg-[#214344] flex justify-center items-center h-[35px] w-[35px] p-2 rounded-full ">
                      <ShareAltOutlined
                        style={{ fontSize: "20px", color: "#F0D5A0" }}
                      />
                    </div>
                  </RWebShare>
                </Tooltip>
              )}
              {thumbnailButton && (
                <Tooltip placement="left" title={"similar"}>
                  <div
                    onClick={() => similerProductHandler()}
                    className="h-[35px] w-[35px] flex justify-center  items-center p-2  bg-[#214344]  rounded-full "
                  >
                    <img
                      className="w-[20px] h-[20px] ps-0.5"
                      src={similarYellow}
                      alt="similar"
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
          {/* desktop screen  */}
          {/* Mobile Screen */}
          <div className="sm:hidden block  card-icon absolute  top-10  hover:block hover:left-0 ">
            <div className="flex gap-1.5 flex-col ">
              <Tooltip placement="left" title={"Cart"}>
                <div
                  onClick={() => {
                    addCartHandler(item, "cart");
                  }}
                  className="h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#214344] hover:bg-[#214344]  p-2"
                >
                  <img className="h-[20px] w-[20px]" src={bag} alt="bag" />
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
                  a
                  onClick={() => console.log("shared successfully!")}
                >
                  <div className=" bg-[#214344] flex justify-center items-center h-[35px] w-[35px] p-2 rounded-full ">
                    <ShareAltOutlined
                      style={{ fontSize: "20px", color: "#F0D5A0" }}
                    />
                  </div>
                </RWebShare>
              </Tooltip>
              <Tooltip placement="left" title={"similar"}>
                <div
                  onClick={() => similerProductHandler()}
                  className="h-[35px] w-[35px] flex justify-center  items-center p-2  bg-[#214344]  rounded-full "
                >
                  <img
                    className="w-[20px] h-[20px] ps-0.5"
                    src={similarYellow}
                    alt="similar"
                  />
                </div>
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
export default Card;
// This is my card .End here
