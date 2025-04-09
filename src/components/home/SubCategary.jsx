import Slider from "react-slick";
import { Card } from "antd";
import {  useState } from "react";
import "./subcategary.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductFilterApi } from "../../feature/product/productApi";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { useNavigate } from "react-router";
import { headermenuHandler } from "../../feature/header/headerSlice";
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
        autoplaySpeed: 4000,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
        centerPadding: "10px",
        focusOnSelect: true,

        centerMode: true,
        dots: false,
        autoplaySpeed: 4000,
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
        autoplaySpeed: 4000,
        dots: false,
      },
    },
  ],
};

const SubCategary = ({ categary }) => {
  const [hoverSub, setHoverSub] = useState();
  const [hoverId, setHoverId] = useState(null);
  const categaryData=useSelector(state=>state?.admin?.category)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const hoverSubHandler = (idx) => {
    setHoverSub(true);
    setHoverId(idx);
  };

  const filterSubcategary = async (data) => {
      try {
        const filters = { category: data };
        const res = await getProductFilterApi({ filters });   
        debugger     
        dispatch(addCategary(data));
        dispatch(addproductToshop(res?.products));
        dispatch(headermenuHandler(false))
        navigate("/shop")
      } catch (error) {
        if (error.response.data.message === "No products found") {
          dispatch(addproductToshop([]));
          dispatch(addCategary(data));
          dispatch(headermenuHandler(false))
          navigate("/shop")
        }
      }
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
                  onClick={()=>{filterSubcategary(item?.title)}}
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
                        backgroundColor: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // borderRadius: 4,
                        position: "relative",
                      }}
                      className="xl:size-[270px] sm:size-[200px] size-[250px] rounded-full"
                    > 
                      <div className="absolute flex items-center  justify-center   ">
                        <div className=" flex items-center justify-center ">
                          <img className={`${item?.title==="Earrings" && "rotate-90" } w-full h-100px] rounded-full`} src={item?.images?.categoryImage??"https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1741236911889_No_image_available.svg.webp"} alt="diamond" />
                        </div>
                        {hoverSub && hoverId === idx && (
                          <h4 className="absolute left-0 right-0 mx-auto flex justify-center text-[20px]   text-[#214344] font-bold">
                            {item?.title}
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
