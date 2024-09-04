import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Upload, Button, Flex, Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const AddFoodItem = ({ handleBackClick }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      const blob = new Blob([image], { type: image.type });
      formData.append("image", blob);
    }

    axios
      .post("http://localhost:8000/api/food-items", formData)
      .then((response) => {
        alert("Food item added successfully!");
        if (response) {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error adding food item:", error));
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImage(info.file.originFileObj);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex vertical>
        <Typography.Text>Name Menu</Typography.Text>
        <Form.Item>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Typography.Text>Image</Typography.Text>
        <Form.Item>
          <Upload.Dragger
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
            onChange={handleImageChange}
          >
            <Flex vertical justify="center" align="center" gap={4}>
              <CloudUploadOutlined />
              <Typography.Text>
                drag and drop file here or click
              </Typography.Text>
            </Flex>
          </Upload.Dragger>
        </Form.Item>
        <Typography.Text>Price</Typography.Text>
        <Form.Item>
          <Input
            addonBefore="Rp."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
      </Flex>
      <Flex justify="space-between">
        <Button danger onClick={handleBackClick}>
          Kembali
        </Button>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{ backgroundColor: "#228B22", color: "#FFFFFF" }}
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default AddFoodItem;
