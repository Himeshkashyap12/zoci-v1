import { Button, Table, Typography } from "antd";
import CustomPagination from "../CustomPagination";
import { useNavigate } from "react-router";

const AdminInvoice=()=>{
    const navigate=useNavigate();
    return(
        <>
          <div className="pt-5">
        <div className="flex justify-between items-center py-3 px-5">
          <Typography.Text className="text-[24px] text-[#214344] font-[600]">
            Invoices
          </Typography.Text>
         <Button onClick={()=>{navigate("/admin/generate-invoice")}} className="rounded-full !border-[#214344] !text-[#fff] !bg-[#214344]">Create Invoice</Button>
        </div>
        <div className="px-5">
          <Table
            scroll={{ x: 600 }}
            pagination={false}
            headerColor={"red"}
            // columns={columns}
            // dataSource={data}
          />
         
        </div>
      </div>
        </>
    )
}
export default AdminInvoice;