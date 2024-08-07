import React, { useState, useEffect } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import {
  fetchDevices,
  deleteDevice,
  updateDevice,
  fetchBrands,
  fetchTypes,
} from "../../http/deviceAPI";

export default function ManageDevices() {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [newDeviceData, setNewDeviceData] = useState({});
  const [newDeviceImage, setNewDeviceImage] = useState(null);

  useEffect(() => {
    loadDevices();
    loadBrands();
    loadTypes();
  }, []);

  const loadDevices = () => {
    fetchDevices(null, null, 1, 100).then((data) => {
      const sortedDevices = (data.rows || []).sort((a, b) => a.id - b.id);
      setDevices(sortedDevices);
    });
  };

  const loadBrands = () => {
    fetchBrands().then((data) => setBrands(data));
  };

  const loadTypes = () => {
    fetchTypes().then((data) => setTypes(data));
  };

  const removeDevice = (id) => {
    deleteDevice(id).then(() => {
      loadDevices();
    });
  };

  const startEditingDevice = (device) => {
    setEditingDevice(device.id);
    setNewDeviceData({
      name: device.name,
      price: device.price,
      img: device.img,
      brandId: device.brandId,
      typeId: device.typeId,
    });
  };

  const saveDevice = () => {
    if (newDeviceData) {
      const formData = new FormData();
      Object.entries(newDeviceData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (newDeviceImage) {
        formData.append("img", newDeviceImage);
      }

      updateDevice(editingDevice, formData).then(() => {
        setEditingDevice(null);
        setNewDeviceData({});
        setNewDeviceImage(null);
        loadDevices();
      });
    }
  };

  const cancelEditing = () => {
    setEditingDevice(null);
    setNewDeviceData({});
    setNewDeviceImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setNewDeviceImage(files[0]);
    } else {
      setNewDeviceData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const getBrandNameById = (id) =>
    brands.find((brand) => brand.id === id)?.name || "Unknown";
  const getTypeNameById = (id) =>
    types.find((type) => type.id === id)?.name || "Unknown";

  return (
    <div
      className="flex flex-col justify-center items-center p-4"
      style={{ border: "2px solid lightgrey", borderRadius: 20 }}
    >
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        className="mb-4"
      >
        Управление устройствами
      </Typography>
      <ListGroup className="w-full max-xs:flex ">
        {devices.length > 0 ? (
          devices.map((device) => (
            <ListGroup.Item
              key={device.id}
              className="flex justify-between items-center mt-2 gap-3 max-xs:flex-col"
            >
              {editingDevice === device.id ? (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-center items-center">
                    <p className="w-36">Наименование: </p>
                    {""}
                    <Form.Control
                      name="name"
                      value={newDeviceData.name}
                      onChange={handleInputChange}
                      placeholder="Введите новое имя устройства"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="w-36">Цена: </p>
                    {""}
                    <Form.Control
                      name="price"
                      value={newDeviceData.price}
                      onChange={handleInputChange}
                      placeholder="Введите новую цену устройства"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="w-36">Тип: </p>
                    {""}
                    <Form.Control
                      name="typeId"
                      value={newDeviceData.typeId}
                      onChange={handleInputChange}
                      placeholder="Введите новый тип ID"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="w-36">Бренд: </p>
                    {""}
                    <Form.Control
                      name="brandId"
                      value={newDeviceData.brandId}
                      onChange={handleInputChange}
                      placeholder="Введите новый бренд ID"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="w-36">Изображение: </p>
                    {""}
                    <Form.Control
                      type="file"
                      name="img"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <span className="flex flex-col gap-3">
                  <div className="w-10">id: {device.id}</div>
                  <div>Наименование: {device.name}</div>
                  <div>Цена: {device.price} lei</div>
                  <div>Тип: {getTypeNameById(device.typeId)}</div>
                  <div>Бренд: {getBrandNameById(device.brandId)}</div>
                  <div>Изображение: {device.img}</div>
                  {/* <div>
                    <img
                      src={import.meta.env.VITE_API_URL + device.img}
                      style={{ width: 80, height: 80 }}
                    />
                  </div> */}
                </span>
              )}
              <div className="flex gap-2">
                {editingDevice === device.id ? (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={saveDevice}
                    >
                      Сохранить
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={cancelEditing}
                    >
                      Отмена
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => startEditingDevice(device)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeDevice(device.id)}
                    >
                      Удалить
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <Typography id="transition-modal-title" className="text-center mt-4">
            Нет доступных устройств
          </Typography>
        )}
      </ListGroup>
    </div>
  );
}
