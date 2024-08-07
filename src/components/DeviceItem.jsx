import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/const";
import { Rating } from "@mui/material";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col
      md={4}
      className="mt-4"
      onClick={() => {
        navigate(DEVICE_ROUTE + "/" + device.id);
      }}
    >
      <Card className="w-55 cursor-pointer border-grey-300 flex flex-col items-center gap-2 p-2">
        <Image
          style={{ width: 200, height: 200 }}
          src={import.meta.env.VITE_API_URL + device.img}
          className="flex self-center"
        />
        <p className="text-black text-xl text-center h-8 overflow-hidden hover:overflow-visible text-wrap w-full">
          {device.name}
        </p>
        <div className="flex gap-2 text-xl">{device.price} MLD</div>
        <div>
          <Rating name="read-only" value={device.rating} readOnly />
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
