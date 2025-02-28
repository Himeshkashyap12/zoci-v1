import { Typography } from "antd";
import { useEffect } from "react";

const JewelleryCareGuide = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <div className="flex flex-col  sm:pt-[110px] ">
        <div className="flex flex-col justify-center items-center bg-[#efe6dc] sm:px-20 px-5 py-10">
          <Typography.Text className="text-[30px] font-semibold">Jewelry Care Guide</Typography.Text>
          <div className="flex gap-5">
            <Typography.Text className="text-[16px]">Home</Typography.Text>
            <Typography.Text className="text-[16px]">JEWELRY CARE GUIDE</Typography.Text>
          </div>
        </div>
        <div className="sm:px-20 px-5 flex flex-col gap-2  py-20">
          <Typography.Text className="text-[16px]"> To maintain the longevity of your piece, please adhere to the following care instructions:</Typography.Text>
          <Typography.Text className="text-[16px]">– Clean and polish the jewelry with the provided soft cloth.</Typography.Text>
          <Typography.Text className="text-[16px]">– Store the jewelry separately to prevent scratches and tangles.</Typography.Text>
          <Typography.Text className="text-[16px]">– Avoid contact with perfumes, chemicals, moisture, excessive force, or extreme temperatures to preserve its luster.</Typography.Text>
          <Typography.Text className="text-[16px]">Each purchase comes with a one-year warranty covering repairs and plating. For further details, please contact our customer service team.</Typography.Text>
        
        </div>
      </div>
    </>
  );
};
export default JewelleryCareGuide;
