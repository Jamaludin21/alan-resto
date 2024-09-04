import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Typography,
  Row,
  Col,
  Image,
  Card,
  Skeleton,
} from "antd";
import axios from "axios";

const OrderSummary = ({
  order,
  clearOrder,
  saveBill,
  chargeOrder,
  printBill,
  addToOrder,
}) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/food-items")
      .then((response) => {
        setFoods(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <Row>
      <Col span={18}>
        <Row gutter={[16, 16]}>
          {foods.map((food) => (
            <Col key={food.id} span={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={food.name}
                    src={`data:image/jpeg;base64,${food.image}`}
                  />
                }
                onClick={() => addToOrder(food)}
              >
                <Card.Meta
                  title={food.name}
                  description={`Rp. ${food.price}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={6}>
        <Card>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Pesanan
          </Typography.Title>
          <List
            itemLayout="horizontal"
            dataSource={order}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      width={50}
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={`x ${item.quantity} - Rp. ${
                    item.price * item.quantity
                  }`}
                />
              </List.Item>
            )}
          />
          <Typography.Title level={5}>Total: Rp. {total}</Typography.Title>
          <Row gutter={16}>
            <Col span={24} style={{ marginBottom: 12 }}>
              <Button danger onClick={clearOrder} block>
                Clear Cart
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{ backgroundColor: "#228B22", color: "#FFFFFF" }}
                onClick={saveBill}
                block
              >
                Save Bill
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{ backgroundColor: "#228B22", color: "#FFFFFF" }}
                onClick={printBill}
                block
              >
                Print Bill
              </Button>
            </Col>
            <Col span={24} style={{ marginTop: 12 }}>
              <Button type="primary" onClick={chargeOrder} block>
                Charge Rp. {total}
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderSummary;
