import React  from "react";
import {
  Drawer,
  Slider,
  Typography,
  Collapse,
  ConfigProvider
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./advancefilter.css";
import { getProductFilterApi } from "../../feature/product/productApi";
import { addproductToshop } from "../../feature/shop/shopSlice";
import { useDispatch } from "react-redux";
const { Panel } = Collapse;
const AdvanceFilter = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleCategoryChange = async (category, type) => {
    switch (type) {
      case "metalColor":
        try {
          const filters = { metalColor: category };
          const res = await getProductFilterApi({ filters });
          setOpen(false);
          dispatch(addproductToshop(res?.products));
        } catch (error) {
          console.log(error);
        }
        break;
      case "metalType":
        try {
          const filters = { metalType: category };
          const res = await getProductFilterApi({ filters });
          setOpen(false);
          dispatch(addproductToshop(res?.products));
        } catch (error) {
          console.log(error);
        }

        break;
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onChangeComplete = (value) => {
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Drawer: {
            colorBgElevated: "#eee5db",
            colorText: "#214344",
          },
          Checkbox: {
            colorPrimary: "#214344", r
          },
          Slider: {
            colorPrimary: "#214344",
            handleColor: "#214344",
            trackBg: "#214344", 
          },
          Collapse: {
            headerBg: "#214344", 
            colorTextHeading: "#fff", 
          },
        },
      }}
    >
      <div className="custom-filter">
        <Drawer
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          width={400}
        >
          <div className="px-10 py-10">
            <Typography.Title level={5} style={{ color: "#214344" }}>
              Filter by price
            </Typography.Title>

            <Slider
              range
              step={10}
              defaultValue={[100, 10000]}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <Collapse
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined style={{ color: "#214344" }} />
                ) : (
                  <PlusOutlined style={{ color: "#214344" }} />
                )
              }
              className="mt-4 border-none"
              style={{ background: "#eee5db" }}
            >
              {/* Categories Section */}

              <Panel
                header={<span style={{ color: "#fff" }}>Base Metal Type</span>}
                key="1"
                style={{ background: "#214344", margin: "10px 0" }}
              >
                <div className="flex flex-col gap-2 py-3">
                  {["Silver"].map((metalType) => (
                    <h6
                      className="text-[#214344] cursor-pointer"
                      onClick={() =>
                        handleCategoryChange(metalType, "metalType")
                      }
                    >
                      {metalType}
                    </h6>
                  ))}
                </div>
              </Panel>

              {/* Brand Section */}
              <Panel
                header={<span style={{ color: "#fff" }}>Metal Color</span>}
                key="2"
                style={{ background: "#214344" }}
              >
                <div className="flex flex-col gap-2">
                  {["Red", "White", "Yellow"].map((metalColor) => (
                    <h6
                      className="text-[#214344] cursor-pointer"
                      onClick={() =>
                        handleCategoryChange(metalColor, "metalColor")
                      }
                    >
                      {metalColor}
                    </h6>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default AdvanceFilter;
