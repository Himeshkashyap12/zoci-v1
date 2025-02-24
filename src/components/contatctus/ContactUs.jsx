import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, ConfigProvider } from 'antd';

const ContactUs = () => {
    useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFinish = () => {
    console.log('Form values:', formData);
    message.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please complete the form correctly.');
  };

  return (
    <div className='pt-[110px]'>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-20 ">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
        <ConfigProvider theme={{
                token: {
                  colorPrimary: "#214344",
                },
              }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message!' }]}
          >
            <Input.TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message here..."
            />
          </Form.Item>

          <Form.Item>
            <Button  classNames={"bg-[#214344] border-[#214344]"} htmlType="submit" className="w-full">
              Send Message
            </Button>
          </Form.Item>
        </Form>
        </ConfigProvider>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
