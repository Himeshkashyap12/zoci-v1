import { Button, Image, Input, Modal, Table, Typography } from "antd";
import CustomPagination from "../CustomPagination";
import { useNavigate } from "react-router";
import { deleteInvoice, getAllExhibitionOrder } from "../../feature/admin/adminApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInvoiceExhibition } from "../../feature/admin/adminSlice";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import { ArrowDownOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./admin.css"
import { toast } from "react-toastify";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const AdminInvoice=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {invoiceExhibition}=useSelector(state=>state?.admin);
    const [search,setSearch]=useState({
      name:"",
      productTitle:"",
      exhibitionPlace:"",
      state:"",
      city:""
    })
      const columns = [
        {
      title: (
        <Typography.Text className="text-[#fff]">Product Image</Typography.Text>
      ),
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_,record) => { 
        return (
          <div className="flex justify-center items-center">
          <Image className="!size-[50px] rounded-full" src={record.orderItems[0]?.product?.images?.productImage} />  
          </div>
        );
      },
    },
   
    {
      title: (
        <Typography.Text className="text-[#fff]">Customer Name</Typography.Text>
      ),
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_,record) => { 
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {record.customer?.name}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: <Typography.Text className="text-[#fff]">mobile</Typography.Text>,
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_,record) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
              {record.customer?.mobile}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: <Typography.Text className="text-[#fff]">Exhibition Place</Typography.Text>,
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_,record) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
            {record?.exhibition?.exhibitionPlace}
            </Typography.Text>
          </>
        );
      },
    },
    //   {
    //   title: <Typography.Text className="text-[#fff]">Product Name</Typography.Text>,
    //   dataIndex: "customer",
    //   key: "customer",
    //   width: 250,
    //   render: (_,record) => {
    //     return (
    //       <>
    //         <Typography.Text className="text-[#214344]">
    //           {record?.orderItems?.length>0 && record?.orderItems[0]?.product?.title}
    //         </Typography.Text>
    //       </>
    //     );
    //   },
    // },
    {
  title: <Typography.Text className="text-[#fff]">Product Name</Typography.Text>,
  dataIndex: "customer",
  key: "customer",
  width: 400,
  align: "center",
  render: (_, record) => {
    console.log(record);

    return (
      <>
        {record?.orderItems?.length > 0 &&
          record.orderItems.map((item, idx) => (
            <Typography.Text
              key={idx}
              className="text-[#214344] block text-start" // `block` makes each item appear on a new line
            >
               {`(${idx+1}) ${item?.product?.title}`}
            </Typography.Text>
          ))}
      </>
    );
  },
},

    {
      title: <Typography.Text className="text-[#fff]">SKU Id</Typography.Text>,
      dataIndex: "customer",
      key: "customer",
      width: 250,
      render: (_,record) => {
        return (
          <>
            {/* <Typography.Text className="text-[#214344]">
             {record?.orderItems?.length>0 && record?.orderItems[0]?.product?.sku}
            </Typography.Text> */}
             {record?.orderItems?.length > 0 &&
          record.orderItems.map((item, idx) => (
            <Typography.Text
              key={idx}
              className="text-[#214344] block" // `block` makes each item appear on a new line
            >
               {`(${idx+1})  ${item.product?.sku}`}
            </Typography.Text>
          ))}
          </>
        );
      },
    },
   {
  title: <Typography.Text className="text-[#fff]">Price</Typography.Text>,
  dataIndex: "customer",
  key: "customer",
  width: 200,
  align: "center",
  render: (_, record) => {
    console.log(record);

    return (
      <>
        {record?.orderItems?.length > 0 &&
          record.orderItems.map((item, idx) => (
            <Typography.Text
              key={idx}
              className="text-[#214344] block" // `block` makes each item appear on a new line
            >
               {`(${idx+1}) ₹ ${item.price}`}
            </Typography.Text>
          ))}
      </>
    );
  },
},

    {
      title: <Typography.Text className="text-[#fff]">payment method</Typography.Text>,
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_,record) => {
        return (
          <>
            <Typography.Text className="text-[#214344]">
             {record?.paymentMethod}
            </Typography.Text>
          </>
        );
      },
    },
     {
    title: <Typography.Text className="text-[#fff]">Invoice</Typography.Text>,
    dataIndex: "customer",
    key: "customer",
    width: 200,
    align:"center",
    render: (_, record) => {

      return(
       <div className="flex gap-2 items-center justify-center">
      <a href={record?.invoiceUrl} target="_blank" rel="noopener noreferrer">
       <EyeOutlined  style={{fontSize:"16px" ,color:"#214344"}} />
      </a>
      <br />
      <a href={record?.invoiceUrl} target="_blank"   download>
        <ArrowDownOutlined style={{fontSize:"16px" ,color:"#214344"}} />
      </a>
    </div>
      )
    },
  },
   {
    title: <Typography.Text className="text-[#fff]">Action</Typography.Text>,
    dataIndex: "customer",
    key: "customer",
    width: 200,
    align:"center",
    render: (_, record) => {
      const deleteHandler=async()=>{
        console.log(record,"dfdf");
         
         try {
         const res=await deleteInvoice({id:record?._id});
         if(res.success){
          toast.success(res.message)
          getnInvoiceExhibition()
         }
         

          
         } catch (error) {
          
         }
      }

      return(
       <div className="flex gap-2 items-center justify-center">
      <div>
       {/* <EyeOutlined  style={{fontSize:"16px" ,color:"#214344"}} /> */}
      </div>
      <div onClick={deleteHandler}>
        <DeleteOutlined style={{fontSize:"16px" ,color:"#214344"}} />
      </div>
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
      )
    },
  },
  
   
  ];



  const getnInvoiceExhibition=async()=>{
    const data={
      ...(search?.name && { name: search.name }),
      ...(search?.productTitle && { productTitle: search.productTitle }),
      ...(search?.exhibitionPlace && { exhibitionPlace: search.exhibitionPlace }),
      ...(search?.state && { state: search.state }),
      ...(search?.city && { city: search.city })
    }
    try {
      const res=await getAllExhibitionOrder(data);
      if(res.success){
          dispatch(addInvoiceExhibition(res?.orders)) 
      }
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getnInvoiceExhibition()
  },[search])
    return(
        <>
          <div className="pt-5 px-5">
        <div className="flex justify-between items-center py-3 px-5">
          <Typography.Text className="text-[24px] text-[#214344] font-[600]">
            Invoices
          </Typography.Text>
         <Button onClick={()=>{navigate("/admin/generate-invoice")}} className="rounded-full !border-[#214344] !text-[#fff] !bg-[#214344]">Create Invoice</Button>
        </div>
        <div className="flex gap-2 py-3 ">
          <Input value={search?.name} name="name" onChange={(e)=>{setSearch({...search,name:e.target.value})}} className="rounded-full !border-[#214344]" placeholder="Search by customer name"/>
          <Input value={search?.productTitle} name="productTitle" onChange={(e)=>{setSearch({...search,productTitle:e.target.value})}} className="rounded-full !border-[#214344]" placeholder="Search by Product title"/>
          <Input value={search?.exhibitionPlace}  name="exhibitionPlace" onChange={(e)=>{setSearch({...search,exhibitionPlace:e.target.value})}} className="rounded-full !border-[#214344]" placeholder="Search by Exhibition Place"/>
          <Input value={search?.state} name="state" onChange={(e)=>{setSearch({...search,state:e.target.value})}} className="rounded-full !border-[#214344]" placeholder="Search by state"/>
          <Input value={search?.city} name="city" onChange={(e)=>{setSearch({...search,city:e.target.value})}} className="rounded-full !border-[#214344]" placeholder="Search by city"/>
        </div>
        <div className="">
          <Table
            scroll={{ x: 1800 }}
            pagination={false}
            headerColor={"red"}
            columns={columns}
            dataSource={invoiceExhibition}
          />
            <div className="flex justify-end py-5 px-5">
            <CustomPagination
              totalPages={1}
              pageHandler={(e) => {
                // pageHandlers(e);
              }}
            />
          </div>
         
        </div>
      </div>
        </>
    )
}
export default AdminInvoice;