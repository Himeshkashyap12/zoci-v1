import { ConfigProvider,  Select} from "antd";
import { useState } from "react";
import { getProductFilterApi } from "../../feature/product/productApi";
import AdvanceFilter from "./AdvanceFilter";
import { useDispatch } from "react-redux";
import { addproductToshop } from "../../feature/shop/shopSlice";
import filterIcon from "../../assets/icons/greenFilter.png";
import closeIcon from "../../assets/icons/closeIconGreen.png";
import "./advancefilter.css";
const Sorting = ({  setFiter }) => {
  const [sort, setSort] = useState("high");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const selectHandle = (value) => {
    sortHandler(value);
  };

  const sortHandler = async (id) => {
    setSort(id);
    switch (sort) {
      case "high":
        try {
          const sortby = { sort: "priceDesc" };
          const highData = await getProductFilterApi({ sortby });
          dispatch(addproductToshop(highData?.products));
        } catch (error) {
          console.log(error);
        }
        break;
      case "low":
        try {
          const sortby = { sort: "priceAsc" };

          const newestData = await getProductFilterApi({ sortby });
          dispatch(addproductToshop(newestData?.products));
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  const filterHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="sorting  flex   w-full flex-wrap  z-10 justify-between items-center   ">
        <div className="flex items-center w-full justify-between  ">
          <div className="  size-[50px] flex items-center justify-center rounded-full">
            <div
              onClick={() => {
                setFiter((prev) => !prev);
              }}
              className=" cursor-pointer rounded-full  size-[20px]"
            >
              <img className="h-full w-full" src={closeIcon}  alt="closeIcon"/>
            </div>
          </div>
          <div
            className="cursor-pointer h-[24px] w-[24px]"
            onClick={() => {
              filterHandler();
            }}
          >
          <img src={filterIcon} alt="filterIcon"/>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  controlOutline: "none",
                  borderRadius: 0,
                  optionSelectedBg: "#214344", 
                  optionSelectedColor: "#fff", 
                  controlItemBgHover: "#214344", 
                  optionActiveBg: "#214344", 
                  optionActiveColor: "#ff6600",
                  colorText: "#000", 
                  optionFontColor: "#ff0000", 
                },
              },
            }}
          >
            <Select
              className="hover:text-[#fff]"
              placeholder={
                <p className="text-[#214344] text-[16px]">Short by</p>
              }
              bordered={false} 
              style={{
                width: 200,
                backgroundColor: "transparent",
              }}
              onChange={(e) => {
                selectHandle(e);
              }}
              options={[
                { value: "low", label: "Low to High by price" },
                { value: "high", label: "High to Low by price" },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>

      <AdvanceFilter open={open} setOpen={setOpen} />
    </>
  );
};
export default Sorting;
