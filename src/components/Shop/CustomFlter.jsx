import { Button } from "antd";
import { getProductFilterApi } from "../../feature/product/productApi";
import { addproductToshop } from "../../feature/shop/shopSlice";
import { useDispatch } from "react-redux";
const CustomFilter = () => {
  const dispatch = useDispatch();
  const filterSubcategary = async (data, status) => {
    try {
      const filters = { [data]: status };
      const res = await getProductFilterApi({ filters });
      dispatch(addproductToshop(res?.products));
    } catch (error) {
   if(error?.response?.data?.message==="No products found"){
      dispatch(addproductToshop([]));};
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
              filterSubcategary("madeFor", "Men");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            BEST SELLERS
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("trending");
            }}
            className=" w-[150px] py-2 hover:!text-[#214344]  hover:!border-[#214344]  rounded-full bg-[#214344] text-[#F0D5A0]  text-[14px]"
          >
            TRENDING
          </Button>
          <Button
            onClick={() => {
              filterSubcategary("madeFor", "Men");
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
