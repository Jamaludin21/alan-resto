import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Image, Skeleton, Table, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddFoodItem from "./AddFoodItem";

const FoodList = ({ addToOrder }) => {
  const [foods, setFoods] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/food-items")
      .then((response) => {
        const updatedFoods = response.data;
        setFoods(updatedFoods);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "serial",
      render: (_, __, index) => `${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <Image
          preview={false}
          src={`data:image/jpeg;base64,${image}`}
          alt="Food Image"
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `Rp. ${price}`,
    },
  ];

  const handleTambahDataClick = () => {
    setShowAddForm(true);
  };

  const handleBackClick = () => {
    setShowAddForm(false);
  };

  return (
    <div className="food-list">
      {!foods ? (
        <Skeleton active />
      ) : (
        <>
          {showAddForm ? (
            <div style={{ marginBottom: 24 }}>
              <Typography.Text style={{ color: "#4096ff" }}>
                Tambahkan Menu
              </Typography.Text>
            </div>
          ) : (
            <Button
              icon={<PlusCircleOutlined />}
              key="add"
              type="primary"
              style={{ marginBottom: 24 }}
              onClick={handleTambahDataClick}
            >
              Tambah Data
            </Button>
          )}
          {showAddForm ? (
            <AddFoodItem
              addToOrder={addToOrder}
              handleBackClick={handleBackClick}
            />
          ) : (
            <Table columns={columns} dataSource={foods} />
          )}
        </>
      )}
    </div>
  );
};

export default FoodList;
