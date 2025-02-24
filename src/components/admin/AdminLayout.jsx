import { Avatar, Dropdown, Layout, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import logo from "../../assets/header.png";
import { Link, Outlet } from "react-router";
import { logOutApi } from "../../feature/auth/authApi";
import { logout } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const headerStyle = {
    backgroundColor: "#214344",
  };
  const contentStyle = {
    color: "#d5c294",
    backgroundColor: "#efe6dc",
  };
  const siderStyle = {
    color: "#fff",
    backgroundColor: "#214344",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  const logoutHandler = async () => {
    try {
      const res = await logOutApi();
      dispatch(logout());
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Typography.Text
          className="text-[#214344] cursor-pointer"
          onClick={() => {
            logoutHandler();
          }}
        >
          Logout
        </Typography.Text>
      ),
    },
  ];

  return (
    <>
      <Layout style={layoutStyle}>
        <Sider width="15%" style={siderStyle}>
          <div className="pt-5">
            <div className="lg:h-[50px] h-[30px] lg:w-[150px] w-[100px] mx-auto">
              <img src={logo} />
            </div>
            <div className="flex flex-col px-2 gap-3 pt-10 ">
              <div
                className={` ${
                  activeTab === 1 && "py-1 rounded-md bg-[#f0d5a0]"
                }`}
              >
                <Link
                  onClick={() => {
                    setActiveTab(1);
                  }}
                  to={"/admin/products"}
                  className={`text-[14px] px-2  ${
                    activeTab === 1
                      ? "text-[#214344] hover:text-[#214344]"
                      : "text-[#f0d5a0] hover:text-[#f0d5a0]"
                  }  font-[600] hover:text-[#214344]`}
                >
                  Product
                </Link>
              </div>
              <div
                className={`${
                  activeTab === 2 && "py-1 rounded-md bg-[#f0d5a0]"
                }`}
              >
                <Link
                  onClick={() => {
                    setActiveTab(2);
                  }}
                  to={"/admin/order"}
                  className={`text-[14px] px-2 ${
                    activeTab === 2
                      ? "text-[#214344] hover:text-[#214344]"
                      : "text-[#f0d5a0] hover:text-[#f0d5a0]"
                  }  font-[600] hover:text-[#214344]`}
                >
                  Order
                </Link>
              </div>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <div className="flex justify-end gap-[50px]  ">
              <div className="cursor-pointer">
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <Avatar />
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content style={contentStyle}>
            <div className="overflow-y-auto h-full">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default AdminLayout;
