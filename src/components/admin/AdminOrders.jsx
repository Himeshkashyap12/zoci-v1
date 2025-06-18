import { Button, ConfigProvider, Modal, Select, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAllOrder, updateStatus } from "../../feature/admin/adminApi";
import { addAdminOrder } from "../../feature/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../common/dateConvertFunction";
import { toast } from "react-toastify";
import CustomPagination from "../CustomPagination";
import "./admin.css";
import { CopyOutlined } from "@ant-design/icons";
const AdminOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.admin?.order);
  const [totalPages, setTotalPages] = useState(0);
  const [status,setStatus]=useState();
  const pageHandlers = async (e) => {    
    const page = { page: e??0, limit: 10 };
    try {
      const res = await getAllOrder({page});
      dispatch(addAdminOrder(res.orders));
      setTotalPages(res.totalOrders);
    } catch (error) {}
  };

  const orderStatusHandler = async (e) => {
    
    setStatus(e)
    setIsModalOpen(true)
   
  };
  const confirmStatusHandler=async(e,text)=>{
  // console.log(e);
console.log(text);
console.log(status);
 try {
  
      const data = { orderStatus: status };
      const res = await updateStatus(data, text.orderID);
      pageHandlers();
      setIsModalOpen(false)
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: (
        <Typography.Text className="text-[#fff]">Product Image</Typography.Text>
      ),
      dataIndex: "products",
      key: "products",
      width: 160,
      align: "center",
      render: (text) => {
        return (
          <div className="flex !justify-center ">
            <div className="size-[50px] ">
              <img
                className="rounded-full"
                src={
                  text[0]?.images?.productImage ??
                  "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740822019441_images%20%281%29.png"
                }
                alt="productimage"
              />
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
      title: <Typography.Text className="text-[#fff]">SKU Id</Typography.Text>,
      dataIndex: "products",
      key: "products",
      width: 200,
      render: (text) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {text[0]?.sku}
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
      width: 250,
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
      width: 250,
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
        <Typography.Text className="text-[#fff] text-center">
          Address
        </Typography.Text>
      ),
      dataIndex: "address",
      key: "address",
      align: "start",
      width: 300,
      render: (_, record) => {
        const handleCopy = async () => {
          try {
            const copyText =
              record?.user?.address?.address +
              "," +
              record?.user?.address?.city +
              "," +
              record?.user?.address?.state +
              "," +
              record?.user?.address?.pincode;
            await navigator?.clipboard?.writeText(copyText);
            setTimeout(() => setCopied(false), 2000);
            toast.success("Copied successfully");
          } catch (err) {
            console.error("Failed to copy: ", err);
          }
        };
        return (
          <>
            <Tooltip
              title={`${record?.user?.address?.address} ,${record?.user?.address?.city}, ${record?.user?.address?.state} ,${record?.user?.address?.state} `}
            >
              <div className="flex items-center justify-between">
                <Typography.Text className="text-[#214344]">
                  {` ${record?.user?.address?.state}, ${record?.user?.address?.pincode}`}
                </Typography.Text>
                <button
                  onClick={handleCopy}
                  className=" bg-[#214344] text-[#fff]  rounded-full size-[30px] "
                >
                  <CopyOutlined  style={{color:"#f0d5a0"}}/>
                </button>
              </div>
            </Tooltip>
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
      width: 250,
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
                  defaultValue={text?.orderStatus}
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
            <Modal title="Basic Modal" open={isModalOpen}  onCancel={handleCancel} footer={false}>
       <Typography.Text className="font-bold text-[16px]">Are you sure you want to change order status</Typography.Text>
       <div className="flex justify-end gap-2"> 
       <Button onClick={handleCancel} className="bg-[#214344] text-[#fff] hover:!border-[#214344] hover:!text-[#214344] ">Cancel</Button>
       <Button className="bg-[#214344] text-[#fff]  hover:!border-[#214344] hover:!text-[#214344]" onClick={(e)=>{confirmStatusHandler(e,text)}}>Okay</Button>
       </div> 
      </Modal>
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
      width: 250,
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
    pageHandlers();
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
            scroll={{ x: 1800 }}
            pagination={false}
            headerColor={"red"}
            columns={columns}
            dataSource={data}
          />
          <div className="flex justify-end py-5 px-5">
            <CustomPagination
              totalPages={totalPages}
              pageHandler={(e) => {
                pageHandlers(e);
              }}
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default AdminOrders;
