import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Space, Table, Typography } from "antd";
import "./admin.css";
import { Link, useNavigate } from "react-router";
import deleteIcon from "../../assets/icons/GreenDelete.png";
import { useEffect, useState } from "react";
import {
  getProductFilterApi,
} from "../../feature/product/productApi";
import { deleteProductData } from "../../feature/admin/adminApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../CustomPagination";
import { addAdminProducts } from "../../feature/admin/adminSlice";
const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();
  const data = useSelector((state) => state?.admin?.products);
  const pageHandler = async (current) => {
    const page = { page: current, limit: 10 };
    try {
      const res = await getProductFilterApi(page);
      setTotalPages(res?.totalProducts);

      dispatch(addAdminProducts(res.products));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProductHandler = async (id) => {
    try {
      const res = await deleteProductData(id);
      pageHandler();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const editProductHandler = (item) => {
    navigate("/admin/create-product", { state: { product: item } });
  };
  const columns = [
    {
      title: (
        <Typography.Text className="text-[#fff]">Product Image</Typography.Text>
      ),
      dataIndex: "images",
      key: "images",
      width: 150,
      render: (text) => {
        return (
          <>
            <div className="h-[50px] w-[50px] flex justify-center items-center">
              <Avatar
                style={{ height: "50px", width: "50px" }}
                size={70}
                className="rounded-full"
                src={text.productImage}
              />
            </div>
          </>
        );
      },
    },
    {
      title: (
        <Typography.Text className="text-[#fff] font-semibold">Product Name</Typography.Text>
      ),
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text) =>   <Typography.Text className="text-[#214344]">{text}</Typography.Text>
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Description</Typography.Text>
      ),
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (text) =>  <Typography.Text className="text-[#214344]">{text}</Typography.Text>
    },
    {
      title: <Typography.Text className="text-[#fff]">Price</Typography.Text>,
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (text) =>  <Typography.Text className="text-[#214344]">{text}</Typography.Text>
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Quantity</Typography.Text>
      ),
      dataIndex: "quantity",
      key: "quantity",
      width: 130,
      render: (text) => <Typography.Text className="text-[#214344]">{text}</Typography.Text>
    },
    {
      title: (
        <Typography.Text className="text-[#fff] text-center">
          Action
        </Typography.Text>
      ),
      dataIndex: "action",
      align: "center",
      key: "action",
      width: 130,
      render: (_, record) => (
        <Space size="middle">
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => {
              deleteProductHandler(record._id);
            }}
          >
            <img src={deleteIcon} alt="deleteIcon"/>
          </div>
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => {
              editProductHandler(record);
            }}
          >
            <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
          </div>
        </Space>
      ),
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
            Your Product
          </Typography.Text>
          <Link to={"/admin/create-product"}>
            <PlusCircleOutlined
              style={{ fontSize: "30px", color: "#214344" }}
            />
          </Link>
        </div>
        <div className="px-5">
          <Table
            scroll={1000}
            headerColor={"red"}
            dataSource={data}
            columns={columns}
            pagination={false}
          />
          ;
        </div>
        <div className="flex justify-end py-5 px-5 cursor-pointer">
          <CustomPagination
            totalPages={totalPages}
            pageHandler={(e) => {
              pageHandler(e);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default AdminProducts;
