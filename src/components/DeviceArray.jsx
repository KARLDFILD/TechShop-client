import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { Card, Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceArray = observer(() => {
  const { device } = useContext(Context);
  const sortedDevices = [...device.devices].sort((a, b) => a.id - b.id);

  return (
    <Row className="flex items-start w-full">
      {sortedDevices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
});

export default DeviceArray;
