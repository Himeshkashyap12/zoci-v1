import { Col, Row } from "antd";
import { Link } from "react-router";
import footerImage from "../../assets/header.png";
import {
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getProductFilterApi } from "../../feature/product/productApi";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import {
  FaFacebook,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { TbBrandLinkedin } from "react-icons/tb";
const Footer = () => {
  const year = new Date().getFullYear();
  const dispatch = useDispatch();

  const filterSubcategary = async (data) => {
    try {
      const filters = { category: data };
      const res = await getProductFilterApi({ filters });

      dispatch(addproductToshop(res?.products));
      dispatch(addCategary(data));
    } catch (error) {
      console.log(error);
      if(error.response.data.message==="No products found"){
      dispatch(addproductToshop([]));

      dispatch(addCategary(data));

      }
    }
  };
  
  return (
    <div className="footer bg-[#214344]  pt-20 ">
      <div className="md:px-20 px-5 ">
        <Row>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <div className="flex h-full justify-end   items-center px-10">
              <img className="" src={footerImage} />
            </div>
          </Col>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <div className="max-sm:pt-16">
              <h6 className="text-[24px]  text-[#F0D5A0] font-semibold">
                LET US HELP YOU
              </h6>
              <div className="flex flex-col gap-3 pt-10">
                <Link
                  to={"/"}
                  className="text-[#fff] hover:text-[#fff] text-[18px] "
                >
                  Home
                </Link>
                <Link
                  to={"/shop"}
                  className="text-[#fff] hover:text-[#fff] text-[18px] "
                >
                  Shop
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[16px] ">
                  Cart
                </Link>
                <Link to={"/aboutus"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  About Us
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Wishlist
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Blog
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  FAQ
                </Link>
                <Link to={"contact-us"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Contact Us
                </Link>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <div className="max-sm:pt-7">
              <h6 className="text-[24px]  text-[#F0D5A0] font-semibold">
                THE COLLECTION
              </h6>
              <div className="flex flex-col gap-3 pt-10 ">
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                >
                  Signature Collection
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                >
                  Personalized Pieces
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                >
                  Regular Upkeep
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Earings");
                  }}
                >
                  Earings
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Pendants");
                  }}
                >
                  Pendants
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Chains");
                  }}
                >
                  Chains
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Bracelet");
                  }}
                >
                  Bracelet
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Cufflinks");
                  }}
                >
                 Cufflinks
                </Link>
                <Link
                  className="text-[#fff] hover:text-[#fff] text-[18px] cursor-pointer"
                  to={"/shop"}
                  onClick={() => {
                    filterSubcategary("Brooches & Tie clips");
                  }}
                >
            Brooches & Tie clips        
                    </Link>
              </div>
            </div>
          </Col>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <div className="max-sm:pt-7">
              <h6 className="text-[24px]  font-semibold text-[#F0D5A0]">
                CONTACT DETAILS
              </h6>
              <div className="flex flex-col gap-3 pt-10">
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  hello@zoci.in
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Monday – Friday: 9:00AM - 20:00PM
                </Link>
                <Link className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Santacruz East, Mumbai, Maharashtra 400055
                </Link>
              </div>
            </div>
            <div className="pt-10">
              <h6 className="text-[24px]  text-[#F0D5A0] font-semibold">
                HELP
              </h6>
              <div className="flex flex-col gap-3 pt-10">
                <Link to={"/jewelry-careguide"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Jewelry Care Guide
                </Link>
                <Link to={"/privacy-policy"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Privacy Policy
                </Link>
                <Link to={"shiping"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Shipping Policy
                </Link>
                <Link  to={"/terms-and-conditions"} className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Terms and Conditions
                </Link>
                <Link to={"/return-and-exchange"}  className="text-[#fff] hover:text-[#fff] text-[18px] ">
                  Refund and exchange policy
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="pt-5">
        <div className="flex w-full gap-5 justify-center items-center py-7 border-b-[0.5px] border-t-[1px] border-gray-500">
          <h4 className="text-[18px] font-bold text-[#F0D5A0] tracking-wide  ">
            Follow Us On
          </h4>
          <div className=" flex  gap-3">
           <Link to={"https://www.instagram.com/accounts/login/?hl=en"} target="_blank"> <FaInstagram style={{ fontSize: "20px", color: "#F0D5A0" }} /></Link>
           <Link to={"https://www.facebook.com"}    target="_blank"> <FaFacebook style={{ fontSize: "20px", color: "#F0D5A0" }} /></Link>
           <Link to={"https://www.pinterest.com"} target="_blank">  <FaPinterestP style={{ fontSize: "20px", color: "#F0D5A0" }} /></Link>
           <Link to={"https://www.youtube.com"}  target="_blank"> <FaYoutube style={{ fontSize: "20px", color: "#F0D5A0" }} /></Link>
           <Link to={"https://web.whatsapp.com"} target="_blank">  <WhatsAppOutlined style={{ fontSize: "20px", color: "#F0D5A0" }} /></Link>
           <Link to={"https://in.linkedin.com"}  target="_blank"> <TbBrandLinkedin style={{ fontSize: "24px", color: "#F0D5A0" }} /></Link>
          </div>
        </div>
        <div className="flex flex-wrap md:justify-between justify-center max-md:gap-5 md:px-20 px-5  w-full py-7">
          <div>
            <h6 className="text-[#fff] text-[14px] font-semibold">
              COPYRIGHT © {year} ZOCI ALL RIGHTS RESERVED
            </h6>
          </div>
          <div>
            <h6 className="text-[#fff] text-[14px] font-semibold">
              DESIGN & DEVELOPED BY TAP FOR TECH
            </h6>
          </div>
        </div>
      </Row>
    </div>
  );
};
export default Footer;
