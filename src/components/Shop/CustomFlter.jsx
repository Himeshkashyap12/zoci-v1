import { Button } from "antd";
import { getProductFilterApi } from "../../feature/product/productApi";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { useDispatch } from "react-redux";
const CustomFilter = ({setTotalPage}) => {
  const dispatch = useDispatch();
  const filterSubcategary = async (data, status) => {
    try {
      const filters = { [data]: status };
      const res = await getProductFilterApi({ filters });
      setTotalPage(res?.totalProducts)      
      dispatch(addproductToshop(res?.products));
      dispatch(addCategary(status))
    } catch (error) {
   if(error?.response?.data?.message==="No products found"){
      dispatch(addproductToshop([]))};
      dispatch(addCategary(status))
      setTotalPage(0)      


    }
  };

  

  return (
    <>
      <div className="filter flex flex-wrap max-md:justify-center items-center gap-5">
        <h3 className="text-[16px] text-[#214344] ">Fast Filter:</h3>
        <div className="flex flex-wrap gap-5  ">
          <Button
            onClick={() => {
              filterSubcategary("sort", "newest");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            NEW ARRIVAL
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("sort", "best");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            BEST SELLERS
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("sort","trending");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            TRENDING
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("madefor", "Men");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            MEN'S
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("category", "gifts");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            GIFTS
          </Button>
        </div>
      </div>
    </>
  );
}

export default CustomFilter;
