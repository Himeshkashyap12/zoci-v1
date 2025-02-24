import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import { Flex, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../CustomDrawer";
import { addToCartData } from "../../feature/categary/cartApi";
import Cart from "../cart/Cart";
import { addToWishlistData } from "../../feature/wishlist/wishlistApi";
import wishlist from "../../assets/wishlist.png";
import bag from "../../assets/icons/bagYellow.png";
import similarYellow from "../../assets/icons/similarYellow.png";
import "./hero.css";
import { RWebShare } from "react-web-share";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { getProductFilterApi } from "../../feature/product/productApi";
import { toast } from "react-toastify";
const Card = ({ item }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [thumbnailButton, setThumbnailButton] = useState(false);
  const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  const cart = useSelector((state) => state.cart.cart);

  // This function work as add to cart functionality
  const addCartHandler = async (item, status) => {
    if (!token) return toast.error("Please login first");
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
  };
  // This function work as to show modal

  const onClose = () => {
    setOpen(false);
  };
  // This function calculate percentage discount
  const addToWishlistHandler = async (item, status) => {
    if (!token) return toast.error("Please login first");
    setCartStatus(status);
    const data = { userId: localStorage.getItem("userId"), prodId: item?._id };

    try {
      const res = await addToWishlistData(data);
      localStorage.setItem("wish", parseInt(cart.length) + 1);

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



  return (
    <>
      <div className="relative card ">
        <Link to={`/product/${item?._id}`}>
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
                {!thumbnailButton && (
                  <img
                    className=" rounded-t-2xl w-full  h-full object-cover "
                    src={item.images[0]}
                    alt="product image "
                  />
                )}
                {thumbnailButton && (
                  <div className="w-full   border-[5px] border-[#214344] rounded-t-[19px]">
                    <video
                      className="w-full h-[360px] rounded-t-2xl object-cover"
                      muted
                      loop
                      autoPlay
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
                <div>
                  <h5 className="md:text-[20px] text-[20px] font-semibold  text-white">
                    {item?.title}
                  </h5>
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
                      showInfo={false}
                      trailColor="white"
                      percent={null}
                      status="active"
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <Typography.Text className="font-semibold text-[14px] text-[#F0D5A0] ">
                          Sold :
                        </Typography.Text>
                        <Typography.Text className="font-bold text-[14px] text-[#fff] ">
                          {item?.sold}
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
              <img className="w-[20px] h-[18px]" src={wishlist} />
            </div>
          </Tooltip>
          {/* desktop screen  */}
          <div className="max-sm:hidden sm:block card-icon absolute left-5 top-10  hover:block hover:left-0  transition-all duration-500 ease-in overflow-hidden">
            <div className="flex gap-1.5 flex-col ">
              {thumbnailButton && (
                <Tooltip placement="left" title={"Cart"}>
                  <div
                    onClick={() => {
                      addCartHandler(item, "cart");
                    }}
                    className="h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#214344] hover:bg-[#214344]  p-2"
                  >
                    <img className="h-[20px] w-[20px]" src={bag} />
                  </div>
                </Tooltip>
              )}

              {thumbnailButton && (
                <Tooltip placement="left" title={"Share"}>
                  <RWebShare
                    data={{
                      text: item?.title,
                      url: `https://zoci.in/product/${item?._id}`,
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
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
          {/* desktop screen  */}
          {/* Mobile Screen */}
          <div className="sm:hidden block  card-icon absolute left-0 top-10  hover:block hover:left-0  transition-all duration-100 overflow-hidden">
            <div className="flex gap-1.5 flex-col ">
              <Tooltip placement="left" title={"Cart"}>
                <div
                  onClick={() => {
                    addCartHandler(item, "cart");
                  }}
                  className="h-[35px] w-[35px] flex justify-center items-center rounded-full bg-[#214344] hover:bg-[#214344]  p-2"
                >
                  <img className="h-[20px] w-[20px]" src={bag} />
                </div>
              </Tooltip>

              <Tooltip placement="left" title={"Share"}>
                <RWebShare
                  data={{
                    text: item?.title,
                    url: `https://celestial-rho.vercel.app`,
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
              <Tooltip placement="left" title={"similar"}>
                <div
                  onClick={() => similerProductHandler()}
                  className="h-[35px] w-[35px] flex justify-center  items-center p-2  bg-[#214344]  rounded-full "
                >
                  <img
                    className="w-[20px] h-[20px] ps-0.5"
                    src={similarYellow}
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
