import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../main";
import SideBar from "../components/SideBar";
import DeviceArray from "../components/DeviceArray";
import { observer } from "mobx-react-lite";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      9
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  useEffect(() => {
    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    const token = getCookie("token");

    console.log("Token:", token);
  }, []);

  return (
    <Container fluid className="pt-14">
      <Row className="mt-4">
        <Col md={3} className="mt-4">
          <SideBar />
        </Col>
        <Col md={9} className="flex flex-col items-center">
          <DeviceArray />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
