import { useState } from "react";
import { verifyOtp } from "../../feature/auth/authApi";
import { Form, Input, Typography } from "antd";
import { loginSuccess } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const VerifyOtp=({mobile})=>{
      const [otp, setOtp] = useState("");
      const dispatch=useDispatch()   
      const onChange = (value) => {
        setOtp(value);
      };
      const sharedProps = {
        onChange,
      };
     const verifyOtpHandler = async () => {
      if (otp==="" || otp.length < 4) return toast.error("Please enter valid otp")
        
        try {
          const res = await verifyOtp({
            mobile: mobile,
            otp: otp,
            role: "user",
          });
    
          if (res.status) {            
            toast.success(res.message);
            localStorage.setItem("token", res.data?.token);
            localStorage.setItem("userId", res.data?._id);
            localStorage.setItem("role", res.data?.role);
            localStorage.setItem("cart",res.data?.cart?.length)
            localStorage.setItem("wish",res.data?.wishlist?.length)
            dispatch(loginSuccess({ token: res.data.token, users: res.data }));
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      };
    return(
        <>
         <div>
                <div>
                  <div className="flex justify-center pb-2">
                    <Typography.Text className="text-center">
                      Enter OTP
                    </Typography.Text>
                  </div>
                  <div className="otp flex justify-center">
                    <Form.Item
                      styles={{}}
                      variant={"borderless"}
                      layout="vertical"
                      rules={[{ required: true }]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input.OTP length={4} {...sharedProps} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  verifyOtpHandler();
                }}
                className="w-[100%] bg-[#214344] text-[#fff] rounded-full py-2 "
              >
                Verify Via OTP
              </button>
        </>

    )
}
export default VerifyOtp;