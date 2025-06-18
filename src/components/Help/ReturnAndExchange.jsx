import { Typography } from "antd";
import { useEffect } from "react";

const ReturnAndExchange = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex flex-col  sm:pt-[110px] pt-[70px] ">
        <div className="flex flex-col justify-center items-center bg-[#efe6dc] sm:px-20 px-5 py-10">
          <Typography.Text className="sm:text-[30px] text-[24px] font-semibold">
            Return & Exchange Policy
          </Typography.Text>
          <div className="flex gap-5">
            <Typography.Text className="text-[16px]">Home</Typography.Text>
            <Typography.Text className="text-[16px]">
              Return & Exchange Policy
            </Typography.Text>
          </div>
        </div>
        <div className="py-20">
          <div className="sm:px-20  px-5 flex flex-col gap-1  ">
            <Typography.Text className="text-[16px] ">
             1)  We do not accept any return or exchange of products . 
              </Typography.Text>
            <Typography.Text className="text-[16px] ">

             2)  Please make sure to shoot an unboxing video of the product, just in case there
              has been a damage at the time of delivery. 
              </Typography.Text>
              <Typography.Text className="text-[16px] ">

             3) Feel free to reach out to us if this is the case .
             </Typography.Text>

           
          </div>
        </div>
      </div>
    </>
  );
};
export default ReturnAndExchange;
