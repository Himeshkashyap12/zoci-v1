
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select, Typography } from "antd";
import { generateInvoice } from "../../feature/admin/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import "./admin.css"
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const GenerateInvoiceForm = () => {
  const navigate=useNavigate();
  const [form] = Form.useForm();
  const [invoiceInput, setInvoiceInput] = useState({
    name: "",
    email: "",
    mobile: "",
    exhibitionPlace: "",
    state: "",
    items:[
      {
        id:0,
        sku:"",
        quantity:0,
        cross:false
      }
    ],
    city: "",
    date: "",
    paymentMethod: "online",
  });

  const onFinish =async(values) => { 
    console.log(values);
       
    if(values?.name=="" || values?.mobile=="" || values?.sku=="" || values?.date=="") return toast.error("please enter all required field")
    try {
      const data={...values}
      const res=await generateInvoice(data);      
      if(res.success){
        toast.success(res.message);
        navigate("/admin/invoice")
      } 
    } catch (error) {
      toast?.error(error?.message)
    }
  };

  const skuQuantityHandler=(key,item)=>{
    
    if(key=="add"){
       setInvoiceInput({...invoiceInput,items:[...invoiceInput?.items,{ 
        id:item+1,
        sku:"",
        quantity:0,
        cross:true}]})
    }else{
      

      const data=[...invoiceInput?.items];
      const idx=data.findIndex((value)=>value.id==item?.id);
      data.splice(idx-1,1)
      setInvoiceInput({...invoiceInput,items:[...data]})
    }
  }
  console.log(invoiceInput);
  

  return (
    <div className="!px-[20px]">
    <Form
      form={form}
      layout="vertical"
      initialValues={invoiceInput}
      onFinish={onFinish}
    >
        <div className="flex justify-center py-10">
            <Typography.Text className="text-[24px] text-[#214344] font-[600]">
            Generate Invoices
          </Typography.Text>
        </div>
      {/* Name & Email */}
      <Row gutter={16}>
        <Col span={11}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input className="rounded-full" placeholder="Enter Name" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Email (optional)" name="email" rules={[{ type: "email"}]}>
            <Input className="rounded-full" placeholder="Enter Email" />
          </Form.Item>
        </Col>
      </Row>

      {/* Mobile & SKU */}
      <Row gutter={16}>
        <Col span={11}>
          <Form.Item label="Mobile" name="mobile" rules={[{ required: true }]}>
            <Input className="rounded-full" placeholder="Enter Mobile Number" />
          </Form.Item>
        </Col>
         <Col span={11}>
          <Form.Item label="Date" name="date">
            <DatePicker className="rounded-full" style={{ width: "100%" }}  
             defaultValue={dayjs()}
    />
          </Form.Item>
        </Col>
      </Row>

      {/* Quantity & Exhibition Place */}
      <Row gutter={16} >
        {invoiceInput?.items?.map((item,idx)=>{
          return(
            <>
           <Col span={11}>
          <Form.Item name={["items",idx,"quantity"]} label="Quantity" rules={[{ required: true }]}>
            <Input  className="rounded-full" type="number" placeholder="Enter Quantity" />
          </Form.Item>
        </Col>
         <Col span={11}>
          <Form.Item name={["items",idx,"sku"]} label="SKU" rules={[{ required: true }]}>
            <Input   className="rounded-full" placeholder="Enter SKU" />
          </Form.Item>
        </Col>
        <Col span={2} className="flex items-center">
        {!item?.cross? <div onClick={()=>{skuQuantityHandler("add",invoiceInput?.items?.length-1)}}><PlusCircleOutlined style={{fontSize:"20px" ,color:"#214344"}} /></div>:
         <div onClick={()=>{skuQuantityHandler("remove",item)}}><CloseCircleOutlined style={{fontSize:"20px" ,color:"#214344"}} /></div>}
          </Col>
          </>
          )

        })}
      </Row>

      {/* State & City */}
      <Row gutter={16}>
        <Col span={11}>
          <Form.Item label="State" name="state">
            <Input className="rounded-full" placeholder="Enter State" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="City" name="city">
            <Input className="rounded-full" placeholder="Enter City" />
          </Form.Item>
        </Col>
      </Row>

      {/* Date & Payment Method */}
      <Row gutter={16}>
         <Col span={11}>
          <Form.Item label="Exhibition Place" name="exhibitionPlace">
            <Input className="rounded-full" placeholder="Enter Exhibition Place" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true }]}>
            <Select className="rounded-full" placeholder="Select Payment Method">
              <Option value="upi">UPI</Option>
              <Option value="online">Online</Option>
              <Option value="cash">Cash</Option>
            </Select>
          </Form.Item>
        </Col>
        
      </Row>

      {/* Submit Button */}
      <Form.Item className="flex justify-center py-5">
        <Button className="rounded-full !border-[#214344] !text-[#fff] !bg-[#214344]" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default GenerateInvoiceForm;
