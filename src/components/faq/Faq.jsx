import { Typography } from "antd";
import { useEffect } from "react";
import { Link } from "react-router";

const Faq = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="faq pt-[120px] pb-10 max-sm:px-5">
      <div className="flex flex-col gap-3">
        <Typography.Text className="font-bold text-[24px]   text-center ">
          Here are some Q/As for a luxury silver jewelry page
        </Typography.Text>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: What type of silver do you use in your jewelry?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: We use high-quality 925 sterling silver in all our pieces.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: What are CZ stones?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: CZ stones are lab-created zirconia crystals that mimic the
            brilliance and fire of diamonds
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: What enamel techniques do you use?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: Our artisans employ traditional enameling methods, including
            cloisonné, champlevé, and plique-a-jour to create intricate designs.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: What enamel techniques do you use?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: Our artisans employ traditional enameling methods, including
            cloisonné, champlevé, and plique-a-jour to create intricate designs.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: How do I care for my silver jewelry?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: Please see our care guide for tips on cleaning, storage, and
            maintenance.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: Can I customize a piece with my preferred stone or enamel color?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: Yes, we offer bespoke services. Contact our Zoci team at
           <Link to={"https://mail.google.com"}> Zoci.india@gmail.com</Link> to discuss your vision.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: What is the warranty on your jewelry?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: We offer a 6 months warranty against manufacturing defects.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: Do you offer polishing services?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: We guarantee a 3-month polish warranty. If the polish wears off
            within this period, we'll re-polish it for you, absolutely free !
          </Typography.Text>
        </div>

        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: How long does shipping take?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: if the product is make to order it will take at least 20 working
            days, If not, it will take 7 working days.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q:Can I return or exchange a piece if it doesn't fit?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: No, we do not accept return and exchange unless the product is
            damaged and also in case of a wrong product delivered, within a week
            of delivery.
          </Typography.Text>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Typography.Text className="font-bold text-[16px]   text-center ">
            Q: Are your pieces hallmarked or stamped?
          </Typography.Text>
          <Typography.Text className="font-bold text-[16px]   text-center ">
            A: Yes, all our jewelry bears a hallmark or stamp indicating the
            silver purity and our brand logo
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
export default Faq;
