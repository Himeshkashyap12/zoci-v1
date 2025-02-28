import { Typography } from "antd";
import { useEffect } from "react";

const ReturnAndExchange=()=>{
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return(
        <>
        <div className="flex flex-col  sm:pt-[110px] pt-[70px] ">
        <div className="flex flex-col justify-center items-center bg-[#efe6dc] sm:px-20 px-5 py-10">
          <Typography.Text className="sm:text-[30px] text-[24px] font-semibold">Return & Exchange Policy</Typography.Text>
          <div className="flex gap-5">
            <Typography.Text className="text-[16px]">Home</Typography.Text>
            <Typography.Text className="text-[16px]">Return & Exchange Policy</Typography.Text>
          </div>
        </div>
        <div className="py-20">
        <div className="sm:px-20 px-5  flex flex-col gap-5  ">
          <Typography.Text className="text-[16px]">1. Each purchase comes with a hassle-free 15-day return policy and a one-year warranty on plating and repairs.</Typography.Text>
          <Typography.Text className="text-[16px]">2. If you are not satisfied with your order, you are given 7 days to make the return in exchange for store credit which will be valid for 3 months only, except for custom orders and sale items which cannot be returned or exchanged.</Typography.Text>
          <Typography.Text className="text-[16px]">3. Any returned item must be unused and in its original condition and packaging, with all tags still attached.</Typography.Text>
        
        </div>
        <div className="sm:px-20  px-5 flex flex-col gap-5  ">
          <Typography.Text className="text-[20px] font-bold pt-5">STEPS TO MAKE A RETURN</Typography.Text>
          <Typography.Text className="text-[16px]"> Email us on zoci.india@gmail.com or you can WhatsApp us on +91 9616773377 to initiate the return process.</Typography.Text>
          <Typography.Text className="text-[16px]">Keep the piece you wish to return, ready with original tags and packaging.</Typography.Text>
          <Typography.Text className="text-[16px]">We will arrange for the return pick up, all you have to do is hand over the package to the delivery executive.</Typography.Text>
          <Typography.Text className="text-[16px]">Once we receive the returned product at our warehouse, we will either process the store credit or dispatch the replacement or exchanged product.</Typography.Text>
        
        </div>
        </div>
      </div>
        </>
    )
}
export default ReturnAndExchange;