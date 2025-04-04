import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import EasyMenuHeader from "./EasyMenuHeader";
import { useDispatch, useSelector } from "react-redux";
import headerImage from "../../assets/header.png";
import CustomDrawer from "../CustomDrawer";
import Cart from "../cart/Cart";
import serach from "../../assets/search.png";
import bag from "../../assets/icons/bagYellow.png";
import wishlist from "../../assets/wishlist.png";
import menuIcon from "../../assets/icons/menuYellow.png";
import CustomSearch from "../home/CustomSearch";
import { headerActiveTab, headermenuHandler } from "../../feature/header/headerSlice";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [wishCounter, setWishCounter] = useState(0);
  const searchData = useSelector((state) => state.product.searchData);
  const dispatch = useDispatch();
  const showDrawer = () => {
    // setOpen(true);
    dispatch(headermenuHandler(true));
  };
  const onClose = () => {
    // setOpen(false);
    dispatch(headermenuHandler(false));
  };
  const cartShowDrawer = (status) => {
    if(cartCounter === 0 || wishCounter === 0) return  dispatch(headermenuHandler(true),dispatch(headerActiveTab("profile")))
    setCartOpen(true);

    setCartStatus(status);
  };

  const cartOnClose = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    const updateCartCounter = () => {
      setCartCounter(localStorage.getItem("cart") || 0);
      setWishCounter(localStorage.getItem("wish") || 0);
    };

    // Update cart counter initially
    updateCartCounter();

    // Listen for changes from other tabs
    window?.addEventListener("storage", updateCartCounter);

    // Listen for changes in the same tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "cart" || key === "wish") updateCartCounter();
    };

    return () => {
      window?.removeEventListener("storage", updateCartCounter);
      localStorage.setItem = originalSetItem; // Restore original
    };
  }, []);

  return (
    <>
      <div className="relative w-full">
        <div
          className={`header fixed w-full z-[999] bg-[#214344] ${
            isModalOpen || open || cartOpen ? "backdrop-blur-md" : ""
          } ${open ? "backdrop-blur-md" : ""}`}
        >
          <div className="flex justify-between md:px-[56px] px-[30px] py-5    items-center">
            <div className="flex items-center">
              <div className="flex md:gap-[56px]  gap-5 items-center cursor-pointer ">
                <NavLink
                  onClick={() => {
                    cartShowDrawer("wishlist");
                  }}
                  className={"relative max-sm:hidden  cursor-pointer"}
                >
                  <div className="h-[32px] w-[31px] pt-[2px] ">
                    <img src={wishlist} alt="wishlist" />
                  </div>
                  {wishCounter > 0 && (
                    <div className="flex justify-center   text-[#214344] items-center absolute  text-[10px] text-center  -top-1  -right-3 h-[16px] w-[16px] rounded-full bg-[#F0D5A0]">
                      {wishCounter}
                    </div>
                  )}
                </NavLink>
                <NavLink
                  // onClick={cartShowDrawer}
                  onClick={() => {
                    cartShowDrawer("cart");
                  }}
                  className="relative"
                >
                  <div className="md:h-[28px] h-[20px] md:w-[25px] w-[16px]  cursor-pointer">
                    <img className="object-fit" src={bag} alt="bag"/>
                  </div>
                  {cartCounter > 0 && (
                    <div className="flex justify-center  text-[#214344] items-center absolute  text-[10px] text-center  -top-1  -right-3 h-[16px] w-[16px] rounded-full bg-[#F0D5A0]">
                      {cartCounter}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
            <div>
              <Link to={"/"}>
                <img src={headerImage} className="lg:h-[70px] h-[35px]" alt="header" />
              </Link>
            </div>
            <div className="flex gap-[51px]  cursor-pointer">
              <div className="flex items-center md:gap-[51px]   ">
                <div
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="max-sm:hidden h-[28px] w-[28px] cursor-pointer"
                >
                  <img src={serach} className="object-fit" alt="serach" />
                </div>
                <div
                  onClick={() => {
                    showDrawer();
                  }}
                >
                  <div className=" md:h-[12px] md:w-[24px] h-[8px] w-[18px]">
                    <img className="object-fit" src={menuIcon}  alt="menu"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 transition-all duration-300 ${
            open ? " backdrop-blur-md" : "bg-transparent"
          } ${open || cartOpen ? "z-[998]" : "z-[-1]"}`}
          onClick={onClose}
        ></div>

        {/* <CustomDrawer  component={<Cart />} open={cartOpen} setOpen={setOpen} onClose={cartOnClose} /> */}
        <EasyMenuHeader
          setCartCounter={setCartCounter}
          setWishCounter={setWishCounter}
          setCartStatus={setCartStatus}
          setCartOpen={setCartOpen}
        />
        <CustomDrawer
          cartStatus={cartStatus}
          component={<Cart />}
          open={cartOpen}
          setCartOpen={setCartOpen}
          onClose={cartOnClose}
        />

        {isModalOpen && (
          <div className="  overflow-y-scroll fixed w-full transition-all duration-1000 ease-in-out transform bg-[#efe6dc]  z-[9999]">
            <div className=" z-[999] w-full bg-[#efe6dc]">
              <CustomSearch
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                items={searchData}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
