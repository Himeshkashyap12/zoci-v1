
import { Avatar, Col, DatePicker, Empty, Row, Select, Table, Typography } from "antd";
import "./admin.css"
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateInvoice, getSkuSearch, previewPdfHandler } from "../../feature/admin/adminApi";
import { addSku } from "../../feature/admin/adminSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
const GenerateInvoiceForm = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {skuData}=useSelector(state=>state?.admin);
  const skuFilteredData=skuData.filter((item)=>item.stock>0);
  const [isLoading,setIsLoading]=useState(false);
  const [invoiceInputHandler,setInvoiceInputHandler]=useState({
    name: "",
    mobile: "",
    address: "",
    exhibitionPlace: "",
    eventType: "",
    date: dayjs().format("YYYY-MM-DD"),
    discount: "",
    paymentMethod: "cash",
    invoiceData:[{
      sku: '', quantity: 1
    }],
   
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
  console.log(record);
  
  if(((record?.quantity==record?.stock) || (record?.quantity==1)  && item === "minus") || (record?.quantity>=record.stock && item === "plus") ){
    return ;
  }else{
  const data=[...invoiceInputHandler?.invoiceData];
  const index=data.findIndex(item=>item?.id==record.id);
  data.splice(index,1,{...data[index],quantity:(item=="plus"?data[index]?.quantity+1:data[index]?.quantity>1 && data[index]?.quantity-1)});
  setInvoiceInputHandler({...invoiceInputHandler,invoiceData:data})
  }
  console.log(item);
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
       dispatch(addSku([]));
    
  }
  
}
  
const previewPdf=async()=>{
  try {
    const item=invoiceInputHandler?.invoiceData?.map((item)=>{      
      return {sku:item?.sku,quantity:item?.quantity}
    })
    console.log(item,"ghvh");
    
    
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
      setIsLoading(false)

  } catch (error) {
    console.log(error);
      setIsLoading(false)
    
    
  }
}

const addSkuHandler=(item)=>{ 
  const data={...item,quantity:1}
  if(invoiceInputHandler.invoiceData.some(product=>product?.sku==item?.sku)){
    return toast.error("Item already exist")
  }else{
 setInvoiceInputHandler({...invoiceInputHandler,invoiceData:[...invoiceInputHandler?.invoiceData,data]});

 dispatch(addSku([]))
  }
  
}
const generateInvoiceHandler=async()=>{
    setIsLoading(true);  
  if(invoiceInputHandler?.name=="" || 
     invoiceInputHandler?.mobile=="" ||
      invoiceInputHandler?.address=="" || 
      invoiceInputHandler?.exhibitionPlace=="" ||
      invoiceInputHandler?.eventType=="" ||
      invoiceInputHandler?.date=="" ||
      invoiceInputHandler?.paymentMethod=="" ||
      invoiceInputHandler?.invoiceData?.length==0 
    
    ){
       toast.error("please Enter all required field");
       setIsLoading(false)
    } 
  try {
      const item=invoiceInputHandler?.invoiceData?.map((item)=>{
      return {sku:item?.sku,quantity:item?.quantity};
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
    ,items:item};
    console.log(data,"data");
    
    const res=await generateInvoice(data);
    if(res.success){
      toast.success(res?.message)
      setIsLoading(false)
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
      setIsLoading(false)
    
  }
}


const removeproductHandler=(item)=>{
  const data=[...invoiceInputHandler?.invoiceData];
  const index=data.findIndex(product=>product?.id==item.id);
  console.log(index);
  data.splice(index,1);
  setInvoiceInputHandler({...invoiceInputHandler,invoiceData:data});
}
const cancelInvoiceHandler=()=>{
  setInvoiceInputHandler({
    
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

}
  const columns = [
    {
      title: (
       <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "id",
      key: "id",
      width: 160,
      align: "center",
      render: (_,record,idx) => <Typography.Text>{idx+1}</Typography.Text>
    },
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 160,
      align: "start",
            render: (_,record) => <Typography.Text>{record?.title}</Typography.Text>

    },
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/>

      ),
      dataIndex: "sku",
      key: "sku",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.sku}</Typography.Text>
    },
     {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>

      ),
      dataIndex: "size",
      key: "size",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.size}</Typography.Text>
    },
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Quantity"}/>
      ),
      dataIndex: "stock",
      key: "stock",
      width: 160,
      align: "center",
      render: (_,record) => {
        console.log(record);
        
        return(
          <>
           <div className="flex justify-between px-[20px]">
         <Typography.Text onClick={()=>{quantityHandler(record,"minus")}} className="!text-[16px] cursor-pointer">-</Typography.Text>
           <Typography.Text>{record?.quantity}</Typography.Text>
         <Typography.Text onClick={()=>{quantityHandler(record,"plus")}} className="!text-[16px] cursor-pointer">+</Typography.Text>

      </div>
          </>
        )
      }
       
    },
   
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>
              ),
      dataIndex: "price",
      key: "price",
      width: 160,
      align: "center",
      render: (_,record) => <Typography.Text>{record?.price}</Typography.Text>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>
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


  useEffect(()=>{
    setInvoiceInputHandler({...invoiceInputHandler,invoiceData:[]})
  },[])
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
    <div className="flex flex-col gap-2">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Date</Typography.Text>
           <DatePicker defaultValue={dayjs()}  onChange={(e)=>{invoiceInputDataHandler(e,"date")}} />
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
    <div className="flex flex-col gap-2 relative">  
           <Typography.Text className="text-[#214344] !font-[600] !text-[14px]">Search Products</Typography.Text>
           <Input   onChange={(e)=>{skuSearchHandler(e)}}  className="rounded-full !border-[#214344] "  placeholder="Please Entert SKU" />
             {skuFilteredData?.length>0 &&
              <div className="absolute top-16 w-[100%] bg-[#ffff] z-[9999] h-[200px] overflow-auto rounded-md ">
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
           </div>}

        </div>

    </Form.Item>
    </Col>
      
    </Row>
    <Row>
      <Col span={24}>
      <Table
            pagination={false}
            columns={columns}
            dataSource={ invoiceInputHandler?.invoiceData}
          />
          </Col>
         
    </Row>
    {invoiceInputHandler?.invoiceData?.length>0 &&  <div className="flex flex-col gap-3 bg-[#fff] px-20 w-[100%] py-5">
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
                <Button onClick={()=>{cancelInvoiceHandler()}} className=" !text-[#214344] !border-[#214344] !rounded-full !w-[250px] !text-[16px] py-3" >
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
