import { Col, Row } from "antd";
import ProductListing from "./ProductListing";
import { getProductFilterApi } from "../../feature/product/productApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomFilter from "./CustomFlter";
import Sorting from "./sorting";
import { addproductToshop } from "../../feature/shop/shopSlice";
import filterBanner from "../../assets/filterBanner.jpg";
import { RightOutlined } from "@ant-design/icons";
import filterIcon from "../../assets/icons/filterIcon.png";
import { useLocation } from "react-router";
const Shop = () => {  
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.shop?.shop);
  const categary = useSelector((state) => state.shop.categary);
  const [filter, setFiter] = useState(true);
  const headermenu = useSelector((state) => state.header.headermenu);
  const getProducts = async () => {
    
    const pagination = { page: 1, limit: 10 };
    try {
      const data = await getProductFilterApi(pagination);
     
      // setPageData({totalPages:res.,currentPage:null,totalProducts:null});
      dispatch(addproductToshop(data?.products));
    } catch (error) {
      if(error.response.data.message==="No products found"){
        dispatch(addproductToshop([]));};
  }; 
  useEffect(() => {
    
    // if (location.state !== "similer") {
      getProducts();
    // }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
  return (
    <>
      <Row className="md:pt-[110px] pt-[70px]  ">
        <div className="relative w-full">
          <div className="md:h-[236px] h-[150px] ">
            <img className="w-full h-full" src={filterBanner} alt="filter" />
          </div>
          <div className="absolute top-[30%] md:left-10 left-2">
            <h3 className="text-[#214344] text-[24px] font-bold">
              {categary === ""
                ? "Shop"
                : categary.charAt(0).toUpperCase() + categary.slice(1)}
            </h3>
            <div className="flex gap-3 items-center pt-3">
              <p className="text-[#214344] text-[14px] font-[500]">Home</p>
              <RightOutlined style={{ fontSize: "14px", color: "#214344" }} />
              <p className="text-[#214344] text-[14px] font-[500]">Shop</p>
              <RightOutlined style={{ fontSize: "12px", color: "#214344" }} />
              <p className="text-[#214344] text-[14px] font-[500]">
                {categary.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-1 md:pt-14 pt-2">
              <h5 className="text-[14px] font-[400] text-[#214344]">
                Showing 1-{data?.length<=10 ? data?.length : 10*2} of {data?.length} results
              </h5>
            </div>
          </div>
        </div>

        {/* Sticky Banner */}
        <div className=" sticky md:top-[110px] top-[70px]     z-[9999]  ">
          <div className="absolute right-0">
            {filter ? (
              <div>
                {!headermenu && (
                  <div
                    onClick={() => {
                      setFiter((prev) => !prev);
                    }}
                    className="size-[50px]  p-1  bg-[#214344]  cursor-pointer rounded-l-full  flex justify-center items-center "
                  >
                    <div className="size-[24px]">
                      <img className="w-full h-full" src={filterIcon}  alt="filter"/>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="sticky top-[100px] z-[9999]  bg-white shadow-md min-w-[350px]   transition-all  duration-500 rounded-l-full">
                <div className="flex items-center justify-between px-3  ">
                  <Sorting setFiter={setFiter} />
                </div>
              </div>
            )}
          </div>
        </div>

        <Col span={24}>
          <div className="md:px-20 px-5  bg-[#eee5db] cursor-pointer ">
            <div className="py-5 cursor-pointer flex justify-center">
              <CustomFilter />
            </div>
          </div>
          <div className="sm:px-10 px-2 bg-[#eee5db]  py-20">
            <ProductListing data={data} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Shop;
