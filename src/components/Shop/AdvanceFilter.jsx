import React, { useState }  from "react";
import {
  Drawer,
  Slider,
  Typography,
  Collapse,
  ConfigProvider
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./advancefilter.css";
import { getProductbyMinAndMaxPrice, getProductFilterApi } from "../../feature/product/productApi";
import { addCategary, addproductToshop } from "../../feature/shop/shopSlice";
import { useDispatch } from "react-redux";
import { headermenuHandler } from "../../feature/header/headerSlice";
const { Panel } = Collapse;
const AdvanceFilter = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState([100, 1000]);

  const handleCategoryChange = async (category, type) => {
    switch (type) {
      case "metalColor":
        try {
          const filters = { metalColor: category };
          const res = await getProductFilterApi({ filters });
          setOpen(false);
          dispatch(addproductToshop(res?.products));
        } catch (error) {
          if(error?.response.data.message==="No products found"){
            dispatch(addproductToshop([]));
          setOpen(false);

          }
        }
        break;
      case "metalType":
        try {
          const filters = { metalType: category };
          const res = await getProductFilterApi({ filters });
          setOpen(false);
          dispatch(addproductToshop(res?.products));
        } catch (error) {
          if(error?.response.data.message==="No products found"){
            dispatch(addproductToshop([]));
          setOpen(false);

          }
        }
        break;
    }
  };
  const onClose = () => {
    setOpen(false);
  };
 
  
    const handleChange = async(value) => {
      setRange(value);
    try {
      const pricerange = { min:range[0], max:range[1] } 
      const res = await getProductbyMinAndMaxPrice( pricerange );
      dispatch(addproductToshop(res?.products));
      dispatch(headermenuHandler(false))

    } catch (error) {
      if(error.response.data.message==="No products found"){
        dispatch(headermenuHandler(false))
        dispatch(addproductToshop([]));

      };
     }
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
            colorPrimary: "#214344", 
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
                min={0}
                max={5000}
                step={100}
                value={range}
                onChange={handleChange}
                trackStyle={{ backgroundColor: "#214344" }}
                handleStyle={{ borderColor: "#214344" }}
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
                  {[,"Gold", "Platinum", "Silver"].map((metalType) => (
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
                  {["Rose", "White", "Yellow","Black","Titanium","Green","Purple"].map((metalColor) => (
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
