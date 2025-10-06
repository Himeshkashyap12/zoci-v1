
import { Avatar, Col, DatePicker, Empty, Row, Select, Table, Typography } from "antd";
import "./admin.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateInvoice, getSkuSearch, previewPdfHandler } from "../../feature/admin/adminApi";
import { addSku } from "../../feature/admin/adminSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const GenerateInvoiceForm = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {skuData}=useSelector(state=>state?.admin);
  const skuFilteredData=skuData.filter((item)=>item.stock>0);
  
  const [invoiceInputHandler,setInvoiceInputHandler]=useState({
    name: "",
    mobile: "",
    address: "",
    exhibitionPlace: "",
    eventType: "",
    date: dayjs().format("YYYY-MM-DD"),
    discount: "",
    paymentMethod: "cash",
    invoiceData:[]
      
  })
  const subTotal = invoiceInputHandler?.invoiceData?.reduce((accumulator, currentValue) =>{
    return accumulator+(currentValue?.price*currentValue?.quantity);
    
  }, 0);
  const discountPrice=subTotal-(subTotal*((invoiceInputHandler?.discount)/100))


const invoiceInputDataHandler=(e,item)=>{
  
  if(item=="paymentMethod"){
  setInvoiceInputHandler({...invoiceInputHandler,[item]:e})
     
  }else if(item=="date"){
  setInvoiceInputHandler({...invoiceInputHandler,[item]:e.format("YYYY-MM-DD")})
   
    

  } else{
  setInvoiceInputHandler({...invoiceInputHandler,[e.target.name]:e.target.value})

  }

}

const quantityHandler=(record,item)=>{
  if((record?.quantity==0 && item === "minus") || (record?.quantity>=record.stock && item === "plus") ){
 return ;
  }else{
const data=[...invoiceInputHandler?.invoiceData];
  const index=data.findIndex(item=>item?.id==record.id);
  data.splice(index,1,{...data[index],quantity:item=="plus"?record.quantity+1:record.quantity-1});
  console.log(data);
  setInvoiceInputHandler({...invoiceInputHandler,invoiceData:data})
  }
  
}



const skuSearchHandler=async(e)=>{
      
  if(e.target.value=="") return dispatch(addSku([]));
  try {
    const data={sku:e.target.value}
     const res=await  getSkuSearch(data);
     if(res.status_code==200 && res.success){
      dispatch(addSku(res?.products))
     }else{
       dispatch(addSku([]));
     }
     
  } catch (error) {
    
  }
  
}
  
const previewPdf=async()=>{
  try {
    const item=invoiceInputHandler?.invoiceData?.map((item)=>{
      return {sku:item?.sku,quantity:item?.quantity}
    })
    
    const data={ 
      name:  invoiceInputHandler?.name,
    mobile: invoiceInputHandler?.mobile,
    address:  invoiceInputHandler?.address,
    exhibitionPlace: invoiceInputHandler?.exhibitionPlace,
    eventType: invoiceInputHandler?.eventType,
    date:invoiceInputHandler?.date,
    discount: invoiceInputHandler?.discount,
    paymentMethod:invoiceInputHandler?.paymentMethod
    ,items:item}
    const res=await previewPdfHandler(data);    
  } catch (error) {
    console.log(error);
    
    
  }
}

const addSkuHandler=(item)=>{

  const data={...item,quantity:1}
 
  if(invoiceInputHandler.invoiceData.some(product=>product.sku==item.sku)){
    return toast.error("Item already exist")
  }else{
 setInvoiceInputHandler({...invoiceInputHandler,invoiceData:[...invoiceInputHandler?.invoiceData,data]})
  }
  
}
const generateInvoiceHandler=async()=>{
  console.log(invoiceInputHandler);
  
  if(invoiceInputHandler?.name=="" || 
     invoiceInputHandler?.mobile=="" ||
      invoiceInputHandler?.address=="" || 
      invoiceInputHandler?.exhibitionPlace=="" ||
      invoiceInputHandler?.eventType=="" ||
      invoiceInputHandler?.date=="" ||
      invoiceInputHandler?.paymentMethod=="" ||
      invoiceInputHandler?.invoiceData?.length==0 
    ) return toast.error("please Enter all required field")
  try {
      const item=invoiceInputHandler?.invoiceData?.map((item)=>{
      return {sku:item?.sku,quantity:item?.stock}
    })
    const data={ 
      
      name:  invoiceInputHandler?.name,
    mobile: invoiceInputHandler?.mobile,
    address:  invoiceInputHandler?.address,
    exhibitionPlace: invoiceInputHandler?.exhibitionPlace,
    eventType: invoiceInputHandler?.eventType,
    date:invoiceInputHandler?.date,
    discount: invoiceInputHandler?.discount,
    paymentMethod:invoiceInputHandler?.paymentMethod
    ,items:item}
    const res=await generateInvoice(data);
    console.log(res);
    if(res.success){
      toast.success(res?.message)
      navigate("/admin/invoice");
    }
    
    
  } catch (error) {
    
  }
}


const removeproductHandler=(item)=>{
  const data=[...invoiceInputHandler?.invoiceData];
  const index=data.findIndex(product=>product?.id==item.id);
  console.log(index);
  data.splice(index,1)
  setInvoiceInputHandler({...invoiceInputHandler,invoiceData:data})
  
  

}
  const columns = [
    {
      title: (
        <Typography.Text className="text-[#fff]">S. No.</Typography.Text>
      ),
      dataIndex: "id",
      key: "id",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.id.slice(0,5)}</Typography.Text>
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Product Name</Typography.Text>
      ),
      dataIndex: "title",
      key: "title",
      width: 160,
      align: "start",
            render: (_,record) => <Typography.Text>{record?.title}</Typography.Text>

    },
    {
      title: (
        <Typography.Text className="text-[#fff]">SKU</Typography.Text>
      ),
      dataIndex: "sku",
      key: "sku",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.sku}</Typography.Text>
    },
     {
      title: (
        <Typography.Text className="text-[#fff]">Size</Typography.Text>
      ),
      dataIndex: "size",
      key: "size",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.size}</Typography.Text>
    },
    {
      title: (
        <Typography.Text className="text-[#fff]">Quantity</Typography.Text>
      ),
      dataIndex: "stock",
      key: "stock",
      width: 160,
      align: "center",
      render: (_,record) => {
        return(
          <>
           <div className="flex justify-between px-[20px]">
         <Typography.Text onClick={()=>{quantityHandler(record,"minus")}} className="!text-[16px] cursor-pointer">-</Typography.Text>
           <Typography.Text>{record.quantity}</Typography.Text>
         <Typography.Text onClick={()=>{quantityHandler(record,"plus")}} className="!text-[16px] cursor-pointer">+</Typography.Text>

      </div>
          </>
        )
      }
       
    },
   
    {
      title: (
        <Typography.Text className="text-[#fff]">Price</Typography.Text>
      ),
      dataIndex: "price",
      key: "price",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.price}</Typography.Text>
    },
      {
      title: (
        <Typography.Text className="text-[#fff]">Action</Typography.Text>
      ),
      dataIndex: "price",
      key: "price",
      width: 160,
      align: "center",
      render: (_,record) => {
        return(
          <div onClick={()=>{removeproductHandler(record)}}>
          <DeleteOutlined />
          </div>
        )
      }
    }
    
    
    
    

    
   
  ];

  return (
   <>
   <div className="py-2 ps-3">
      <Typography.Text className="text-[24px] text-[#214344] font-[500]">
                Generate Invoice Instants
      </Typography.Text>        
   </div>
   <div className="generate-form px-20">
     <Form
    name="basic"
    autoComplete="off"
  >
    <Row gutter={40} >
     <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Customer Name</Typography.Text>
        <Input name="name" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.name} className="rounded-full !border-[#214344] "  placeholder="Enter Customer Name" />
        </div>

    </Form.Item>
    </Col>
      <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Phone No.</Typography.Text>
        <Input  name="mobile" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.mobile} className="rounded-full !border-[#214344] "   placeholder="Enter Mobile Number"  />
        </div>

    </Form.Item>
    </Col>
    </Row>
     <Row gutter={40} >
     <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Address</Typography.Text>
        <Input  name="address" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.address} className="rounded-full !border-[#214344] "  placeholder="Enter Address"  />
        </div>

    </Form.Item>
    </Col>
      <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Billing Place</Typography.Text>
        <Input  name="exhibitionPlace" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.exhibitionPlace}  className="rounded-full !border-[#214344] " placeholder="Enter Billing Place" />
        </div>

    </Form.Item>
    </Col>
    </Row>
     <Row gutter={40} >
     <Col span={12}>
       <Form.Item
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Event Type</Typography.Text>
           <Input name="eventType" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.eventType}  className="rounded-full !border-[#214344]" placeholder="Enter Event Type"/>
        </div>

    </Form.Item>
    </Col>
      <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2 relative">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Product SKU</Typography.Text>
           <Input   onChange={(e)=>{skuSearchHandler(e)}}  className="rounded-full !border-[#214344] "  placeholder="Please Entert SKU" />
             {skuFilteredData?.length>0 ? <div className="absolute top-16 w-[100%] bg-[#ffff] z-[9999] h-[200px] overflow-auto rounded-md ">
                {skuFilteredData?.map((item)=>{
                  return(
                    <div  className="flex gap-3 items-center p-2 cursor-pointer" onClick={()=>{addSkuHandler(item)}}>
                      <div><Avatar src={item?.image}/></div>
                      <div className="flex flex-col gap-1">
                        <Typography.Text className="!text-[14px] ">
                         Title : {item?.title}
                        </Typography.Text>
                        <Typography.Text className="!text-[14px] ">
                         SKU : {item?.sku}
                        </Typography.Text>
                         <Typography.Text className="!text-[14px] ">
                         Quantity : {item?.stock}
                        </Typography.Text>
                      </div>
                      

                    </div>
                  )
                })}
           </div>:<Typography.Text className="text-[red]">No data found or Out of stock</Typography.Text>}

        </div>

    </Form.Item>
    </Col>
    </Row>
     <Row gutter={40} >
     <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px] ">Discount</Typography.Text>
        <Input name="discount" onChange={(e)=>{invoiceInputDataHandler(e)}} value={invoiceInputHandler?.discount}  className="rounded-full !border-[#214344] "  placeholder="Enter Discount in %" />
        </div>

    </Form.Item>
    </Col>
      <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Payment Mode</Typography.Text>
         <Form.Item   rules={[{ required: true }]}>
            <Select onChange={(e)=>{invoiceInputDataHandler(e,"paymentMethod")}} value={invoiceInputHandler?.paymentMethod}  className="rounded-full !border-[#214344] " placeholder="Select Payment Method">
              <Option value="upi">UPI</Option>
              <Option value="online">Online</Option>
              <Option value="cash">Cash</Option>
            </Select>
          </Form.Item>
        </div>

    </Form.Item>
    </Col>
    </Row>
     <Row gutter={40} >
     <Col span={12}>
       <Form.Item
  
      rules={[{ required: true, message: 'Please input your username!' }]}
    > 
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Date</Typography.Text>
        <DatePicker defaultValue={dayjs()}  onChange={(e)=>{invoiceInputDataHandler(e,"date")}} />
        </div>

    </Form.Item>
    </Col>
      
    </Row>
    <Row>
      <Table
            scroll={{ x: 1300 }}
            pagination={false}
            columns={columns}
            dataSource={invoiceInputHandler?.invoiceData}
          />
         
    </Row>
    {invoiceInputHandler?.invoiceData?.length>0 &&  <div className="flex flex-col gap-3 bg-[#fff] px-20 w-[96%] py-5">
            <Row justify={"end"}>
              <Col  span={12}><Typography.Text className="text-[16px] font-[500] text-[#214344]">Sub Total</Typography.Text></Col>
              <Col span={12}><Typography.Text className="!text-end">Rs. {subTotal}</Typography.Text></Col>
            </Row>
            { invoiceInputHandler?.discount !="" && <Row justify={"end"}>
              <Col  span={12}><Typography.Text className="text-[16px] font-[500] text-[#214344]">Discount</Typography.Text></Col>
              <Col span={12}><Typography.Text className="!text-end">{invoiceInputHandler?.discount} %</Typography.Text></Col>
            </Row>}
             <Row justify={"end"}>
              <Col  span={12}><Typography.Text className="text-[16px] font-[500] text-[#214344]">Total</Typography.Text></Col>
              <Col span={12}><Typography.Text className="!text-end">Rs. {discountPrice}</Typography.Text></Col>
            </Row>
           

          </div>}
   <Form.Item label={null}>
    <div className="flex justify-center gap-3 py-5">
      <Button onClick={()=>{previewPdf()}} className="!bg-[#214344] !text-[#fff] !rounded-full !w-[250px] !text-[16px] py-3 " htmlType="submit">
        Preview and Print
      </Button>
       <Button className=" !text-[#214344] !border-[#214344] !rounded-full !w-[250px] !text-[16px] py-3" >
        Cancel
      </Button>
     
      </div>
       <div className="flex justify-center gap-3 py-5">
       <Button onClick={()=>{generateInvoiceHandler()}} className="!bg-[#214344] !text-[#fff] !rounded-full !w-[250px] !text-[16px] py-3 " htmlType="submit">
       Save
      </Button>
      
      </div>
    </Form.Item>
    </Form>

   </div>
   </>
  );
};

export default GenerateInvoiceForm;
