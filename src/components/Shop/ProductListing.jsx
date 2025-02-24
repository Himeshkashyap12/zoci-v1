import { Col, Row } from "antd";
import Card from "../home/Card";
import ShopCard from "./ShopCard";
// import ShopCard from "./shopCard";
const ProductListing = ({ data }) => {
  return (
    <>
      <Row>
        {data?.map((item, idx) => {
          return (
            <Col key={idx} xl={8} lg={8} md={12} sm={12} xs={12}>
              <div className="sm:px-10 sm:pb-[78px] px-2 pb-4">
                <ShopCard item={item} shop="shop" />
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default ProductListing;
