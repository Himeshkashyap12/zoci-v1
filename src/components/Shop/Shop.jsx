import { Col, Row } from "antd";
import ProductListing from "./ProductListing";
import { getProductFilterApi } from "../../feature/product/productApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomFilter from "./CustomFlter";
import Sorting from "./sorting";
import { addproductToshop } from "../../feature/shop/shopSlice";
import { RightOutlined } from "@ant-design/icons";
import filterIcon from "../../assets/icons/filterIcon.png";
import ring from "../../assets/shopBannerPc/ring.png";
import earring from "../../assets/shopBannerPc/earring.png";
import shop from "../../assets/shopBannerPc/others.png";
import NecklacesAndpendants from "../../assets/shopBannerPc/NecklacesAndpendants.png";
import bracelets from "../../assets/shopBannerPc/bracelets.png";

// mobile banner
import braceletbannerMobile from "../../assets/shopbannerMobile/braceletsbannerMobile.png";
import earringsbannerMobile from "../../assets/shopbannerMobile/earringsbannerMobile.png";
import PendantsandnecklacesbannerMobile from "../../assets/shopbannerMobile/PendantsandnecklacesbannerMobile.png";
import ringsbannerMobile from "../../assets/shopbannerMobile/ringsbannerMobile.png";
import shopbannerMobile from "../../assets/shopbannerMobile/otherproductsbannerMobile.png";

const Shop = () => { 
  const [bannerImage,setBannerImage]=useState(shop); 
  const [bannerMobileImage,setBannerMobileImage]=useState(shopbannerMobile); 
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.shop?.shop);   
  const category = useSelector((state) => state?.shop?.category);  
  console.log(category);
  
  const [filter, setFiter] = useState(true);
  const headermenu = useSelector((state) => state.header.headermenu);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState(null)
  const getProducts = async (pageNumber,filters) => {
    // const pagination = { page: pageNumber, limit: 10 };
    try {
      const response = await getProductFilterApi({ page: pageNumber, limit: 10 ,filters});
      setTotalPage(response?.totalProducts);
      if (response?.products?.length > 0) {
        dispatch(addproductToshop(pageNumber === 1 ? response?.products : [...data, ...response?.products]));
      }
    } catch (error) {
      if (error.response?.data?.message === "No products found") {
        dispatch(addproductToshop([]));
      setTotalPage(0);

      }
    }
  };

  // Observe footer visibility
  useEffect(() => {
    const footer = document.getElementById("footer"); // Make sure your footer has id="footer"
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, threshold: 0.1 } // When 10% of the footer is visible
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, []);

  useEffect(() => { 
    if(category===""){
      getProducts(page);
    } else{
      const filters={category:category}
    getProducts(page,filters);
    }
      
  }, [page]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    switch(category){
      case "Earrings": 
         setBannerImage(earring);
         setBannerMobileImage(earringsbannerMobile)
         break;
      case "Rings":
          setBannerImage(ring);
          setBannerMobileImage(ringsbannerMobile)
          break;
      case "Bracelets":
            setBannerImage(bracelets);
            setBannerMobileImage(braceletbannerMobile)
            break;
      case "Necklaces":
              setBannerImage(NecklacesAndpendants);
              setBannerMobileImage(PendantsandnecklacesbannerMobile)
              break;
      case "Pendants":
                setBannerImage(NecklacesAndpendants);
                setBannerMobileImage(PendantsandnecklacesbannerMobile)
                break;
      default :
         setBannerImage(shop);  
         setBannerMobileImage(shopbannerMobile)

    }

  },[category])

  return (
    <>
      <Row className="lg:pt-[110px]   pt-[70px]">
        <div className="relative w-full"> 
          <div className="md:h-[236px] h-[150px] hidden md:block ">
            <img className="w-full h-full object-fit" src={bannerImage} alt="filter" />
          </div>
          <div className="md:h-[236px] h-[150px] md:hidden ">
            <img className="w-full h-full object-cover" src={bannerMobileImage} alt="filter" />
          </div>

          <div className="absolute top-[30%] md:left-10 left-2">
            <h3 className="text-[#F0D5A0] text-[24px] font-bold">
              {category === ""
                ? "Shop"
                : category?.charAt(0)?.toUpperCase() + category?.slice(1)}
            </h3>
            <div className="flex gap-3 items-center pt-3">
              <p className="text-[#F0D5A0] text-[14px] font-[500]">Home</p>
              <RightOutlined style={{ fontSize: "14px", color: "#F0D5A0" }} />
              <p className="text-[#F0D5A0] text-[14px] font-[500]">Shop</p>
              <RightOutlined style={{ fontSize: "12px", color: "#F0D5A0" }} />
              <p className="text-[#F0D5A0] text-[14px] font-[500]">
                {category?.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-1 md:pt-14 pt-2">
              <h5 className="text-[14px] font-[400] text-[#F0D5A0]">
                Showing 1-{data?.length<=10 ? data?.length : 10*page} of {totalPage} results
              </h5>
            </div>
          </div>
        </div>

        {/* Sticky Banner */}
        <div className=" sticky md:top-[110px] top-[70px]  z-[9999]  ">
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
              <CustomFilter setTotalPage={setTotalPage} />
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

