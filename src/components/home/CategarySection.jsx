import React, {  useEffect, useState } from "react";
import SubCategary from "./SubCategary";
import { Link } from "react-router";
import Testimonial from "./Testimonial";
import TopSellerProduct from "./Products";
import { useDispatch } from "react-redux";
import { getallCategaryApi } from "../../feature/admin/adminApi";
import { addAdminCategary } from "../../feature/admin/adminSlice";

const CategarySection = () => {
  const [categary, setCategary] = useState("Women");
  const buttonactive = { background: "#214344", color: "#f0d5a0" };
  const buttonInActive = { color: "#214344", border: "3px solid #214344" };
  const dispatch=useDispatch();

  const getCategary =async (key) => {
    setCategary(key)
    if(key==="Men"){ dispatch(addAdminCategary([
      {title:"Launching soon"},
      {title:"Launching soon"},
      {title:"Launching soon"},
      {title:"Launching soon"},
      {title:"Launching soon"},
      {title:"Launching soon"},
      {title:"Launching soon"},
    ]))
  } else{
    try{
      const data={madeFor:key??"Women"}
      const res=await getallCategaryApi(data)      
      dispatch(addAdminCategary(res?.categories));
    }catch(error){
      console.log(error);
  };
}
}
useEffect(() => { 
  getCategary("Women");
},[])
  return (
    <>
      <div className="bg-[#efe6dc] ">
        <div className="md:w-[78%] w-[100%] mx-auto">
          <div className="md:px-10">
            <h3 className="pt-9 text-[#214344] font-[450] md:text-[65px] text-[24px] text-center">
              Shop By Category
            </h3>
            <h3 className=" text-[#214344] font-semibold  md:text-[24px] text-[14px] fontt-[600] text-center">
              Browse through your favorite categories. We’ve got them all!
            </h3>
          </div>
          <div className="flex  justify-between pt-[20px]  md:px-20 px-6  max-sm:pb-[20px] mx ">
            <div>
              <button
                onClick={() => {
                  getCategary("Women");
                }}
                style={categary == "Women" ? buttonactive : buttonInActive}
                className="cursor-pointer text-center py-[5px] md:py-[10px]  text-[16px] md:text-[25px]  md:w-[320px] w-[150px]  rounded-full"
              >
                Women's
              </button>
            </div>
            <button
              onClick={() => {
                getCategary("Men");
              }}
              style={categary == "Men" ? buttonactive : buttonInActive}
              className="cursor-pointer text-center py-[3px] md:py-[8px] md:text-[25px] text-[16px]  md:w-[320px] w-[150px] rounded-full"
            >
              Men's
            </button>
          </div>
        </div>

        <SubCategary categary={categary} />
        <div className="w-[80%] mx-auto">
          <h3 className=" text-[#214344] font-[450] md:text-[65px] text-[24px] text-center">
            Top Sellers
          </h3>
          <h3 className=" text-[#214344] font-semibold md:text-[24px] text-[14px] text-center">
            Our most loved products
          </h3>
          <div className="md:flex max-md:hidden md:gap-5 justify-start md:justify-between  px-5 items-center pt-5">
            <div className="md:flex  md:gap-5 items-center md:justify-start ">
              <h4 className="text-[24px] font-bold ">All Products</h4>
              <p className="text-[16px] font-semibold text-gray-500">
                Dont miss out on this weeks deals
              </p>
            </div>
            <div>
              <Link
                className="text-[16px]  font-semibold  text-gray-600"
                to="/shop"
              >
                View All
              </Link>
            </div>
          </div>
        </div>

        <TopSellerProduct />
        <div className="flex justify-center pt-10">
          <Link
            className="text-[16px] md:hidden  font-semibold   text-[#fff] bg-[#214344] rounded-full py-3  w-[100px] flex justify-center "
            to="/shop"
          >
            View All
          </Link>
        </div>

        <div className="py-5">
          <Testimonial />
        </div>
      </div>
    </>
  );
};

export default CategarySection;
