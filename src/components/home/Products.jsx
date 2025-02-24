import React, { useEffect } from "react";
import Slider from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductFilterApi,
} from "../../feature/product/productApi";
import { addProducts } from "../../feature/product/productSlice";

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  focusOnSelect: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "40px",
        centerMode: true,
      },
    },
  ],
};
const TopSellerProduct = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.product?.products);
  const getProduct = async () => {
    const newly = { newlyCreated: true };
    const data = await getProductFilterApi({ newly });
    dispatch(addProducts(data.products));
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className=" md:w-[78%] w-[100%] mx-auto pt-10 overflow-hidden">
      <Slider {...settings}>
        {data?.map((item, idx) => (
          <div key={idx} style={{ padding: "10px", textAlign: "center" }}>
            <Card item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopSellerProduct;
