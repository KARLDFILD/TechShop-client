import * as React from "react";
import Typography from "@mui/material/Typography";
import { Form, Button, ListGroup } from "react-bootstrap";
import {
  createBrand,
  deleteBrand,
  fetchBrands,
  updateBrandByName,
} from "../../http/deviceAPI";

export default function CreateBrand(props) {
  const [value, setValue] = React.useState("");
  const [brands, setBrands] = React.useState([]);
  const [isInputEmpty, setIsInputEmpty] = React.useState(false);
  const [editingBrand, setEditingBrand] = React.useState(null);
  const [newBrandName, setNewBrandName] = React.useState("");

  React.useEffect(() => {
    fetchBrands().then((data) => {
      const sortedBrands = data.sort((a, b) => a.id - b.id);
      setBrands(sortedBrands);
    });
  }, []);

  const addBrand = () => {
    if (value) {
      createBrand({ name: value }).then(() => {
        setValue("");
        fetchBrands().then((data) => {
          const sortedBrands = data.sort((a, b) => a.id - b.id);
          setBrands(sortedBrands);
        });
      });
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  };

  const removeBrand = (name) => {
    deleteBrand(name).then(() => {
      fetchBrands().then((data) => {
        const sortedBrands = data.sort((a, b) => a.id - b.id);
        setBrands(sortedBrands);
      });
    });
  };

  const startEditingBrand = (brand) => {
    setEditingBrand(brand.name);
    setNewBrandName(brand.name);
  };

  const saveBrand = () => {
    if (newBrandName) {
      updateBrandByName(editingBrand, newBrandName).then(() => {
        setEditingBrand(null);
        setNewBrandName("");
        fetchBrands().then((data) => {
          const sortedBrands = data.sort((a, b) => a.id - b.id);
          setBrands(sortedBrands);
        });
      });
    }
  };

  const cancelEditing = () => {
    setEditingBrand(null);
    setNewBrandName("");
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-4"
      style={{ border: "2px solid lightgrey", borderRadius: 20 }}
    >
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        className="mb-4 text-center"
      >
        Добавить новый брэнд устройств
      </Typography>
      <Form>
        <Form.Control
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите новый брэнд"
        />
        {isInputEmpty && (
          <Typography id="transition-modal-title" className="mt-3 text-red-600">
            Нельзя добавить пустое поле
          </Typography>
        )}
      </Form>
      <div className="flex gap-3 mt-3">
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={props.handleClose}>
          Закрыть
        </Button>
      </div>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        className="text-center mt-4"
      >
        Редактировать/Удалить брэнд устройств
      </Typography>
      <ListGroup className="w-full">
        {brands.map((brand) => (
          <ListGroup.Item
            key={brand.id}
            className="flex justify-between items-center mt-2 gap-3 max-xs:flex-col"
          >
            {editingBrand === brand.name ? (
              <Form.Control
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Введите новое имя брэнда"
              />
            ) : (
              <span className="flex gap-3">
                <div className="w-10">id:{brand.id}</div> {brand.name}
              </span>
            )}
            <div className="flex gap-2">
              {editingBrand === brand.name ? (
                <>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={saveBrand}
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
                    onClick={() => startEditingBrand(brand)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeBrand(brand.name)}
                  >
                    Удалить
                  </Button>
                </>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
