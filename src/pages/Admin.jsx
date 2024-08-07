import * as React from "react";
import { Button, Container, Col } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import ManageDevices from "../components/modals/ManageDevices";

const Admin = () => {
  const [activeComponent, setActiveComponent] = React.useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "type":
        return <CreateType />;
      case "brand":
        return <CreateBrand />;
      case "device":
        return <CreateDevice />;
      case "manageDevice":
        return <ManageDevices />;
      default:
        return <CreateType />;
    }
  };

  return (
    <Container className="flex pt-20 justify-center items-center max-lg:flex-col gap-4">
      <Col
        className="flex flex-col items-center justify-center flex-grow p-4 sticky-form max-lg:static self-start max-lg:self-center"
        style={{ border: "2px solid lightgrey", borderRadius: 20 }}
      >
        <Button
          onClick={() => setActiveComponent("type")}
          variant="outline-success"
          className="p-2 w-full"
        >
          Добавить/Изменить/Удалить тип
        </Button>
        <Button
          onClick={() => setActiveComponent("brand")}
          variant="outline-success"
          className="mt-4 p-2 w-full"
        >
          Добавить/Изменить/Удалить брэнд
        </Button>
        <Button
          onClick={() => setActiveComponent("device")}
          variant="outline-success"
          className="mt-4 p-2 w-full"
        >
          Добавить устройство
        </Button>
        <Button
          onClick={() => setActiveComponent("manageDevice")}
          variant="outline-success"
          className="mt-4 p-2 w-full"
        >
          Редактировать/Удалить устройство
        </Button>
      </Col>
      <Col className="p-0 " md={8}>
        {renderComponent()}
      </Col>
    </Container>
  );
};

export default Admin;
