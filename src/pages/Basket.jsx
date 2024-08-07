import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/const";
import { fetchBasket, deleteFromBasket } from "../http/basketAPI";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

const Basket = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedDevices, setSelectedDevices] = useState({});

  useEffect(() => {
    const getBasket = async () => {
      try {
        const data = await fetchBasket();
        const initialQuantities = {};
        const initialSelectedDevices = {};
        data.basket_devices.forEach((device) => {
          initialQuantities[device.device.id] = 1;
          initialSelectedDevices[device.device.id] = true;
        });
        setDevices(data.basket_devices);
        setQuantities(initialQuantities);
        setSelectedDevices(initialSelectedDevices);
      } catch (error) {
        console.error("Error fetching basket data:", error);
      }
    };
    getBasket();
  }, []);

  const handleQuantityChange = (id, increment) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[id] = Math.max(1, newQuantities[id] + increment);
      return newQuantities;
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedDevices((prevSelectedDevices) => {
      const newSelectedDevices = { ...prevSelectedDevices };
      newSelectedDevices[id] = !newSelectedDevices[id];
      return newSelectedDevices;
    });
  };

  const handleRemoveFromBasket = async (id) => {
    try {
      await deleteFromBasket(id);
      setDevices((prevDevices) =>
        prevDevices.filter((device) => device.device.id !== id)
      );
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        delete newQuantities[id];
        return newQuantities;
      });
      setSelectedDevices((prevSelectedDevices) => {
        const newSelectedDevices = { ...prevSelectedDevices };
        delete newSelectedDevices[id];
        return newSelectedDevices;
      });
    } catch (error) {
      console.error("Error removing device from basket:", error);
    }
  };

  return (
    <Container>
      <h2 className="pt-20 pl-3 flex items-center justify-center font-bold text-2xl">
        Корзина товаров
      </h2>
      <Container className="flex justify-center items-center mt-4 max-xs:flex-col max-lg:flex-col bg-gray-100 p-4 rounded-2xl gap-8 lg:w-10/12 ">
        <div className="flex flex-col flex-grow">
          {devices.map((device) => (
            <Card
              key={device.id}
              className={`mb-4 flex ${
                !selectedDevices[device.device.id]
                  ? "bg-gray-300 opacity-40"
                  : ""
              }`}
            >
              <Row className="flex justify-between items-center p-4 max-xs:justify-around max-xs:flex-col max-md:flex-col flex-nowrap gap-2 cursor-pointer">
                <img
                  style={{ width: 150, height: 150 }}
                  src={import.meta.env.VITE_API_URL + device.device.img}
                  className="p-0"
                  onClick={() => {
                    navigate(DEVICE_ROUTE + "/" + device.device.id);
                  }}
                />

                <p
                  onClick={() => {
                    navigate(DEVICE_ROUTE + "/" + device.device.id);
                  }}
                  className="w-1/4 hover:underline max-xs:w-full max-md:w-full text-center cursor-pointer"
                >
                  {device.device.name}
                </p>

                <div className="w-auto flex flex-col gap-4 items-center justify-center max-md:hidden">
                  <p className="max-xs:w-auto text-center max-xs:hidden text-lg font-bold">
                    {device.device.price} lei
                  </p>
                  <p className="max-xs:w-auto text-center max-xs:hidden  text-lg flex gap-3 items-center">
                    <div
                      onClick={() => handleQuantityChange(device.device.id, -1)}
                      style={{ cursor: "pointer" }}
                      className="w-8 h-8"
                    >
                      <img src={minus} />
                    </div>{" "}
                    {quantities[device.device.id]}{" "}
                    <div
                      onClick={() => handleQuantityChange(device.device.id, 1)}
                      style={{ cursor: "pointer" }}
                      className="w-8 h-8"
                    >
                      <img src={plus} />
                    </div>
                  </p>
                </div>
                <p className="w-auto max-xs:w-auto text-center max-xs:hidden max-md:hidden ">
                  <Checkbox
                    checked={selectedDevices[device.device.id]}
                    onChange={() => handleCheckboxChange(device.device.id)}
                    color="success"
                    className="w-auto custom-checkbox"
                  />
                  <div className="flex flex-col justify-center items-center mt-2">
                    <img
                      className="w-8"
                      onClick={() => handleRemoveFromBasket(device.device.id)}
                      src={
                        "https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                      }
                    />
                  </div>
                </p>
                <Row className="flex justify-around items-center lg:hidden md:hidden flex-col gap-1 mt-2">
                  <div className="flex justify-center gap-3">
                    <p className=" max-xs:w-auto text-center text-lg flex gap-2">
                      <div
                        onClick={() =>
                          handleQuantityChange(device.device.id, -1)
                        }
                        style={{ cursor: "pointer" }}
                        className="w-8 h-8"
                      >
                        <img src={minus} />
                      </div>{" "}
                      {quantities[device.device.id]}{" "}
                      <div
                        onClick={() =>
                          handleQuantityChange(device.device.id, 1)
                        }
                        style={{ cursor: "pointer" }}
                        className="w-8 h-8"
                      >
                        <img src={plus} />
                      </div>
                    </p>
                    <p className="max-xs:w-auto text-center flex items-center">
                      {device.device.price} lei
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Checkbox
                      checked={selectedDevices[device.device.id]}
                      onChange={() => handleCheckboxChange(device.device.id)}
                      color="success"
                      className="w-auto custom-checkbox"
                    />
                    <img
                      className="w-7 h-7"
                      onClick={() => handleRemoveFromBasket(device.device.id)}
                      src={
                        "https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                      }
                    />
                  </div>
                </Row>
              </Row>
            </Card>
          ))}
        </div>
        <Container className="sticky-form self-start max-lg:self-stretch flex lg:w-auto flex-shrink m-0 items-center justify-center max-md:w-full p-0">
          <Card className="p-4 flex flex-col justify-center items-center max-xs:w-full max-md:w-full md:w-full gap-3">
            <h3 className="font-bold text-lg">Ваш заказ</h3>
            <div className="flex flex-grow w-full justify-between items-center">
              <div>{devices.length} Товары</div>
              <div>
                {devices.reduce(
                  (total, device) =>
                    selectedDevices[device.device.id]
                      ? total +
                        device.device.price * quantities[device.device.id]
                      : total,
                  0
                )}{" "}
                lei
              </div>
            </div>
            <div className="flex gap-10 flex-grow w-full justify-between items-center text-gray-500">
              <div>Доставка</div>
              <div>38 lei</div>
            </div>
            <hr className="w-full" />
            <div className="flex gap-10 flex-grow w-full justify-between items-center text-xl font-bold">
              <div>Итого</div>
              <div className="w-full">
                {devices.reduce(
                  (total, device) =>
                    selectedDevices[device.device.id]
                      ? total +
                        device.device.price * quantities[device.device.id]
                      : total,
                  0
                ) + 38}{" "}
                lei
              </div>
            </div>
            <Button className="mt-2" variant="outline-success">
              Оформить заказ
            </Button>
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

export default Basket;
