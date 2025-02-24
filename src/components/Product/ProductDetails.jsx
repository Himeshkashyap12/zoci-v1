import { Col, Collapse, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { Flex, Progress } from "antd";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetailsApi,
} from "../../feature/product/productApi";
import {
  addProductDetals,
} from "../../feature/product/productSlice";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import CustomDrawer from "../CustomDrawer";
import starOrange from "../../assets/starOrange.png";
import "./productDetails.css";
import bag from "../../assets/icons/greenBag.png";
import wishlist from "../../assets/icons/wishlistGreen.png";
import InnerImageZoom from "react-inner-image-zoom";
import Cart from "../cart/Cart";
import { addToCartData } from "../../feature/categary/cartApi";
import { TbPointFilled } from "react-icons/tb";
import { addToWishlistData } from "../../feature/wishlist/wishlistApi";
import { useRazorpay } from "react-razorpay";
import OrderModal from "../order/order";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { error, isLoading } = useRazorpay();
  const [counterPeople, setCounterPeople] = useState(5);
  const item = useSelector((state) => state.product?.productDetails);
  const dispatch = useDispatch();
  const [activeImageId, setActiveImageId] = useState(1);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState( item?.images && item?.images[0]);
  const [cartStatus, setCartStatus] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = localStorage.getItem("userId");
  const cart = useSelector((state) => state.cart.cart);
  const wishlistData = useSelector((state) => state?.wish.wishlist);
  var token = localStorage.getItem("token");
  const getData = async () => {
    try {
      const data = await getProductDetailsApi(id);
      dispatch(addProductDetals(data.product));
      if (data.product?.images?.length > 0) {
        setActiveImageUrl(data.product.images[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activeImageHAndler = (imageUrl, id) => {
    setActiveImageId(id);
    setActiveImageUrl(imageUrl);
  };

  const addCartHandler = async (item) => {
    if (!token) return toast.error("Please login first");
    setCartStatus("cart");
    const data = {
      userId: user,
      productId: item._id,
      quantity: 1,
      price: item.price,
    };
    try {
      const res = await addToCartData(data, token);
      setOpen(true);
      toast.success(res.message);
      localStorage.setItem("cart", parseInt(cart.length) + 1);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const addTowishlistHandler = async (item) => {
    if (!token) return toast.error("Please login first");
    const data = { userId: localStorage.getItem("userId"), prodId: item?._id };

    try {
      const res = await addToWishlistData(data);
      toast.success(res?.message);
      setOpen(true);
      localStorage.setItem("wish", parseInt(wishlistData.length) + 1);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const buynowHandler = () => {
    if (!isAuth) return toast.error("Please login first");
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (counterPeople === 0) return;
    const counttime = setInterval(() => {
      setCounterPeople((prev) => prev - 1);
    }, [7000]);
    clearInterval(counttime);
  }, [counterPeople]);
  useEffect(() => {
    getData();
  }, [dispatch, id]);

  useEffect(() => {
    if (item?.images?.length > 0) {
      setActiveImageUrl(item?.images[0]);
    }
  }, [item]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <Row className="md:pt-[120px] pt-[70px] bg-[#efe6dc] md:px-20   pb-5">
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <Row className="max-lg:px-5  ">
            <Col
              xl={{ span: 3, order: 1 }}
              lg={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              xs={{ span: 24, order: 2 }}
            >
              <div className="flex lg:flex-col  items-center    max-lg:py-3  gap-[20px] max-lg:justify-center">
                <div
                  onClick={() => {
                    activeImageHAndler(item?.images[0], 1);
                  }}
                  className={`md:size-[90px] size-[70px] cursor-pointer ${
                    activeImageId == 1 &&
                    "border-[2px] border-[#214343] rounded-md"
                  } `}
                >
                  {item?.images?.length > 0 && (
                    <img
                      className="w-[100%] h-[100%] rounded"
                      src={item?.images[0]}
                    />
                  )}
                </div>
                <div
                  onClick={() => {
                    activeImageHAndler(item?.images[1], 2);
                  }}
                  className={`md:size-[90px] size-[70px] cursor-pointer ${
                    activeImageId == 2 &&
                    "border-[2px] border-[#214343] rounded-md"
                  } `}
                >
                  {item?.images?.length > 0 && (
                    <img
                      className="w-[100%] h-[100%] rounded"
                      src={item?.images[1]}
                    />
                  )}
                </div>
                <div
                  onClick={() => {
                    activeImageHAndler(item?.images[2], 3);
                  }}
                  className={`md:size-[90px] size-[70px] cursor-pointer ${
                    activeImageId == 3 &&
                    "border-[2px] border-[#214343] rounded-md"
                  } `}
                >
                  {item?.images?.length > 0 && (
                    <img
                      className="w-[100%] h-[100%] rounded"
                      src={item.images[2]}
                    />
                  )}
                </div>
                <div
                  onClick={() => {
                    activeImageHAndler(item?.images[3], 4);
                  }}
                  className={`md:size-[90px] size-[70px] cursor-pointer ${
                    activeImageId == 4 &&
                    "border-[2px] border-[#214343] rounded-md"
                  } `}
                >
                  {item?.images?.length > 0 && (
                    <img
                      className="w-[100%] h-[100%] rounded"
                      src={item.images[3]}
                    />
                  )}
                </div>
              </div>
            </Col>
            <Col
              xl={{ span: 21, order: 2 }}
              lg={{ span: 4, order: 1 }}
              md={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              <div className="flex gap-2 md:hidden items-center max-md:pt-4 ">
                <Typography.Text className="text-[14px] font-semibold text-[#214344]">
                  Home
                </Typography.Text>
                <TbPointFilled style={{ color: "#214344" }} />

                <Typography.Text className="text-[14px] font-semibold text-[#214344]">
                  {item?.category?.toUpperCase()}{" "}
                </Typography.Text>
              </div>
              <div className="md:h-[430px]     md:w-[430px] mx-auto relative max-md:pt-2">
                {item?.images?.length > 0 && (
                  <InnerImageZoom
                    fadeDuration={0}
                    fullscreenOnMobile={true}
                    mobileBreakpoint={640}
                    hideCloseButton={false}
                    hideHint={true}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="w-full h-full rounded-xl"
                    src={activeImageUrl}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <div className="w-full  bg-[#efe6dc]   px-5 ">
            <div className="px-3   gap-5">
              <div className="pb-3">
                <div className="flex gap-2 max-md:hidden items-center ">
                  <Typography.Text className="text-[14px] text-[214344] font-semibold ">
                    Home
                  </Typography.Text>
                  <TbPointFilled />

                  <Typography.Text className="text-[14px] text-[#214344] font-semibold">
                    {item?.category?.toUpperCase()}{" "}
                  </Typography.Text>
                </div>
                <div className="flex max-sm:flex-col justify-between md:items-center">
                  <div>
                    <h5 className="md:text-[30px] text-[24px] font-semibold tracking-tight text-[#214344]">
                      {item?.title}
                    </h5>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center py-4">
                      {item?.rating?.map((item) => {
                        return (
                          <>
                            <div className="h-[18px] w-[18px]">
                              <img src={starOrange} />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center sm:pt-7">
                <span className="text-xl font-semibold text-[#214344] ">
                  Rs. {item?.price}
                </span>
                {item?.compare_at_price && (
                  <>
                    <span className="text-lg text-red-300 line-through ">
                      Rs. {item?.compare_at_price}
                    </span>
                  </>
                )}
              </div>
              <Flex vertical className="p-0">
                <Progress
                  strokeColor={"#214344"}
                  showInfo={false}
                  trailColor="white"
                  percent={item?.quantity}
                  status="active"
                />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <Typography.Text className="font-semibold text-[16px] text-[#214344] ">
                      Sold :{" "}
                    </Typography.Text>
                    <Typography.Text className="font-bold text-[16px] text-[#214344] ">
                      {item?.sold}
                    </Typography.Text>
                  </div>
                  <div className="flex gap-1">
                    <Typography.Text className="font-semibold text-[16px] text-[#214344]">
                      Available :
                    </Typography.Text>
                    <Typography.Text className="font-bold text-[16px] text-[#214344] ">
                      {item?.quantity}
                    </Typography.Text>
                  </div>
                </div>
              </Flex>
              <div className="flex justify-between  md:px-7  items-center pt-[12px] pb-[15px]  ">
                <button
                  onClick={() => {
                    addCartHandler(item, "cart");
                  }}
                  className=" rounded-full cursor-pointer"
                >
                  <div className="p-2 h-[45px] w-[40px] cursor-pointer">
                    <img src={bag} className="h-full w-full" />
                  </div>
                </button>
                <button
                  onClick={() => buynowHandler()}
                  class="bg-[#214344] rounded-full w-[350px] text-[15px] font-seemibold md:py-4 py-2  text-[#fff] max-md:w-[200px]"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addTowishlistHandler(item, "wishlist");
                  }}
                  className="size-[30px]  cursor-pointer"
                >
                  <img src={wishlist} />
                </button>
              </div>
              <div className="flex flex-col   gap-[20px] ">
                <div className="w-[100%] shadow-xl bg-[#fffcf2]   rounded-full flex justify-start md:px-5 ps-4 pe-6  items-center h-[50px]">
                  <div className=" flex items-center h-[20px] w-[20px]">
                    <img className="w-[100%] " src={bag} />
                  </div>
                  <marquee direction="left">
                    <Typography.Text className="max-sm:ps-1 sm:ps-4 text-[16px]">
                      {counterPeople} people have this in their carts right now.
                      It's running out!
                    </Typography.Text>
                  </marquee>
                </div>
                <div className="">
                  <Collapse
                    style={{ borderRadius: "30px", background: "#fff" }}
                    className="shadow-xl"
                    size="medium"
                    items={[
                      {
                        key: "1",
                        label: (
                          <Typography.Text className="text-[16px] text-start">
                            Additional Information
                          </Typography.Text>
                        ),
                        children: (
                          <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                              <Typography.Text className="text-[14px] font-semibold text-[#214344]">
                                Metal Type :
                              </Typography.Text>
                              <Typography.Text className="text-[14px] font-[400] text-[#214344]">
                                {item?.metalType}
                              </Typography.Text>
                            </div>
                            <div className="flex gap-2">
                              <Typography.Text className="text-[14px] font-semibold text-[#214344]">
                                Metal color :
                              </Typography.Text>
                              <Typography.Text className="text-[14px] font-[400] text-[#214344]">
                                {item?.ProductColor}
                              </Typography.Text>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
                <div>
                  <Collapse
                    style={{ borderRadius: "30px", background: "#fff" }}
                    className="shadow-xl"
                    size="medium"
                    items={[
                      {
                        key: "1",
                        label: (
                          <Typography.Text className="text-[16px] text-start">
                            Story
                          </Typography.Text>
                        ),
                        children: (
                          <Typography.Text className="px-5 font-[400]">
                            {item?.description}
                          </Typography.Text>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="progress"></div>
            </div>
          </div>

          <CustomDrawer
            cartStatus={cartStatus}
            component={<Cart setOpen={setOpen} />}
            open={open}
            setOpen={setOpen}
            onClose={onClose}
          />
          {isModalOpen && (
            <OrderModal
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              item={[item]}
              cart={false}
            />
          )}
        </Col>
      </Row>
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          open ? " backdrop-blur-md" : "bg-transparent"
        } ${open ? "z-[998]" : "z-[-1]"}`}
        onClick={onClose}
      ></div>
    </div>
  );
};
export default ProductDetails;
