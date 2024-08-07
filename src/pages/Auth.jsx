import React, { useContext } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LOGIN_ROUTE, REGISTRATION_RUOTE, SHOP_ROUTE } from "../utils/const";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Некорректный email адрес")
        .required("Поле обязательно для заполнения"),
      password: Yup.string()
        .min(6, "Пароль должен содержать не менее 6 символов")
        .required("Поле обязательно для заполнения"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        let data;
        if (isLogin) {
          data = await login(values.email, values.password);
          navigate(SHOP_ROUTE);
        } else {
          data = await registration(values.email, values.password);
          navigate(LOGIN_ROUTE);
          setEmail("");
          setPassword("");
        }
        user.setUser(data);
        user.setIsAuth(true);
      } catch (e) {
        setFieldError("general", e.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container
      className="flex justify-center items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="w-1/2 lg:w-1/3 p-3 lg:p-5 max-md:w-10/12">
        <h2 className=" text-2xl text-center w-auto">
          {isLogin ? "Авторизация" : "Регистрация"}
        </h2>
        <Form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <Form.Control
            id="emailInput"
            className="mt-4 "
            placeholder="Введите ваш Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}

          <Form.Control
            className="mt-4"
            placeholder="Введите ваш пароль"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && !!formik.errors.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}

          {formik.errors.general && (
            <div className="text-red-500 text-sm">{formik.errors.general}</div>
          )}

          <Row className="flex justify-center m-0 mt-4 max-md:flex-col items-center max-lg:flex-col gap-2 w-auto">
            {isLogin ? (
              <div className="w-auto text-center  flex flex-col">
                Нет аккаунта?
                <NavLink to={REGISTRATION_RUOTE}>
                  <span className="underline ml-3">Зарегистрироваться</span>
                </NavLink>
              </div>
            ) : (
              <div className="w-auto text-center flex flex-col ">
                Уже зарегистрированы?
                <NavLink to={LOGIN_ROUTE}>
                  <span className="underline align-middle">Войти</span>
                </NavLink>
              </div>
            )}
            <Button
              className="w-4/12 max-xs:w-10/12 max-xs:mt-4 max-lg:w-10/12 max-lg:mt-4 text-nowrap h-auto"
              variant="outline-success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
