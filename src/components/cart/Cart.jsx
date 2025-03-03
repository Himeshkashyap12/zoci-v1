import { Button, Empty, Progress, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteCartData,
  getCartData,
  updateCartApi,
} from "../../feature/categary/cartApi.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../feature/categary/cartSlice.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import OrderModal from "../order/order.jsx";
const Cart = ({ setCartOpen }) => {
  const cartData = useSelector((state) => state?.cart?.cart);  
  const cart = useSelector((state) => state.cart.cartLenght);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sum = 0;
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
  const cartCounterHandler = async (items, status) => {
    let quantity = items.quantity;
    if (quantity === 0 && status === "minus") return;
    if (status === "plus") quantity += 1;
    if (status === "minus") quantity -= 1;
    try {
      const data = {
        productId: items?._id,
        quantity: quantity,
        userId: localStorage.getItem("userId"),
      };
      const res = await updateCartApi(data);
      toast.success(res?.data?.message);
      getCartDataHandler();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteCartHandler = async (items) => {
    if (cartData?.length === 0) return;
    const id = items?._id;
    try {
      const response = await deleteCartData(id);
      toast.success(response?.data?.message);
      localStorage.setItem("cart", parseInt(cart) - 1);
      getCartDataHandler();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  useEffect(() => {
    getCartDataHandler();
  }, []);

  return (
    <>
      <div className="bg-[#efe6dc] min-h-[calc(100vh-85px)]  w-full ">
        <div className="cart  px-5 w-full h-auto pb-3">
          {/* <Progress   /> */}
          <div className="overflow-y-auto  pt-5">
            {cartData?.length == 0 && (
              <Empty
                imageStyle={{ height: "200px" }}
                description={
                  <div>
                    <Progress />
                    <h4 className="text-start text-[#000] font-[400] text-[15px]">
                      Congrats! You are eligible for more to enjoy FREE Shipping
                    </h4>
                  </div>
                }
              />
            )}
            {cartData?.map((item, idx) => {
              sum += item?.price * item?.quantity;
              return (
                <div className="flex justify-between px-5 pt-5" key={idx}>
                  <div className=" flex gap-3">
                    <div className="h-[100px] w-[100px]">
                      <img
                        src={item?.images?.productImage}
                        alt="productimage"
                        className="w-full h-full rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col  gap-2">
                      <Typography.Text className="text-[16px] font-[400] ">
                        {item?.title}
                      </Typography.Text>
                      <Typography.Text className="text-[16px] font-bold">
                        Rs {item?.price}
                      </Typography.Text>
                      <div className="flex items-center gap-2">
                        <div className="  rounded-full flex items-center">
                          <Button
                            onClick={() => {
                              cartCounterHandler(item, "minus");
                            }}
                            className="text-[10px] size-8  rounded-full bg-[#214344]  text-[#fff]  hover:!border-[#214344] hover:!text-[#214344] "
                          >
                            -
                          </Button>
                        </div>
                        <Typography.Text>{item?.quantity}</Typography.Text>
                        <Button
                          onClick={() => {
                            cartCounterHandler(item, "plus");
                          }}
                          className="text-[10px] size-8  rounded-full bg-[#214344]  text-[#fff]  hover:!border-[#214344] hover:!text-[#214344]"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="pt-2 cursor-pointer"
                    onClick={() => {
                      deleteCartHandler(item);
                    }}
                  >
                    <DeleteOutlined style={{ fontSize: "30px" }} />
                  </div>
                </div>
              );
            })}
          </div>
          {cartData?.length > 0 && (
            <div className="total">
              <div>
                <div className="flex justify-between px-5 pt-4">
                  <h3 className="text-[14px] font-[600]">Sub Total :</h3>
                  <h3 className="text-[14px] font-[600]">Rs. {sum}.00</h3>
                </div>
                <div className="flex justify-between px-5 pt-2">
                  <h3 className="text-[14px] font-[600]"> Total :</h3>
                  <h3 className="text-[14px] font-[600]">Rs. {sum}.00</h3>
                </div>
                <div></div>
              </div>
              <div className="flex  justify-between pt-3">
                <div>
                  <Button
                    className="bg-[#214344] text-[#fff] text-[16px] md:w-[210px] w-[150px] font-[400] rounded-full py-5 hover:!border-[#214344] hover:!text-[#214344]"
                    onClick={() => {
                      navigate("/viewcart"), setCartOpen(false);
                    }}
                  >
                    View Cart
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="bg-[#214344] text-[#fff] text-[16px]  md:w-[210px] w-[150px] font-[400] rounded-full py-5 hover:!border-[#214344] hover:!text-[#214344]"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <OrderModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          item={cartData}
          cart={true}
        />
      )}
    </>
  );
};
export default Cart;
