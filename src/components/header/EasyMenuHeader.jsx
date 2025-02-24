import React, { useState } from "react";
import { Collapse, Drawer, Tooltip, Typography } from "antd";
import { Link, NavLink, useNavigate } from "react-router";
import { SearchOutlined, WhatsAppOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {
  FaFacebook,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import closeIcon from "../../assets/closeicon.png";

import shopingCart from "../../assets/icons/shopYellow.png";
import wishListGreen from "../../assets/icons/wishlistGreen.png";
import catalogueYellow from "../../assets/icons/catalogueYellow.png";
import homeGreen from "../../assets/icons/homeGreen.png";
import profileGreen from "../../assets/icons/GreenProfile.png";

import shopingCartYellow from "../../assets/icons/shopGreen.png";
import wishListYellow from "../../assets/icons/wishlistyellow.png";
import catalogueGreen from "../../assets/icons/catalogueGreen.png";
import homeYellow from "../../assets/icons/homeYellow.png";
import profileYellow from "../../assets/icons/profileYellow.png";

import { getProductFilterApi } from "../../feature/product/productApi";
import Catalogue from "../catalogue/Catalogue";
import WishList from "../wishlist/WishList";
import "./header.css";
import SignUp from "../auth/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { TbBrandLinkedin, TbPointFilled } from "react-icons/tb";
import { searchProducts } from "../../feature/product/productSlice";
import { toast } from "react-toastify";
import { headermenuHandler } from "../../feature/header/headerSlice";
const siderStyle = {
  height: "full",
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#214344",
};
const EasyMenuHeader = ({ setCartCounter, setWishCounter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [searchData,setSearchData]=useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const searchData = useSelector((state) => state.product.searchData);
  const open = useSelector((state) => state.header.headermenu);
  const onClose = () => {
    dispatch(headermenuHandler(false));
  };

  const filterSubcategary = async (data) => {
    try {
      const filters = { category: data };
      const res = await getProductFilterApi({ filters });
      dispatch(addproductToshop(res?.products));
      dispatch(addCategary(data));
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (e) => {
    try {
      const search = { title: e.target.value };
      const res = await getProductFilterApi({ search });
      dispatch(searchProducts(res.products));
    } catch (error) {
      console.log(error);
      if(error.response.data.message==="No products found"){
        dispatch(searchProducts([]));

      };
    }
  };

  return (
    <Drawer
      placement={"left"}
      width={550}
      onClose={onClose}
      closable={false}
      className=""
      open={open}
      style={{ background: "#efe6dc" }}
    >
      <div className="flex ">
        <Sider width="16%" style={siderStyle} className="h-[100vh]  ">
          <div className="flex  flex-col justify-between items-center gap-5 py-5 h-[100%]">
            <div className="flex-col flex gap-4  items-center  ">
              <div
                className="flex justify-center items-center  cursor-pointer"
                onClick={onClose}
              >
                <div className=" w-[20px] h-[20px]  rounded-full flex items-center justify-center  ">
                  <img src={closeIcon} />
                </div>
              </div>
              <Tooltip placement="left" title={"Home"}>
                <button
                  onClick={() => setActiveTab("home")}
                  className={` rounded-full p-2   ${
                    activeTab === "home" ? "bg-[#F0D5A0] " : "bg-transparent"
                  } `}
                >
                  <div className="h-[24px] w-[24px] flex items-center">
                    <img
                      className="w-full h-full"
                      src={activeTab === "home" ? homeGreen : homeYellow}
                    />
                  </div>
                </button>
              </Tooltip>
              <Tooltip placement="left" title={"Shop"}>
                <button
                  onClick={() => setActiveTab("cart")}
                  className={` rounded-full p-2   ${
                    activeTab === "cart" ? "bg-[#F0D5A0] " : "bg-transparent"
                  } `}
                >
                  <div className="h-[24px] w-[24px] flex items-center">
                    <img
                      className=""
                      src={
                        activeTab === "cart" ? shopingCartYellow : shopingCart
                      }
                    />
                  </div>
                </button>
              </Tooltip>
              <Tooltip placement="left" title={"Add to Wishlist"}>
                <div className=" rounded-full   cursor-pointer">
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`p-2  rounded-full  ${
                      activeTab === "wishlist"
                        ? "bg-[#F0D5A0] "
                        : "bg-transparent"
                    } `}
                  >
                    <div className="h-[24px] w-[24px]  flex justify-center items-center">
                      <img
                        className="object-fit"
                        src={
                          activeTab == "wishlist"
                            ? wishListGreen
                            : wishListYellow
                        }
                      />
                    </div>
                  </button>
                </div>
              </Tooltip>
              <Tooltip placement="left" title={"catalogue"}>
                <div className='className="bg-[#214344] rounded-full  cursor-pointer"'>
                  <button
                    onClick={() => setActiveTab("catalogue")}
                    className={`text-white   ${
                      activeTab === "catalogue"
                        ? "bg-[#F0D5A0] "
                        : "bg-transparent"
                    }   text-sm  p-2  rounded-full text-center"`}
                  >
                    <div className="h-[24px] w-[24px] flex justify-center items-center">
                      <img
                        className="object-fit"
                        src={
                          activeTab == "catalogue"
                            ? catalogueGreen
                            : catalogueYellow
                        }
                      />
                    </div>
                  </button>
                </div>
              </Tooltip>
              <Tooltip placement="left" title={"Profile"}>
                <div className='className="bg-[#214344] rounded-full  cursor-pointer"'>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`text-white    ${
                      activeTab === "profile"
                        ? "bg-[#F0D5A0] "
                        : "bg-transparent"
                    }   text-sm  p-2  rounded-full text-center"`}
                  >
                    <div className="h-[24px] w-[24px]">
                      <img
                        className="object-fit"
                        src={
                          activeTab == "profile" ? profileGreen : profileYellow
                        }
                      />
                    </div>
                  </button>
                </div>
              </Tooltip>
            </div>
            <div className=" flex flex-col gap-3">
              <Link
                to={"https://www.instagram.com/accounts/login/?hl=en"}
                target="_blank"
              >
              <FaInstagram style={{ fontSize: "20px", color: "#F0D5A0" }} />
              </Link>
              <Link to={"https://www.facebook.com"} target="_blank">
                <FaFacebook style={{ fontSize: "20px", color: "#F0D5A0" }} />
              </Link>
              <Link to={"https://www.pinterest.com"} target="_blank">
                <FaPinterestP style={{ fontSize: "20px", color: "#F0D5A0" }} />
              </Link>
              <Link to={"https://www.youtube.com"} target="_blank">
                <FaYoutube style={{ fontSize: "20px", color: "#F0D5A0" }} />
              </Link>
              <Link to={"https://web.whatsapp.com"} target="_blank">
                <WhatsAppOutlined
                  style={{ fontSize: "20px", color: "#F0D5A0" }}
                />
              </Link>
              <Link to={"https://in.linkedin.com"} target="_blank">
                <TbBrandLinkedin
                  style={{ fontSize: "24px", color: "#F0D5A0" }}
                />
              </Link>
            </div>
          </div>
        </Sider>
        {activeTab == "catalogue" && <Catalogue />}
        {activeTab == "wishlist" && (
          <div className=" pt-16 w-full">
            <WishList />
          </div>
        )}
        {activeTab == "profile" && (
          <SignUp
            setWishCounter={setWishCounter}
            setCartCounter={setCartCounter}
          />
        )}

        <div className=" pt-[55px] home-tab">
          {activeTab === "home" && (
            <div className="px-10 relative">
              <div className="relative ">
                <input
                  placeholder="Search your products"
                  onChange={(e) => {
                    searchHandler(e);
                  }}
                  className=" bg-[#fff] rounded-full px-5 py-2 md:w-[300px]    "
                />
                <div className="absolute top-2 right-2">
                  <SearchOutlined style={{ fontSize: "20px" }} />
                </div>
              </div>
              {searchData.map((item, idx) => {
                return (
                  <Link to={`/product/${item._id}`} onClick={()=>{dispatch(headermenuHandler(false))}} className="absolute top-12 z-[99] w-[80%]">
                    <div className="bg-[#fff] rounded-md">
                      <div className="flex gap-5 px-2 py-1 shadow-lg rounded-md">
                        <div className="size-[50px] ">
                          <img className="rounded-xl" src={item.images[0]} />
                        </div>
                        <div className="flex flex-col">
                          <Typography.Text className="text-[14px] font-semibold">
                            {item.title}
                          </Typography.Text>
                          <Typography.Text>Rs.{item.price}</Typography.Text>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {activeTab == "home" && (
            <div className="flex flex-col px-10 pt-5 gap-2">
              <NavLink
                onClick={() => {
                  dispatch(headermenuHandler(false));
                }}
                className="text-[#214344] text-[16px] font-[600] hover:text-[#214344]"
                to={"/"}
              >
                <div className="flex gap-2 items-center h-[20px] w-[20px]">
                  {/* <img src={homeGreen} /> */}
                  <h6> Home</h6>
                </div>
              </NavLink>
              <NavLink className="text-[#214344] text-[16px] font-[600] hover:text-[#214344]">
                <Collapse
                  size="small"
                  // showArrow={false}
                  style={{ padding: "0", background: "#efe6dc" }}
                  expandIconPosition={"end"}
                  bordered={false}
                  // collapsible={"disable"}
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="flex gap-2 items-center h-[20px] w-[20px]">
                          {/* <img src={shopingCartYellow} /> */}
                          <h6 className="text-[#214344] text-[16px]"> Shop</h6>
                        </div>
                      ),
                      children: (
                        <div className="flex flex-col gap-2">
                          <NavLink
                            onClick={() => {
                              filterSubcategary("pendents"),
                                dispatch(headermenuHandler(false));
                            }}
                            className={"hover:text-[#214344] "}
                            to={"/shop"}
                          >
                            <div className="flex gap-2 items-center text-[#214344]">
                              <TbPointFilled />
                              Pendents
                            </div>
                          </NavLink>
                          <NavLink
                            onClick={() => {
                              filterSubcategary("ring"),
                                dispatch(headermenuHandler(false));
                            }}
                            className={"hover:text-[#214344]"}
                            to={"/shop"}
                          >
                            <div className="flex gap-2 items-center text-[#214344]">
                              <TbPointFilled />
                              Rings
                            </div>
                          </NavLink>
                          <NavLink
                            onClick={() => {
                              filterSubcategary("bracelets"),
                                dispatch(headermenuHandler(false));
                            }}
                            className={"hover:text-[#214344]"}
                            to={"/shop"}
                          >
                            <div className="flex gap-2 items-center text-[#214344]">
                              <TbPointFilled />
                              Bracelets
                            </div>
                          </NavLink>
                          <NavLink
                            onClick={() => {
                              filterSubcategary("earings"),
                                dispatch(headermenuHandler(false));
                            }}
                            className={"hover:text-[#214344]"}
                            to={"/shop"}
                          >
                            <div className="flex gap-2 items-center text-[#214344]">
                              <TbPointFilled />
                              Earings
                            </div>
                          </NavLink>
                          <NavLink
                            onClick={() => {
                              filterSubcategary("nackeless"),
                                dispatch(headermenuHandler(false));
                            }}
                            className={"hover:text-[#214344] text-[#214344]"}
                            to={"/shop"}
                          >
                            <div className="flex gap-2 items-center">
                              <TbPointFilled />
                              Nackless
                            </div>
                          </NavLink>
                        </div>
                      ),
                    },
                  ]}
                />
              </NavLink>
              <NavLink
                onClick={() => {
                  setActiveTab("cart");
                }}
                className="text-[#214344] text-[16px] font-[600] hover:text-[#214344]"
              >
                <div className="flex gap-3 items-center h-[18px] w-[18px]">
                  <h6> Bag</h6>
                </div>
              </NavLink>
              <NavLink
                onClick={() => {
                  dispatch(headermenuHandler(false));
                }}
                to={"/aboutus"}
                className="text-[#214344] text-[16px] font-[600] hover:text-[#214344]"
              >
                <div className="flex items-center"> About us</div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};
export default EasyMenuHeader;
