import { Card, Col, Row } from "antd";
import { useState } from "react";
import ring from "../../assets/rings.jpg";
import { getallCategaryApi } from "../../feature/admin/adminApi";
import { addAdminCategary } from "../../feature/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
const Catalogue = () => {
  const [activeTab, setActiveTab] = useState("Women");
  const [hoverActive, setHoverActive] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const dispatch=useDispatch();
  const catalogueData=useSelector(state=>state?.admin?.category)
  const getCategary = async(key) => {
    setActiveTab(key)
       if(key==="Men"){ dispatch(addAdminCategary([
         {title:"Launching Soon"},
         {title:"Launching Soon"},
         {title:"Launching Soon"},
         {title:"Launching Soon"},
         {title:"Launching Soon"},
         {title:"Launching Soon"},
         {title:"Launching Soon"},
       ]))
     } else{
       try{
         const data={madeFor:key??"Women"}
         const res=await getallCategaryApi(data)      
         dispatch(addAdminCategary(res?.categories));
       }catch(error){
         console.log(error);
     };
   }
  };

  return (
    <>
      <div className="px-10 pt-11 flex flex-col items-center">
        <h2 className="text-[#214344] text-[24px] font-[500] text-center pt-3 ">
          All Products Categories
        </h2>
        <div className="flex gap-[34px] pt-5">
          <button
            onClick={() => getCategary("Men")}
            className={`${
              activeTab == "Men"
                ? "bg-[#214344] text-[#efe6dc]"
                : "border-[3px] border-[#214344] text-[#214344]"
            } md:w-[160px] w-[100px] py-2 rounded-full `}
          >
            Men's
          </button>
          <button
            onClick={() => getCategary("Women")}
            className={`${
              activeTab == "Women"
                ? "bg-[#214344] text-[#efe6dc]"
                : "border-[3px] border-[#214344] text-[#214344]"
            }  md:w-[160px] w-[100px] py-2 rounded-full `}
          >
            Women's
          </button>
        </div>
        <div>
          <Row gutter={[20, 20]} className="pt-[34px]">
            {catalogueData?.map((item, idx) => {
              return (
                <Col xl={8} lg={8} md={8} sm={8} xs={12}>
                  <div
                    onMouseEnter={() => {
                      setHoverActive(true), setHoverId(idx);
                    }}
                    onMouseLeave={() => setHoverActive(false)}
                    className="cursor-pointer"
                    style={{
                      display: "flex",
                      margin: "0 auto",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Card
                      className={`2xl "bg-[#fff] subCategary "  `}
                      style={{
                        borderRadius: "50%",
                        // border:"2px solid #747676",
                        width: 100,
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      bodyStyle={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: 50,
                          height: 10,
                          backgroundColor: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 4,
                          position: "relative",
                        }}
                      >
                        <div className="absolute flex items-center  justify-center   ">
                          <div className="w-[50px] h-[60px] flex items-center justify-center">
                            <img className="w-full h-[30px] " src={ring} alt="ring"/>
                          </div>
                          {hoverActive && hoverId === idx && (
                            <h4 className="absolute left-0 right-0 mx-auto flex justify-center text-[12px]   text-[#214344] font-bold    ">
                              {item?.title}
                            </h4>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};
export default Catalogue;
