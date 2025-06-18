import { Typography } from "antd";
import { useEffect } from "react";

const ShipingPolicy = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
      <div className="flex flex-col  sm:pt-[110px] pt-[70px]  ">
        <div className="flex flex-col  justify-center items-center bg-[#efe6dc] sm:px-20 px-5 py-10">
          <Typography.Text className="text-[30px] font-semibold">
            Shipping Policy
          </Typography.Text>
          <div className="flex gap-5">
            <Typography.Text className="text-[16px]">Home</Typography.Text>
            <Typography.Text className="text-[16px]">
              Shipping Policy
            </Typography.Text>
          </div>
        </div>
        <div className="sm:px-20 px-5 flex flex-col gap-5  py-20">
          <Typography.Text className="text-[16px]">
            We now ship to over a 220 countries worldwide. Register with us to
            receive updates on shipping, promotions and other related
            information.
          </Typography.Text>
          <div className="flex flex-col gap-2">
            <Typography.Text className="text-[30px] font-semibold">
              Shipping Charges: (With-in India)
            </Typography.Text>

            <Typography.Text className="text-[16px]">
              Enjoy Free Shipping on All the orders.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text className="text-[30px] font-semibold">
              Shipping Charges: (International)
            </Typography.Text>

            <Typography.Text className="text-[16px]">
              Shipping Charges are based on shipping destination and weight of
              your parcel. Shipping companies determine shipping charges based
              on the package weight, customs clearance and various other
              factors. We are unable to advise the duty amount. For more
              information, please write to us on hello@zoci.in
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              Local Custom Clearance, Insurance & Freight Charges (CIF Charges)
              will be borne by Sia Art Jewellery, however GST, duties and taxes
              will be applicable as per your country's regulations and are to be
              borne by the customer. These charges will be billed separately to
              you by the courier company at the time of delivery.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              * Prices do not include custom duty.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              For bulk volume based shipping, please contact us at
             hello@zoci.in to guide you.
            </Typography.Text>
          </div>
        
          <div className="flex flex-col gap-2">
            <Typography.Text className="text-[30px] fonst-semibold">
              IMPORTANT SHIPPING INFORMATION
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              We are not responsible for any delays caused by natural calamities
              and unavoidable circumstances.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              We are unable to redirect orders once items have been dispatched.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              All orders require a signature and proof of ID upon receipt of
              order
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              We make our best efforts to deliver each item in your order within
              stipulated timelines of your placing the order, inclusive of
              processing time. However, in some cases, we may take longer, to
              ship the order as we may have to produce/procure it.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              If you believe that the packaging is tampered with or damaged,
              before accepting delivery of the goods, please refuse to take
              delivery of the package, and call our help desk  +91 9616773377
              or email us at hello@zoci.in, mentioning your order
              reference number. We shall try our best to ensure that a
              replacement delivery is made to you at the earliest.
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              Our Customer Service may contact you for additional information if
              required. After your order is shipped, you will receive a
              confirmation email from us.
            </Typography.Text>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShipingPolicy;
