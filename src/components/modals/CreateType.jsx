import React from "react";
import Typography from "@mui/material/Typography";
import { Form, Button, ListGroup } from "react-bootstrap";
import {
  createType,
  deleteType,
  fetchTypes,
  updateTypeByName,
} from "../../http/deviceAPI";

export default function CreateType(props) {
  const [value, setValue] = React.useState("");
  const [types, setTypes] = React.useState([]);
  const [isInputEmpty, setIsInputEmpty] = React.useState(false);
  const [editingType, setEditingType] = React.useState(null);
  const [newTypeName, setNewTypeName] = React.useState("");

  React.useEffect(() => {
    fetchTypes().then((data) => {
      const sortedTypes = data.sort((a, b) => a.id - b.id);
      setTypes(sortedTypes);
    });
  }, []);

  const addType = () => {
    if (value) {
      createType({ name: value }).then(() => {
        setValue("");
        fetchTypes().then((data) => {
          const sortedTypes = data.sort((a, b) => a.id - b.id);
          setTypes(sortedTypes);
        });
      });
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  };

  const removeType = (name) => {
    deleteType(name).then(() => {
      fetchTypes().then((data) => {
        const sortedTypes = data.sort((a, b) => a.id - b.id);
        setTypes(sortedTypes);
      });
    });
  };

  const startEditingType = (type) => {
    setEditingType(type.name);
    setNewTypeName(type.name);
  };

  const saveType = () => {
    if (newTypeName) {
      updateTypeByName(editingType, newTypeName).then(() => {
        setEditingType(null);
        setNewTypeName("");
        fetchTypes().then((data) => {
          const sortedTypes = data.sort((a, b) => a.id - b.id);
          setTypes(sortedTypes);
        });
      });
    }
  };

  const cancelEditing = () => {
    setEditingType(null);
    setNewTypeName("");
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
        Добавить новый тип устройств
      </Typography>
      <Form>
        <Form.Control
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите новый тип"
        />
        {isInputEmpty && (
          <Typography id="transition-modal-title" className="mt-3 text-red-600">
            Нельзя добавить пустое поле
          </Typography>
        )}
      </Form>
      <div className="flex gap-3 mt-3">
        <Button variant="outline-success" onClick={addType}>
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
        Редактировать/Удалить тип устройств
      </Typography>
      <ListGroup className="w-full ">
        {types.map((type) => (
          <ListGroup.Item
            key={type.id}
            className="flex justify-between items-center mt-2 gap-3 max-xs:flex-col"
          >
            {editingType === type.name ? (
              <Form.Control
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                placeholder="Введите новое имя типа"
              />
            ) : (
              <span className="flex gap-3">
                <div className="w-10">id:{type.id}</div> {type.name}
              </span>
            )}
            <div className="flex gap-2">
              {editingType === type.name ? (
                <>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={saveType}
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
                    onClick={() => startEditingType(type)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeType(type.name)}
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
