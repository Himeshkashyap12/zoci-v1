import { Modal, Form, Input, Button, ConfigProvider, Typography } from "antd";
import { addOrder, payment } from "../../feature/order/orderApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../../feature/auth/authSlice";
import { getUserData } from "../../feature/auth/authApi";
import { toast } from "react-toastify";
import { addToCart } from "../../feature/categary/cartSlice";
import { getCartData } from "../../feature/categary/cartApi";

const OrderModal = ({ isModalOpen, setIsModalOpen, item, cart }) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [orderStatus, setOrderStatus] = useState(false);
  const [order, setOrder] = useState({});
  const users = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [orderInput, setOrderInput] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const orderInputHandler = (e) => {
    setOrderInput({
      ...orderInput,
      [e.target.name]: e.target.value,
    });
  };
  const orderFormHandler = async () => {
    if(localStorage.getItem("role")==="admin") return toast.error("Admin can't place order");
    if(orderInput?.pincode?.length !==6) return toast.error("Please enter valid pincode");
    if (
      orderInput.firstname == "" ||
      orderInput.lastname == "" ||
      orderInput.address == "" ||
      orderInput.city == "" ||
      orderInput.state == "" ||
     ( orderInput.pincode == "")
    ) {
      return toast.error("Please enter all the details");
    }
    const data = {
      shippingInfo: { ...orderInput },
      userId: localStorage.getItem("userId"),
      orderItems: item.map((ele) => ({
        product: ele?._id,
        quantity: cart ? ele.quantity : 1,
        price: ele?.price,
      })),
      totalPrice: item.reduce((acc, ele) => acc + ele.price, 0),
    };

    try {
      const res = await addOrder(data);
      setOrderStatus(true);
      toast.success(res.message);
      setOrder(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form when closing
    setIsModalOpen(false);
  };

  const getCartDataHandler = async () => {
    try {
      const response = await getCartData();
        dispatch(addToCart(data));
    } catch (error) {
      if (error?.response?.data?.message === "No items in the cart") {
        dispatch(addToCart([]));
      }
    }
  };

  const orderPlace = async (data) => {
    try {
      const res = await payment(data);
      toast.success(res.message);
      if (cart) getCartDataHandler();
      localStorage.setItem("cart", parseInt(cart?.length) - 1);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsModalOpen(false);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      redirect: false,
      amount: parseInt(order.paymentAmount * 100),
      currency: "INR",
      name: "Zoci",
      description: order?.description,
      order_id: order?.razorpayOrderId,
      image:
        "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740047051814_Screenshot%202025-02-20%20155231.png",
      handler: function (response) {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          userId: localStorage.getItem("userId"),
        };
        orderPlace(data);
      },
      prefill: {
        name: `${order.shippingInfo.firstname} ${order.shippingInfo.lastname}`,
        contact: users.mobile,
        email: "hello@zoci.in",
      },

      notes: {
        address: "India",
      },
      theme: {
        color: "#214344",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      setIsModalOpen(false);
      alert("Payment failed, try again");
      paymentWindow.close();
    });
    paymentObject.open();
  };

  const getUserHandler = async () => {
    try {
      const res = await getUserData();
      dispatch(addUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  return (
    <Modal
      title={
        <Typography.Text className="text-[20px] ">Create Order</Typography.Text>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <ConfigProvider theme={{ token: { colorPrimary: "#214344" } }}>
        {!orderStatus ? (
          <div className="bg-white w-full p-6 rounded-lg shadow-md">
            <Form>
              <div className="flex flex-col gap-5">
                <Input
                  name="firstname"
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  value={orderInput?.firstname}
                  className="rounded-full"
                  placeholder="Enter your First Name"
                />

                <Input
                  name="lastname"
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  value={orderInput?.lastname}
                  className="rounded-full"
                  placeholder="Enter your Last Name"
                />

                <Input
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  name="address"
                  value={orderInput?.address}
                  className="rounded-full"
                  placeholder="Enter your Address"
                />

                <Input
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  name="city"
                  value={orderInput?.city}
                  className="rounded-full"
                  placeholder="Enter your City"
                />

                <Input
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  name="state"
                  value={orderInput?.state}
                  className="rounded-full"
                  placeholder="Enter your State"
                />

                <Input
                  name="pincode"
                  type="number"
                  value={orderInput?.pincode}
                  onChange={(e) => {
                    orderInputHandler(e);
                  }}
                  className="rounded-full"
                  placeholder="Enter your Pin Code"
                />

                <Button
                  onClick={orderFormHandler}
                  type="primary"
                  htmlType="submit"
                  className="w-full rounded-full hover:!bg-[#214344] bg-[#214344]"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <>
            <div className="flex flex-col  gap-3 py-5">
              {item.map((ele, idx) => {
                return (
                  <div key={idx} className="flex  gap-5">
                    <div className="size-[100px]">
                      <img
                        src={ele?.images?.productImage}
                        className="rounded-md object-cover"
                        alt="product"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Typography.Text className="text-[#214344] text-[24px] font-semibold">
                        {ele?.title}
                      </Typography.Text>
                      <Typography.Text className="text-[#214344] text-[16px] font-bold">
                        Rs.{ele?.price}
                      </Typography.Text>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    pay();
                  }}
                  className="bg-[#214344] !hover:!text-[#fff] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-500 transform hover:scale-125 "
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </>
        )}
      </ConfigProvider>
    </Modal>
  );
};

export default OrderModal;
