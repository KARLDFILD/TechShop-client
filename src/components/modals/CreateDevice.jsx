import * as React from "react";
import { Context } from "../../main";
import { Button, Form, Dropdown } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer((props) => {
  const { device } = React.useContext(Context);
  const [info, setInfo] = React.useState([]);

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    createDevice(formData).then((data) => console.log("OK"));
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-4"
      style={{ border: "2px solid lightgrey", borderRadius: 20 }}
    >
      <Form className="flex flex-col gap-3 justify-center items-center">
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          className="mb-2 text-center"
        >
          Добавить новое устройство
        </Typography>
        <Dropdown className="w-full">
          <Dropdown.Toggle className="w-full" variant="outline-success">
            {device.selectedType.name || "Выберите тип"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-full text-center">
            {device.types.map((type) => (
              <Dropdown.Item
                onClick={() => device.setSelectedType(type)}
                key={type.id}
              >
                {type.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="w-full">
          <Dropdown.Toggle className="w-full" variant="outline-success">
            {device.selectedBrand.name || "Выберите брэнд"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-full text-center">
            {device.brands.map((brand) => (
              <Dropdown.Item
                onClick={() => device.setSelectedBrand(brand)}
                key={brand.id}
              >
                {brand.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название устройства"
        />
        <Form.Control
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Стоимость устройства"
          type="number"
        />
        <Form.Control onChange={selectFile} type="file" />

        <Button onClick={addInfo} variant="outline-success">
          Добавдение нового свойства
        </Button>

        {info.map((i) => (
          <div
            key={i.number}
            className="d-flex flex-column justify-content-center w-100 gap-3 p-4"
            style={{ border: "2px solid lightgrey", borderRadius: 20 }}
          >
            <Form.Control
              value={i.title}
              onChange={(e) => changeInfo("title", e.target.value, i.number)}
              placeholder="Название свойства"
            />
            <Form.Control
              value={i.description}
              onChange={(e) =>
                changeInfo("description", e.target.value, i.number)
              }
              placeholder="Описание свойства"
            />
            <Button
              className="w-100"
              variant="outline-danger"
              onClick={() => removeInfo(i.number)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </Form>
      <hr className="w-full mt-4 mb-4" />
      <div className="flex justify-center items-center gap-3">
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={props.handleClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
});

export default CreateDevice;
