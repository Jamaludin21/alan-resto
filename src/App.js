import React, { useState } from "react";
import { Layout, Menu, theme, Typography } from "antd";
import FoodList from "./components/FoodList";
import OrderSummary from "./components/OrderSummary";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "1",
    label: <Typography.Text>Food</Typography.Text>,
  },
  {
    key: "2",
    label: <Typography.Text>Transaksi</Typography.Text>,
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState("1");
  const [order, setOrder] = useState([]);
  // const [billSaved, setBillSaved] = useState(false);
  const [totalCharge, setTotalCharge] = useState(0);
  // const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);

  const changeNavbar = (e) => {
    setCurrent(e.key);
  };

  const addToOrder = (food) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === food.id);
      if (existingItem) {
        return prevOrder.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevOrder, { ...food, quantity: 1 }];
    });
  };

  const clearOrder = () => setOrder([]);

  const saveBill = () => {
    // setBillSaved(true);
    // setTimeout(() => {
    //   setBillSaved(false);
    // }, 2000);
    alert("Bill saved!");
  };

  const printBill = () => {
    window.print();
  };

  const chargeOrder = () => {
    setTotalCharge(
      order.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  // const handlePaymentChange = (e) => {
  //   setPayment(e.target.value);
  // };

  // const handleCharge = () => {
  //   if (payment >= totalCharge) {
  //     setChange(payment - totalCharge);
  //     alert(`Total charge: ${totalCharge}\nChange: ${change}`);
  //   } else {
  //     alert("Insufficient payment!");
  //   }
  // };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#4096ff",
        }}
      >
        <Typography.Text className="text-white">Alan Resto</Typography.Text>
      </Header>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Menu
          mode="horizontal"
          onClick={changeNavbar}
          selectedKeys={[current]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "40px 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {current === "1" ? (
            <FoodList addToOrder={addToOrder} />
          ) : (
            <OrderSummary
              addToOrder={addToOrder}
              order={order}
              clearOrder={clearOrder}
              saveBill={saveBill}
              printBill={printBill}
              chargeOrder={chargeOrder}
            />
          )}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Alan Resto ©{new Date().getFullYear()} Developed By Alan Creative
      </Footer>
    </Layout>
  );
};

export default App;
