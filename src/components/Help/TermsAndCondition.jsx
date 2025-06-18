import { Typography } from "antd";
import { useEffect } from "react";

const TermsAndCondition = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <div className="flex flex-col  sm:pt-[110px] pt-[70px] ">
        <div className="flex flex-col justify-center items-center bg-[#efe6dc] sm:px-20 px-5 py-10">
          <Typography.Text className="sm:text-[30px] text-[24px]  font-semibold">
            TERMS AND CONDITIONS
          </Typography.Text>
          <div className="flex gap-5">
            <Typography.Text className="text-[16px]">Home</Typography.Text>
            <Typography.Text className="text-[16px]">Terms and Conditions</Typography.Text>
          </div>
        </div>
        <div className="sm:px-20 px-5 flex flex-col gap-2  py-20">
          <div className="flex flex-col gap-5 pt-3">
            <Typography.Text className="text-[30px] font-semibold">
              Copyright
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              The jewelry designs, written, visual and audio content, and
              website design and processes are the property of Zoci pvt. ltd. and its
              affiliates/vendors and are protected by The Indian and
              international copyright laws.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 ">
            <Typography.Text className="text-[30px] font-semibold">
              Trademarks
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              The trademarks or trade dress of Zoci pvt. ltd.  and our affiliates may not
              be used without our written permission. Trademarks or trade dress
              include the Zoci pvt. ltd. name, logo and other graphics, page headers,
              button icons, scripts and service names of Zoci pvt. ltd. products and
              programs, are the property of Zoci pvt. ltd. and its affiliates and are
              protected by The Indian and international trademark laws. All
              other trademarks that appear on this site are the property of
              their respective owners, who may or may not be affiliated with,
              connected to, or sponsored by us or our affiliates.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              Use
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              You have permission to electronically copy and print hard copies
              of pages from this website solely for personal, non-commercial
              purposes related to placing an order or shopping with Zoci.in.
              Unless we give you written permission in advance, any other use of
              this website, its content, and its information, including linking
              or framing to this website, are strictly prohibited.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              Errors and Inaccuracies
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              Our goal is to provide complete, accurate, and up-to-date
              information on our website. Unfortunately, it is not possible to
              ensure that any website is completely free of human or
              technological errors. This site may contain typographical
              mistakes, inaccuracies, or omissions, some of which may relate to
              pricing and availability, and some information may not be complete
              or current. We reserve the right to correct any errors,
              inaccuracies, or omissions—including after an order has been
              submitted—and to change or update information at any time without
              prior notice. We sincerely apologize for any inconvenience this
              may cause.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              Disclaimer of liability
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              We make no representations or warranties of any kind, whether
              expressed or implied, with respect to this website, its content,
              or the information available on or through it; they are provided
              “as is,” with all faults. Except as otherwise provided under
              applicable laws, we and our corporate affiliates, and the
              directors, officers, employees, agents, contractors, successors
              and assigns of each, will not be liable for any damages whatsoever
              arising out of, or related to the use of this website or any other
              website linked to it. This limitation of liability applies to
              direct, indirect, consequential, special, punitive, or other
              damages you or others may suffer, as well as damages for lost
              profits, business interruption, or the loss of data or
              information, even if we are notified in advance of the potential
              for any such damages.
            </Typography.Text>
          </div>

          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              No Confidentiality
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              Except for information necessary to place an order, we do not want
              to receive confidential or proprietary information or trade
              secrets through this website. Any information, materials,
              suggestions, ideas, or comments sent to us will be deemed
              non-confidential, and by submitting it, you are granting us an
              irrevocable and unrestricted license to use, modify, reproduce,
              transmit, display, and distribute it for any purpose whatsoever,
              with no payment or other compensation to you. However, we will not
              use your name unless we are required by law to identify the source
              of the materials, information, suggestions, ideas, or comments, or
              unless we first obtain your permission.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              Applicable Laws
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              By visiting this website, you agree that the laws of India,
              without regard to principles of conflict of laws, will govern the
              Terms of Service / Conditions of Use of this Website and any
              dispute of any sort that might arise between you and us or any of
              our affiliates shall be subject to exclusive jurisdiction of Court
              in Mumbai, India..
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Typography.Text className="text-[30px] font-semibold">
              Protecting Your information
            </Typography.Text>
            <Typography.Text className="text-[16px]">
              As part of our ongoing commitment to ensure that your shopping
              experience with Zoci.in is protected, Zoci.in will prosecute all
              unauthorized or fraudulent transactions to the fullest extent
              allowed by law.
            </Typography.Text>
           <Typography.Text className="text-[16px] font-[500]"> Should you have other questions or concerns about these privacy policies, please call us at  or send us an email at zoci.india@gmail.com.</Typography.Text>

          </div>
          
        </div>
      </div>
    </>
  );
};
export default TermsAndCondition;
