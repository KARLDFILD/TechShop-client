import { Col, Container, Row } from "react-bootstrap";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import inst from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import location from "../assets/location.svg";
import email from "../assets/email.svg";
import phone from "../assets/phone.svg";
import fax from "../assets/fax.svg";

const Footer = () => {
  return (
    <Container fluid className="mt-8 bg-gray-100 p-8 ">
      <Row className="flex justify-center items-center">
        <div className="flex justify-center gap-4">
          <div className=" text-lg max-xs:hidden max-md:hidden">
            Следите за новинками и акциями нашего магазина техники в социальных
            сетях:
          </div>
          <a href="">
            <img className="w-8 h-8" src={facebook} />
          </a>
          <a href="">
            <img className="w-8 h-8" src={twitter} />
          </a>
          <a href="">
            <img className="w-8 h-8" src={inst} />
          </a>
          <a href="">
            <img className="w-8 h-8" src={telegram} />
          </a>
        </div>
      </Row>
      <hr className="mt-4 mb-4 " />
      <Row className="max-xs:flex max-xs:gap-10 max-md:flex max-md:justify-center">
        <Col
          md={4}
          className="flex flex-col justify-center items-center max-xs:hidden mb-3"
        >
          <div className="text-lg font-bold">TechShop</div>
          <div className="text-center mt-2 ">
            Добро пожаловать в наш магазин техники, где вы найдете широкий
            ассортимент современных гаджетов, бытовой электроники и аксессуаров
            от ведущих мировых брендов. Мы предлагаем качественную продукцию по
            доступным ценам и гарантируем отличный сервис и быструю доставку.
          </div>
        </Col>
        <Col md={4} className="flex flex-col justify-start items-center mb-3">
          <div className="text-lg font-bold">Полезные ссылки</div>
          <ul className="flex flex-col gap-3 mt-2">
            <li className="text-center">
              <a href="" className="hover:underline">
                Заказы
              </a>
            </li>
            <li className="text-center">
              <a href="" className="hover:underline">
                Поддержка
              </a>
            </li>
          </ul>
        </Col>
        <Col md={4} className="flex flex-col justify-start items-center">
          <div className="text-lg font-bold">Контакты</div>
          <ul className="flex flex-col gap-3 mt-2">
            <li className="text-center flex items-center gap-1">
              <img src={location} className="w-8 h-8" />
              str.Studentilor 5
            </li>
            <li className="text-center flex items-center gap-1">
              <img src={email} className="w-8 h-8" />
              <a href="mailto:techshop@gmail.com">techshop@gmail.com</a>
            </li>
            <li className="text-center flex items-center gap-1">
              <img src={phone} className="w-8 h-8" />
              <a href="tel:022 22-99-6">022 22-99-6</a>
            </li>
            <li className="text-center flex items-center gap-1">
              <img src={fax} className="w-8 h-8" />
              022 22-99-6
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
