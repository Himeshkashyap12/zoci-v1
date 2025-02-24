import { Button, Col, Row, Typography } from "antd";
import modalImage from "../../assets/aboutusmodel.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { useEffect } from "react";
const AboutUs = () => {
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
      <Row className="bg-[#9f9f9f] pt-[120px]  w-full">
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-4 md:ps-20 px-5 py-20 ">
            <div>
              <Button className="font-semibold text-[#fff] bg-black rounded-full px-8 py-1 border-none hover:!text-[#000]">
                Shop
              </Button>
            </div>
            <Typography.Text className="text-[40px] font-bold  text-[#fff]">
              Zoci jewellery
            </Typography.Text>
            <Typography.Text className="text-[16px] text-justify text-[#214344]">
              Zoci Showrooms in Mumbai epitomize luxury and elegance, offering
              an exquisite array of finely crafted jewellery pieces. Located in
              the bustling heart of the city, these showrooms are a haven for
              jewellery enthusiasts and connoisseurs alike. Zoci is renowned for
              its impeccable craftsmanship, showcasing a diverse collection that
              ranges from timeless classics to contemporary designs. Each piece
              at Zoci is a testament to the brand's commitment to quality and
              innovation, blending traditional artistry with modern aesthetics.
              With a focus on customer satisfaction, Zoci Showrooms provide a
              personalized shopping experience, ensuring that every visit is
              memorable and every purchase is cherished.
            </Typography.Text>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="w-full px-5"></div>
        </Col>
      </Row>
      <Row className="bg-[#efe6dc]">
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-4 md:ps-20 px-5 py-20 ">
            <div>
              <Button className="font-semibold text-[12px] text-[#000] hover:!text-[#000] bg-[#b5c7ff] rounded-full px-4 py-1 border-none tracking-wide">
                EXPERIENCE TEAM
              </Button>
            </div>
            <Typography.Text className="text-[35px] font-semibold  text-[#000]">
              Strong Together
            </Typography.Text>
            <Typography.Text className="text-[16px] text-justify text-[#214344]">
              Ninetheme is powered by a simple idea: Women are superheroes. Our
              mission is to lift women up for a better tomorrow. In crafting
              products that seamlessly fit you and your everyday, we donate 2%
              of our revenue to women's organizations that are closing the
              gender gap.
            </Typography.Text>
            <Typography.Text className="text-[14px] font-bold  pt-10">
              Join us in making world-shifting change.
            </Typography.Text>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}></Col>
      </Row>
      <Row className="bg-[#efe6dc]">
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="md:px-20 px-8 py-20"
        >
          <Slider {...settings}>
            <div className="w-full">
              <img src={modalImage} />
            </div>
            <div>
              <img src={modalImage} />
            </div>
            <div>
              <img src={modalImage} />
            </div>
            <div>
              <img src={modalImage} />
            </div>
            <div>
              <img src={modalImage} />
            </div>
            <div>
              <img src={modalImage} />
            </div>
          </Slider>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-4 md:ps-20 px-5 py-20 ">
            <div>
              <Button className="font-semibold text-[12px] hover:!text-[#000] text-[#000] bg-[#ECDBAE] rounded-full px-4 py-1 border-none tracking-wide">
                Modern Products
              </Button>
            </div>
            <Typography.Text className="md:text-[35px] text-[24px] font-semibold  text-[#000]">
              18 years of experience
            </Typography.Text>
            <Typography.Text className="text-[16px] text-justify text-[#214344]">
              Ninetheme is powered by a simple idea: Women are superheroes. Our
              mission is to lift women up for a better tomorrow. In crafting
              products that seamlessly fit you and your everyday, we donate 2%
              of our revenue to women's organizations that are closing the
              gender gap.
            </Typography.Text>
            <Link
              to={"/shop"}
              className="text-[14px] font-bold text-[#214344] hover:text-[#214344]  pt-10"
            >
              Buy Products.
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="bg-[#efe6dc]">
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="flex flex-col gap-4 md:ps-20 px-5 py-20 ">
            <div>
              <Button className="font-semibold text-[12px] text-[#FFF] hover:!text-[#000] bg-[#599078] rounded-full px-4 py-1 border-none tracking-wide">
                RESPONSIBLE FOR NATURE
              </Button>
            </div>
            <Typography.Text className="md:text-[35px] text-[24px] font-semibold  text-[#000]">
              Modern jobs with modern tools
            </Typography.Text>
            <Typography.Text className="text-[16px] text-justify text-[#214344]">
              Ninetheme is powered by a simple idea: Women are superheroes. Our
              mission is to lift women up for a better tomorrow. In crafting
              products that seamlessly fit you and your everyday, we donate 2%
              of our revenue to women's organizations that are closing the
              gender gap.
            </Typography.Text>
            <Link
              to={"/shop"}
              className="text-[14px] font-bold text-[#214344] hover:text-[#214344]  pt-10"
            >
              Buy Products.
            </Link>
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}></Col>
      </Row>
      <Row className="bg-[#f0d5a0]">
        <div className="flex flex-col justify-center items-center gap-4 max-md:px-5 py-20 md:w-[70%] mx-auto ">
          <div>
            <Button className="font-semibold text-[12px] text-[#fff] hover:!text-[#000] bg-[#000] rounded-full px-4 py-1 border-none tracking-wide">
              Notes
            </Button>
          </div>

          <Typography.Text className="md:text-[40px]  text-[24px] font-semibold text-center text-[#214344]">
            The most important advantage of working with an experienced
            specialist is time saving, do not eliminate it!
          </Typography.Text>
          <Link
            to={"/shop"}
            className="text-[16px] font-bold text-[#214344] hover:text-[#214344] bg-[#fff]  px-3 py-2 mt-10 rounded-full"
          >
            Shop Now.
          </Link>
        </div>
      </Row>
    </>
  );
};
export default AboutUs;
