import Slider from "react-slick";
import { Card } from "antd";
import diamond from "../../assets/diamond.webp";
import {  useState } from "react";
import "./subcategary.css";
import { useSelector } from "react-redux";
const settings = {
  className: "center",
  dots: false,
  infinite: true,
  speed: 200,
  focusOnSelect: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  centerPadding: "80px",
  autoplaySpeed: 2000,
  arrows: false,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        focusOnSelect: true,
        initialSlide: 1,
        centerPadding: "30px",
        centerMode: true,
        dots: false,
        autoplaySpeed: 2000,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
        centerPadding: "10px",
        focusOnSelect: true,

        centerMode: true,
        dots: false,
        autoplaySpeed: 2000,
        display: "flex",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: "50px",
        centerMode: true,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        dots: false,
      },
    },
  ],
};

const SubCategary = ({ categary }) => {
  const [hoverSub, setHoverSub] = useState();
  const [hoverId, setHoverId] = useState(null);
  const categaryData=useSelector(state=>state.admin.category)
  
  const hoverSubHandler = (idx) => {
    setHoverSub(true);
    setHoverId(idx);
  };




  




  return (
    <div className="md:px-1 px-0  subcategary md:my-10  mx-auto w-full">
      <div className="   md:w-[78%] w-[100%] mx-auto  ">
        <Slider {...settings}>
          {categaryData?.map((item, idx) => {
            return (
              <>
                <div
                  key={idx}
                  onMouseEnter={() => hoverSubHandler(idx)}
                  onMouseLeave={() => setHoverSub(false)}
                  className="cursor-pointer"
                  style={{
                    display: "flex",
                    margin: "0 auto",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    className={`2xl "bg-[#fff] subCategary xl:size-[280px]   lg:size-[220px] md:size-[200px] max-md:size-[200px]   max-sm:size-[240px]   "  `}
                    style={{
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    styles={{
                      body: {
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 50,
                        backgroundColor: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // border: '2px solid #747676',
                        borderRadius: 4,
                        position: "relative",
                      }}
                    >
                      <div className="absolute flex items-center  justify-center   ">
                        <div className="w-[90px] h-[60px] flex items-center justify-center">
                          <img className="w-full h-[40px] " src={diamond} alt="diamond" />
                        </div>
                        {hoverSub && hoverId === idx && (
                          <h4 className="absolute left-0 right-0 mx-auto flex justify-center text-[20px]   text-[#214344] font-bold    ">
                            {item.title}
                          </h4>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default SubCategary;
