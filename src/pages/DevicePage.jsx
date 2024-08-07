import React, { useEffect, useState } from "react";
import { Container, Image, Col, Row, Button, Card } from "react-bootstrap";
import star from "../assets/star.svg";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { addToBasket } from "../http/basketAPI";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { activeColor } from "../utils/const";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const [successAlert, setSuccessAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, [id]);

  const handleAddToBasket = () => {
    addToBasket(device.id)
      .then(() => {
        setSuccessAlert(true);
        setIsOpen(true);
      })
      .catch((error) => alert("Ошибка при добавлении товара в корзину"));
  };

  return (
    <Container className="mt-20 pt-4 w-10/12">
      <Row className="mb-4 text-center">
        <h1 className="font-bold text-3xl">{device.name}</h1>
      </Row>
      <Row className="border rounded-lg p-4 shadow-lg flex flex-col md:flex-row items-center justify-around gap-4">
        <Col md={4} className="text-center flex items-center justify-center">
          <Image
            src={import.meta.env.VITE_API_URL + device.img}
            style={{ height: "300px", width: "300px" }}
            className="rounded-lg shadow-md"
          />
        </Col>

        <Col md={4} className="text-center">
          <Card className="p-4 border-0 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="mb-4 text-xl">Цена: {device.price} MLD</h3>
            <Button
              variant="primary"
              className="w-full py-2"
              onClick={handleAddToBasket}
            >
              Добавить в корзину
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={isOpen}
              autoHideDuration={2000}
              onClose={() => setIsOpen(false)}
              className="mt-16 w-auto"
            >
              <SnackbarContent
                message="Товар успешно добавлен в корзину"
                style={{ backgroundColor: activeColor }}
                className="text-center flex items-center justify-center"
              />
            </Snackbar>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="p-4 shadow-lg rounded-lg bg-white">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Характеристики
          </h2>
          {device.info.map((info, index) => (
            <Row
              key={info.id}
              className="mb-2 p-2 rounded-lg shadow-sm"
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "#f3f4f6",
              }}
            >
              <div className="flex justify-between w-full">
                <span className="font-medium">{info.title}:</span>
                <span>{info.description}</span>
              </div>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DevicePage;
