
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, DatePicker, Select, Typography } from "antd";

const { Option } = Select;

const GenerateInvoiceForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    sku: "",
    quantity: 0,
    exhibitionPlace: "",
    state: "",
    city: "",
    date: "",
    paymentMethod: "",
  });

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    setFormData(values);
  };

  return (
    <div className="!px-[20px]">
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onFinish={onFinish}
    >
        <div className="flex justify-center py-10">
            <Typography.Text className="text-[24px] text-[#214344] font-[600]">
            Generate Invoices
          </Typography.Text>
        </div>
      {/* Name & Email */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input className="rounded-full" placeholder="Enter Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <Input className="rounded-full" placeholder="Enter Email" />
          </Form.Item>
        </Col>
      </Row>

      {/* Mobile & SKU */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Mobile" name="mobile" rules={[{ required: true }]}>
            <Input className="rounded-full" placeholder="Enter Mobile Number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="SKU" name="sku">
            <Input className="rounded-full" placeholder="Enter SKU" />
          </Form.Item>
        </Col>
      </Row>

      {/* Quantity & Exhibition Place */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Quantity" name="quantity">
            <Input className="rounded-full" type="number" placeholder="Enter Quantity" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Exhibition Place" name="exhibitionPlace">
            <Input className="rounded-full" placeholder="Enter Exhibition Place" />
          </Form.Item>
        </Col>
      </Row>

      {/* State & City */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="State" name="state">
            <Input className="rounded-full" placeholder="Enter State" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="City" name="city">
            <Input className="rounded-full" placeholder="Enter City" />
          </Form.Item>
        </Col>
      </Row>

      {/* Date & Payment Method */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Date" name="date">
            <DatePicker className="rounded-full" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Payment Method" name="paymentMethod">
            <Select className="rounded-full" placeholder="Select Payment Method">
              <Option value="upi">UPI</Option>
              <Option value="card">Card</Option>
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
