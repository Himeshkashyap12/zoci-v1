import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  createProductApi,
  deleteProductImage,
  editProductApi,
  getallCategaryApi,
  uploadProductImages,
  uploadProductVideo,
} from "../../feature/admin/adminApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { addAdminCategary } from "../../feature/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

const CreateAdminProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState([]);
  console.log(videoUrl);
  
  const [preview, setPreview] = useState({
    modalImage: null,
    productImage: null,
    additional1: null,
    additional2: null,
  });
  const [productImagesUrl, setProductImagesUrl] = useState({
    modalImage: null,
    productImage: null,
    additional1: null,
    additional2: null,
  });
  const [metalType, setMetalType] = useState("Gold");
  const [category, setCategary] = useState("Nacklace");
  const editData = location?.state?.product;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.admin?.category);

  const [productFormInput, setProductFormInput] = useState({
    title: "",
    price: 0,
    description: "",
    quantity: "",
    length: 0,
    madefor: "",
    metalColor: "",
    compare_at_price: 0,
    sku: "",
    lengthUnit: "",
    metalShape: "",
  });

  const handleChange = (value) => {
    setMetalType(value);
  };
  const getCategary = async () => {
    try {
      const res = await getallCategaryApi();
      dispatch(addAdminCategary(res.categories));
    } catch (error) {
      console.log(error);
    }
  };
  const categaryData = categories?.map((item) => {
    return {
      value: item.title,
      label: item.title,
    };
  });

  const createProductInputHandler = (e) => {
  if(e.target.name==='price' || e.target.name==='compare_at_price' || e.target.name==="length" ){
    setProductFormInput({
      ...productFormInput,
      [e.target.name]: Number(e.target.value),
    });
  }else{
    setProductFormInput({
      ...productFormInput,
      [e.target.name]: e.target.value,
    });
  }
    
    
  };
  function deepCompareArraysOnly(oldObj, newObj) {
    const changes = {};

    // Loop through keys in newObj to compare with oldObj
    for (const key in newObj) {
      // If the value is an array, compare deeply
      if (Array.isArray(newObj[key]) && Array.isArray(oldObj[key])) {
        if (!arraysAreEqual(oldObj[key], newObj[key])) {
          changes[key] = newObj[key]; // If arrays are different, return the new array
        }
      } else if (oldObj[key] !== newObj[key]) {
        // If values are different, return the new value
        changes[key] = newObj[key];
      }
    }

    // Handle deleted properties (keys in oldObj but not in newObj)
    for (const key in oldObj) {
      if (!(key in newObj)) {
        changes[key] = undefined; // indicate property was removed
      }
    }

    return changes;
  }
  // Helper function to compare two arrays deeply
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  const createProductHandler = async () => {
    console.log(productImagesUrl);
    
    // if ( productImagesUrl?.productImage===null || productImagesUrl?.modalImage===null || videoUrl?.length===0) {
    //   return toast.error("Required media files are missing");
    // }
    if(productFormInput?.title==="" || productFormInput?.sku=="" || productFormInput?.price===0 || productFormInput?.quantity===""   || productFormInput?.description===""  ){ 
      return toast.error("Required fields are missing");
    }
    const data = {
      ...productFormInput,
      images: productImagesUrl,
      video: videoUrl,
      metalType,
      category: category,
    };
    if (!editData) {
      try {
        const res = await createProductApi(data);
        toast.success(res.message);
        navigate("/admin/products");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      const newData = {
        ...productFormInput,
        images: productImagesUrl,
        video: videoUrl,
        metalType,
        category: category,
      };
      const changedData = deepCompareArraysOnly(editData, newData);
      if (Object.keys(changedData).length === 0) {
        return toast.info("No changes detected.");
      }
      try {
        const res = await editProductApi(changedData, editData._id);
        toast.success(res.message);
        navigate("/admin/products");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    }
  };

  const imageHandler = async (e, i) => {
    const file = e.target.files[0];
    setPreview({ ...preview, [i]: URL.createObjectURL(file) });
    const formData = new FormData();
    formData.append("productImages", file);
    try {
      const res = await uploadProductImages(formData);
      setProductImagesUrl({ ...productImagesUrl, [i]: res?.images[0] });
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const videoHandler = async (e) => {    
    const selectedVideo = e.target.files[0]; // Get the selected file
    if (!selectedVideo) {
      return;
    }
    try {
      const formData = new FormData(); 
      formData.append("productVideos", selectedVideo);
      const res = await uploadProductVideo(formData);
      setVideoUrl([res?.videos[0]]);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const removeImage = async (i) => {
    try {
      const data = { imageUrl: productImagesUrl[i] };
      const res = await deleteProductImage(data);
      setProductImagesUrl({ ...productImagesUrl, [i]: null });
      setPreview({ ...preview, [i]: null });

      toast.success(res.message);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCategary();
    if (editData) {
      console.log(editData.metalType);
      
      setProductFormInput({ ...editData });
      setMetalType(editData?.metalType);
      setPreview(editData?.images);
      setVideoUrl([editData?.video[0]]);
      setProductImagesUrl(editData?.images ?? []);
      setCategary(editData?.category ?? "");
    }
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#214344",
          },
        }}
      >
        <div className="px-32 py-5">
          <Row justify={"center"}>
            <Typography.Text className="text-[30px] font-semibold text-[#214344]">
              Create Product
            </Typography.Text>
          </Row>

          <Form>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Categary <span className="text-red-500">*</span>
                </Typography.Text>
                <div className="pt-2">
                  <Select
                    name="categary"
                    value={category}
                    defaultValue="Nackless"
                    onChange={(e) => {
                      setCategary(e);
                    }}
                    className="w-full rounded-md"
                    options={categaryData}
                  />
                </div>
              </Col>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Metal Type <span className="text-red-500">*</span>
                </Typography.Text>
                <div className="pt-2">
                  <Select
                    name="metalType"
                    defaultValue="Gold"
                    value={metalType}
                    onChange={handleChange}
                    className="w-full rounded-md"
                    options={[
                      { value: "Gold", label: "Gold" },
                      { value: "Gold(18kt)", label: "Gold (18kt)" },
                      { value: "Gold(22kt)", label: "Gold (22kt)" },
                      { value: "Gold(24kt)", label: "Gold (24kt)" },
                      { value: "Silver(925)", label: "Silver (925)" },
                      { value: "Platinum(950)", label: "Platinum (950)" },
                      { value: "Diamond", label: "Diamond" },
                      { value: "Brass", label: "Brass" },
                      { value: "Others", label: "Others" },
                    ]}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[20, 20]} className="pt-[24px]">
              <Col span={12}>
                <Form.Item>
                  <Typography.Text className="text-[14px] font-semibold">
                    SKU Id  <span className="text-red-500">*</span>
                  </Typography.Text>
                  <div className="pt-2">
                    <Input
                      name="sku"
                      onChange={(e) => createProductInputHandler(e)}
                      value={productFormInput?.sku}
                      placeholder="Enter Product Id"
                      className="py-1 rounded-full"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Typography.Text className="text-[14px] font-semibold">
                    Product Name <span className="text-red-500">*</span>
                  </Typography.Text>
                  <div className="pt-2">
                    <Input
                      name="title"
                      onChange={(e) => createProductInputHandler(e)}
                      value={productFormInput?.title}
                      placeholder="Enter Product Name"
                      className="py-1 rounded-full"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item>
                  <Typography.Text className="text-[14px] font-semibold">
                    Price <span className="text-red-500">*</span>
                  </Typography.Text>
                  <div className="pt-2">
                    <Input
                      name="price"
                      onChange={(e) => createProductInputHandler(e)}
                      value={productFormInput?.price}
                      placeholder="Enter product price"
                      className="py-1 rounded-full"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Typography.Text className="text-[14px] font-semibold">
                    Compare at Price 
                  </Typography.Text>
                  <div className="pt-2">
                    <Input
                      name="compare_at_price"
                      onChange={(e) => createProductInputHandler(e)}
                      value={productFormInput?.compare_at_price}
                      placeholder="Enter actual product price"
                      className="py-1 rounded-full"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Quantity  <span className="text-red-500">*</span>
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="quantity"
                    placeholder="Enter Quantity"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.quantity}
                    className="py-1  rounded-full"
                  />
                </div>
              </Col>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Weight in Grams
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="weight"
                    className="py-1  rounded-full"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.weight}
                    placeholder="Enter Weight"
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[20, 20]} className="pt-[24px]">
              <Col span={12} className="px-1">
                <Typography.Text className="text-[14px] font-semibold">
                  Size 
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="length"
                    className="py-1  rounded-full"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.length}
                    placeholder="Enter product Size"
                  />
                </div>
              </Col>
              <Col span={12} className="px-1">
                <Typography.Text className="text-[14px] font-semibold">
                  Size Unit 
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="lengthUnit"
                    className="py-1  rounded-full"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.lengthUnit}
                    placeholder="Enter product size Unit"
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[20, 20]} className="pt-[24px] ">
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Metal Color 
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="metalColor"
                    className="py-1  rounded-full"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.metalColor}
                    placeholder="Enter Metal Color"
                  />
                </div>
              </Col>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Metal Shape
                </Typography.Text>
                <div className="pt-2">
                  <Input
                    name="metalShape"
                    className="py-1  rounded-full"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput?.metalShape}
                    placeholder="Enter Metal Shape"
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={[20, 20]} className="pt-[24px] ">
              <Col span={24}>
                <Typography.Text className="text-[14px] font-semibold">
                  Description <span className="text-red-500">*</span>
                </Typography.Text>
                <div className="pt-2">
                  <TextArea
                    name="description"
                    value={productFormInput?.description}
                    placeholder="Enter Description"
                    allowClear
                    onChange={(e) => createProductInputHandler(e)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} className="pt-[24px] pb-5">
                <Typography.Text className="text-[14px] font-semibold">
                  Made for <span className="text-red-500">*</span>
                </Typography.Text>
                <div className="pt-2">
                  <Radio.Group
                    name="madefor"
                    onChange={(e) => createProductInputHandler(e)}
                    value={productFormInput.madefor}
                    defaultValue={"Men"}
                    options={[
                      { value: "Men", label: "Men" },
                      { value: "Women", label: "Women" },
                      { value: "Unisex", label: "Unisex" },
                      { value: "Others", label: "Others" },
                    ]}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[20, 20]} className=" bg-[#fff] rounded-md px-2 py-5">
              <Col span={24}>
                <Typography.Text className="text-[18px] font-semibold ">
                  Upload Media files
                </Typography.Text>

                {/* <div className="flex flex-wrap justify-between gap-5 pt-5"> */}
                <Row gutter={[40, 40]}>
                  <Col span={12}>
                    <Typography.Text className="text-[14px] font-[600] text-[#214344]">
                      Modal Image
                    </Typography.Text>
                    <div className="flex justify-between items-center">
                      {productImagesUrl["modalImage"] === null && (
                        <input
                        value={productImagesUrl?.modalImage}
                          type="file"
                          accept="image/*"
                          onChange={(e) => imageHandler(e, "modalImage")}
                        />
                      )}

                      {preview["modalImage"] !== null && (
                        <div
                          onClick={() => removeImage("modalImage")}
                          className="left-[20px] size-[14px] me-2 cursor-pointer"
                        >
                          <img
                            src="https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740223367652_GreenDelete.png"
                            alt="Delete"
                          />
                        </div>
                      )}

                      {preview["modalImage"] !== null && (
                        <img
                          className="pt-1 rounded-full size-[100px]"
                          src={preview["modalImage"] ?? noImage}
                          alt="Preview"
                        />
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text className="text-[14px] font-[600] text-[#214344]">
                      Product Image
                    </Typography.Text>
                    <div className="flex justify-between items-center">
                      {productImagesUrl["productImage"] === null && (
                        <input
                        value={productImagesUrl?.productImage}

                          type="file"
                          accept="image/*"
                          onChange={(e) => imageHandler(e, "productImage")}
                        />
                      )}

                      {preview["productImage"] !== null && (
                        <div
                          onClick={() => removeImage("productImage")}
                          className="left-[20px] size-[14px] me-2 cursor-pointer"
                        >
                          <img
                            src="https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740223367652_GreenDelete.png"
                            alt="Delete"
                          />
                        </div>
                      )}

                      {preview["productImage"] !== null && (
                        <img
                          className="pt-1 rounded-full size-[100px]"
                          src={preview["productImage"] ?? noImage}
                          alt="Preview"
                        />
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text className="text-[14px] font-[600] text-[#214344]">
                      Additional Image 1
                    </Typography.Text>
                    <div className="flex justify-between items-center">
                      {productImagesUrl["additional1"] === null && (
                        <input
                        value={productImagesUrl?.additional1}
                          type="file"
                          accept="image/*"
                          onChange={(e) => imageHandler(e, "additional1")}
                        />
                      )}

                      {preview["additional1"] !== null && (
                        <div
                          onClick={() => removeImage("additional1")}
                          className="left-[20px] size-[14px] me-2 cursor-pointer"
                        >
                          <img
                            src="https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740223367652_GreenDelete.png"
                            alt="Delete"
                          />
                        </div>
                      )}

                      {preview["additional1"] !== null && (
                        <img
                          className="pt-1 rounded-full size-[100px]"
                          src={preview["additional1"] ?? noImage}
                          alt="Preview"
                        />
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text className="text-[14px] font-[600] text-[#214344]">
                      Additional Image 2
                    </Typography.Text>
                    <div className="flex justify-between items-center">
                      {productImagesUrl["additional2"] === null && (
                        <input
                        value={productImagesUrl?.additional2}
                          type="file"
                          accept="image/*"
                          onChange={(e) => imageHandler(e, "additional2")}
                        />
                      )}

                      {preview["additional2"] !== null && (
                        <div
                          onClick={() => removeImage("additional2")}
                          className="left-[20px] size-[14px] me-2 cursor-pointer"
                        >
                          <img
                            src="https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1740223367652_GreenDelete.png"
                            alt="Delete"
                          />
                        </div>
                      )}

                      {preview["additional2"] != null && (
                        <img
                          className="pt-1 rounded-full size-[100px]"
                          src={preview["additional2"] ?? noImage}
                          alt="Preview"
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                {/* </div> */}
              </Col>
              <Col span={12}>
                <Typography.Text className="text-[14px] font-semibold">
                  Upload Video
                </Typography.Text>
                <div className="flex gap-3 items-center">
                  <div className="pt-2">
                    <input
                      // value={videoUrl}
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        videoHandler(e);
                      }}
                    />
                    {videoUrl?.length > 0 && (
                      <div className="mt-2">
                        <video src={videoUrl[0]} autoPlay width="200" />
                       
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <div className="pt-5 flex justify-center">
              <Button
                onClick={() => createProductHandler()}
                className="rounded-full bg-[#214344] text-[#fff] px-10 py-2"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </ConfigProvider>
    </>
  );
};
export default CreateAdminProduct;
