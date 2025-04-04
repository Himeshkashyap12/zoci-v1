import { Empty, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProductFilterApi } from "../../feature/product/productApi";
import { searchProducts } from "../../feature/product/productSlice";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import closeIcon from "../../assets/icons/closeIconGreen.png";

const CustomSearch = ({ setOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInut] = useState("");
  const searchData = useSelector((state) => state.product.searchData);
  const searchHandler = async () => {
    try {
      const search = { title: searchInput };
      const res = await getProductFilterApi({ search });
      dispatch(searchProducts(res.products));
    } catch (error) {

      if(error.response.data.message==="No products found"){
        dispatch(searchProducts([]));

      };
    }
  };
  useEffect(() => {
    searchHandler();
  }, [searchInput]);
  const closeModal = () => {
    dispatch(searchProducts([]));
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="relative">
        <div
          className={`${
            searchData.length > 0 ? "h-[500px]" : "h-[220px]"
          } px-20  w-full  backdrop-blur-md`}
        >
          <div
            onClick={() => {
              closeModal();
            }}
            className="flex  justify-center cursor-pointer w-[40px] h-[40px] mx-auto  bg-[#fff] rounded-full p-2 mt-5  items-center  "
          >
            <div className="h-[20px] w-[20px]  ">
              <img className="w-full" src={closeIcon} alt="closeIcon" />
            </div>
          </div>
          <div className="px-5 w-[400px] mx-auto   pt-10">
            <input
              onChange={(e) => {
                setSearchInut(e.target.value);
              }}
              className="bg-[#efe6dc] text-center text-[40px] outline-none  focus:outline-none active:outline-none    focus:border-none active:border-none  border-none rounded-full w-full active:bg-[#efe6dc] hover:bg-[#efe6dc] focus:bg-[#efe6dc] border-[2px] border-![#efe6dc]"
              placeholder="Search Products..."
            />
          </div>
          <div className="h-[350px]  overflow-auto py-5">
            
            {searchData?.map((item) => (
              <div className=" px-5">
                
                <Link
                  onClick={() => setOpen(false)}
                  to={`/product/${item.title.includes(" ") ? item.title.split(" ").join("-") : item?.title?.charAt(0)?.toLowerCase()+item?.title?.slice(1)}/${item?._id}`}
                  key={item._id}
                  className="flex justify-between px-2 pt-5 bg-[#efe6dc] rounded-xl shadow-xl py-5 mb-3"
                >
                  <div className="flex gap-3">
                    <div className="h-[120px] w-[120px]">
                      <img
                        src={item?.images?.productImage}
                        alt="productImage"
                        className="w-full h-full rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col pt-2">
                      <Typography.Text className="text-[20px] font-[600]">
                        {item?.title}
                      </Typography.Text>
                      <Typography.Text className="text-[14px] font-[600]">
                        Rs {item?.price} x 1
                      </Typography.Text>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSearch;
