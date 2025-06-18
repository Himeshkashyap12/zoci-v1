import { Drawer, Tooltip } from "antd";
import Cart from "./cart/Cart";
import { useEffect, useState } from "react";
import wishListYellow from "../assets/icons/wishlistyellow.png";
import wishListGreen from "../assets/icons/wishlistGreen.png";
import closeIcon from "../assets/closeicon.png";
import greenBag from "../../src/assets/icons/greenBag.png";
import yellowBag from "../../src/assets/icons/bagYellow.png";
import WishList from "./wishlist/WishList";

const CustomDrawer = ({
  setCartOpen,
  open,
  onClose,
  placement,
  width,
  cartStatus,
}) => {
  const [activeDrawer, setActiveDrawer] = useState("cart");
  useEffect(() => {
    setActiveDrawer(cartStatus);
  }, [cartStatus]);

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div onClick={onClose} className="h-[20px] w-[20px]">
              <img src={closeIcon} alt="closeIcon" />
            </div>
            <div className="flex items-center gap-3">
              <Tooltip placement="left" title={"Cart"}>
                <button
                  onClick={() => {
                    setActiveDrawer("cart");
                  }}
                  className={`text-white ${
                    activeDrawer === "cart" && "bg-[#F0D5A0]"
                  }   text-sm  p-2  rounded-full "`}
                >
                  <div className="flex justify-center items-center">
                    <div className="h-[26px] w-[22px]">
                      {activeDrawer === "cart" ? (
                        <img className="h-full w-full" src={greenBag} alt="greenBag" />
                      ) : (
                        <img className="h-full w-full" src={yellowBag} alt="greenBag" />
                      )}
                    </div>
                  </div>
                </button>
              </Tooltip>
              <Tooltip placement="left" title={"Add to Wishlist"}>
                <div className="rounded-full p-2 cursor-pointer">
                  <button
                    onClick={() => {
                      setActiveDrawer("wishList");
                    }}
                    className={`text-white ${
                      activeDrawer != "cart" && "bg-[#F0D5A0]"
                    }   text-sm  p-2  rounded-full text-center"`}
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[24px] w-[24px]">
                        <img
                        alt="greenBag"
                          src={
                            activeDrawer != "cart"
                              ? wishListGreen
                              : wishListYellow
                          }
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </Tooltip>
            </div>
          </div>
        }
        closable={false}
        placement={placement ?? "right"}
        width={width ?? 500}
        onClose={onClose}
        open={open}
        styles={{
          body: { background: "#fff" },
          header: { background: "#214344" },
        }}
      >
        {activeDrawer == "cart" ? (
          <Cart setCartOpen={setCartOpen} />
        ) : (
          <WishList setCartOpen={setCartOpen} />
        )}
      </Drawer>
    </>
  );
};
export default CustomDrawer;
