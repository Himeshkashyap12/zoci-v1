import { useEffect, useState } from "react";
import { sendOtp, verifyOtp } from "../../feature/auth/authApi";
import { Button, Form, Input, Typography } from "antd";
import { loginSuccess } from "../../feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Cookies from 'js-cookie';
const VerifyOtp=()=>{
      const [otp, setOtp] = useState("");
      const [resendTime,setResendTime]=useState(true)
      const [resendTimeCount,setResendTimeCount]=useState(30)
      console.log(resendTimeCount);
      
      const dispatch=useDispatch()  
      const mobileNumber=useSelector(state=>state.auth.mobile) 
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
            mobile: mobileNumber.mobile,
            otp: otp,
            role: "user",
          });
    
          if (res.status) {            
            toast.success(res.message);
            localStorage.setItem("token", res.data?.token);
            Cookies.set('token', res.data?.token, { expires: 1 });
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


      const resendOtpHandler=async()=>{
              try {
                  const res = await sendOtp(mobileNumber);
                  setResendTimeCount(30)
                    toast.success(res.message);
                    setResendTime(true)

                   
                } catch (error) {
                  console.log(error);
                  toast.error(error.response.data.message);
                }
      }


      useEffect(() => {
        if (resendTimeCount === 0) {
          setResendTime(false);
          return;
        }
    
        const countTime = setInterval(() => {
          setResendTimeCount((prev) => prev - 1);

        }, 1000);
    
        return () => clearInterval(countTime); // Cleanup to prevent memory leaks
      }, [resendTimeCount]);
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
              <div className="flex justify-center">
             {setResendTime && <sapn className="text-[#214344] pe-3">{resendTimeCount==0?null:`${resendTimeCount}  sec`}</sapn> } <button  onClick={()=>{resendOtpHandler()}} className={`hover:text-[#214344] ${resendTime?"text-[gray] hover:!text-[gray]":null}`} disabled={resendTime}  >Resend Otp</button>
              </div>
             
              
        </>

    )
}
export default VerifyOtp;