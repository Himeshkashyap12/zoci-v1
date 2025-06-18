import { Button, Col, Row, Typography } from "antd";
import modalImage from "../../assets/aboutusmodel.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
const AboutUs = () => {
  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Row className="pt-[120px]  w-full">
        <Col span={24}>
          <div className="flex flex-col gap-4  px-20 pb-5 ">
            <Typography.Text className="text-[24px] font-bold text-center">
              About ZOCI
            </Typography.Text>
            <Typography.Text className="text-[16px] text-center text-[#214344]">
              <strong>ZOCI</strong> is a luxury jewellery brand that proudly emerges from the
              esteemed legacy of Manish Jewellers, a renowned name in the
              jewellery industry from Mau, UP. As a branch of our parent company,
              we carry forward the tradition of excellence and craftsmanship,
              infused with a fresh perspective and modern aesthetic
            </Typography.Text>
          </div>
        </Col>
        <Col span={24}>
          <div className="flex flex-col gap-4  px-20 pb-5 ">
            <Typography.Text className="text-[24px] font-bold text-center">
              About Our Founder -Sawan
            </Typography.Text>
            <Typography.Text className="text-[16px] text-center text-[#214344]">
              <strong>Sawan</strong>, the visionary founder of ZOCI, is a young entrepreneur who
              has grown up surrounded by the art of jewellery-making. As the son
              of Manish Sarraf founder of Manish jewellers, he has inherited a
              deep understanding of the craft and a passion for innovation.
              Sawan's journey with ZOCI is a testament to his dedication to
              taking his family's legacy forward, while carving his own niche in
              the industry
            </Typography.Text>
            <Typography.Text className="text-[16px] text-center text-[#214344]">
              With a keen eye for detail and a love for luxury, Sawan has
              curated a collection of majestic marvels in 925 silver, adorned
              with CZ stones and exquisite enamelling. His vision is to create
              jewellery that not only makes a statement but also tells a story of
              craftsmanship, quality, and style.
            </Typography.Text>
          </div>
        </Col>
        <Col span={24}> 
          <div className="flex flex-col gap-4 px-20 pb-5 ">
            <Typography.Text className="text-[24px] font-bold text-center">
              Our Philosophy*
            </Typography.Text>
            <Typography.Text className="text-[16px] text-center text-[#214344]">
              At ZOCI, we believe in the art of storytelling through jewellery.
              We strive to create pieces that are not only beautiful but also
              meaningful, inspired by the rich cultural heritage of India. Our
              mission is to provide exceptional quality, craftsmanship, and
              service, making luxury jewellery accessible to discerning clients
              who appreciate the finer things in life
            </Typography.Text>
          </div>
        </Col>
        <Col span={24}>
          <div className="flex flex-col gap-4  px-20 pb-5 ">
            <Typography.Text className="text-[24px] font-bold text-center">
              Our Craft
            </Typography.Text>
            <Typography.Text className="text-[16px] text-center text-[#214344]">
              We specialize in crafting exquisite jewellery  pieces in 925 silver,
              using high-quality CZ stones and intricate enamelling techniques.
              Our designs are inspired by the beauty of nature, the grandeur of
              Indian architecture, and the elegance of modern style. Each piece
              is carefully crafted to perfection, reflecting our commitment to
              excellence and our passion for the art of jewellery-making .
            </Typography.Text>
            <Typography.Text className="text-[16px] font-semibold text-center text-[#214344]">
            Join us on this journey, as we unveil the world of ZOCI -where
            luxury meets legacy, and craftsmanship meets creativity.
            </Typography.Text>

          </div>
        </Col>
      </Row>
    </>
  );
};
export default AboutUs;
