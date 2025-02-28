import { DeleteOutlined } from "@ant-design/icons";
import { Empty, Flex, Progress, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlistData,
  getWishlistData,
} from "../../feature/wishlist/wishlistApi";
import { addToWishList } from "../../feature/wishlist/wishlistSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
const WishlistView = () => {
  const wishListData = useSelector((state) => state?.wish?.wishlist);
  let sum = 0;
  const dispatch = useDispatch();
  const user = localStorage.getItem("userId");

  const getwishlistDataHandler = async () => {
    try {
      const data = await getWishlistData();
      dispatch(addToWishList(data?.wishlist));
    } catch (error) {}
  };

  const deleteWishlistHandler = async (item) => {
    const items = { userId: user, prodId: item.prodId };
    try {
      const res = await deleteWishlistData(items);
      toast.success(res.data?.message);
      getwishlistDataHandler();
      localStorage.setItem("wish", parseInt(wishListData.length) - 1);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  useEffect(() => {
    getwishlistDataHandler();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pt-[110px] px-20 py-5 bg-[#efe6dc]">
        <Typography.Text className="text-[30px] font-semibold">
          Your Wishlist
        </Typography.Text>

        {wishListData?.length > 0 ? (
          wishListData?.map((item, idx) => {
            sum += item.price;
            return (
              <div
                key={idx}
                className="flex justify-between px-5 pt-5 bg-[#efe6dc] shadow-xl rounded-xl py-4 mb-3  "
              >
                <div className=" flex gap-3">
                  <div className="h-[100px] w-[100px]">
                    <img
                      src={item.image[0]}
                      className="w-full h-full rounded-xl"
                      alt="wishlist"
                    />
                  </div>
                  <div className="flex flex-col pt-2">
                    <Typography.Text className="text-[16px] font-semibold ">
                      {item?.title}
                    </Typography.Text>
                    <Typography.Text className="text-[16px] font-bold">
                      Rs {item?.price}{" "}
                    </Typography.Text>
                    <Typography.Text className="text-[14px] text-[#214344] ">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's{" "}
                    </Typography.Text>
                    {/* <button>+</button> */}
                    <Flex vertical>
                      <Progress
                        showInfo={false}
                        trailColor="white"
                        percent={null}
                        status="active"
                      />
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <Typography.Text className="font-semibold text-[14px] text-[#214344] ">
                            Sold :{" "}
                          </Typography.Text>
                          <Typography.Text className="font-bold text-[14px] text-[#214344] ">
                            {item?.sold}
                          </Typography.Text>
                        </div>
                        <div className="flex gap-1">
                          <Typography.Text className="font-semibold text-[#214344]">
                            Available :
                          </Typography.Text>
                          <Typography.Text className="font-bold text-[14px] text-[#214344] ">
                            {item?.quantity}
                          </Typography.Text>
                        </div>
                      </div>
                    </Flex>
                  </div>
                </div>

                <div
                  className="pt-2 cursor-pointer"
                  onClick={() => {
                    deleteWishlistHandler(item);
                  }}
                >
                  <DeleteOutlined
                    style={{ fontSize: "30px", color: "#214344" }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
export default WishlistView;
