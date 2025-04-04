import { ConfigProvider, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAllOrder, updateStatus } from "../../feature/admin/adminApi";
import { addAdminOrder } from "../../feature/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../common/dateConvertFunction";
import { toast } from "react-toastify";
import CustomPagination from "../CustomPagination";
import "./admin.css";
const AdminOrders = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.admin?.order);
  console.log(data,"order");
  
  const [totalPages, setTotalPages] = useState(0);
  const pageHandler = async (current) => {
    const page = { page: current, limit: 10 };
    try {
      const res = await getAllOrder(page);
      dispatch(addAdminOrder(res.orders));
      setTotalPages(res.totalOrders);
    } catch (error) {}
  };

  const orderStatusHandler = async (e, text) => {
    try {
      const data = { orderStatus: e };
      const res = await updateStatus(data, text.orderID);
      pageHandler();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const columns = [
    {
      title: (
        <Typography.Text className="text-[#fff]">Product Image</Typography.Text>
      ),
      dataIndex: "products",
      key: "products",
      width: 150,
      align: "center",
      render: (text) => {
        console.log(text,"image");
        
        return (
          <div className="flex !justify-center ">
            <div className="size-[50px] ">
              <img className="rounded-full" src={text[0]?.images?.productImage??"https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740822019441_images%20%281%29.png"} alt="productimage" />
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Order Id</Typography.Text>
      ),
      dataIndex: "orderID",
      key: "orderID",
      width: 150,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {text.slice(0, 10)}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Product Name </Typography.Text>
      ),
      dataIndex: "products",
      key: "products",
      width: 200,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {text[0]?.title}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Customer Name</Typography.Text>
      ),
      dataIndex: "user",
      key: "user",
      width: 250,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344] font-[500]">{`${text?.firstname} ${text?.lastname}`}</Typography.Text>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">
          Customer contact
        </Typography.Text>
      ),
      dataIndex: "user",
      key: "user",
      width: 170,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {text.mobile}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Total Price</Typography.Text>
      ),
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
      render: (text) => {
        return (
          <>
            <Typography.Text className={`text-[#214344]`}>
              Rs. {text}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Order Status</Typography.Text>
      ),
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
      width: 200,
      render: (__, text) => {
        return (
          <>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#214344",
                },
              }}
            >
              <Select
                style={{ width: "70%" }}
                defaultValue={text.orderStatus}
                onChange={(e) => {
                  orderStatusHandler(e, text);
                }}
                options={[
                  {
                    label: <span>Pending</span>,
                    value: "Pending",
                  },
                  {
                    label: <span>Confirmed</span>,
                    value: "Confirmed",
                  },
                  {
                    label: <span>Shipped</span>,
                    value: "Shipped",
                  },
                ]}
              />
            </ConfigProvider>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff] text-center">
          Date
        </Typography.Text>
      ),
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      width: 200,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {formatDate(text)}
            </Typography.Text>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    pageHandler();
  }, []);
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center py-3 px-5">
          <Typography.Text className="text-[24px] text-[#214344] font-[600]">
            Your orders
          </Typography.Text>
        </div>
        <div className="px-5">
          <Table
            scroll={{ x: 1500 }}
            pagination={false}
            headerColor={"red"}
            columns={columns}
            dataSource={data}
          />
          ;
          <div className="flex justify-end py-5 px-5">
            <CustomPagination
              totalPages={totalPages}
              pageHandler={(e) => {
                pageHandler(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
