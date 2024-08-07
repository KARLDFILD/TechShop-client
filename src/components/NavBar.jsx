import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import CloseIcon from "@mui/icons-material/Close";
import GrButton from "react-bootstrap/Button";
import {
  SHOP_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  BASKET_ROUTE,
  activeColor,
} from "../utils/const";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <div className="overlay" onClick={handleClose} />}
      <AppBar
        position="fixed"
        className="h-16"
        style={{ background: activeColor }}
      >
        <Toolbar className="h-16">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(SHOP_ROUTE)}
            style={{ cursor: "pointer" }}
          >
            TechShop
          </Typography>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Hidden>
          <Hidden mdDown>
            {user.isAuth ? (
              <>
                <Button color="inherit" component={NavLink} to={BASKET_ROUTE}>
                  Корзина
                </Button>
                {user.hasRole("ADMIN") && (
                  <Button color="inherit" component={NavLink} to={ADMIN_ROUTE}>
                    Панель Администратора
                  </Button>
                )}
                <Button color="inherit" onClick={logOut}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
                Войти
              </Button>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
      <div
        className={`sidebar ${
          isMenuOpen ? "open" : ""
        } flex flex-col justify-start items-center pt-3`}
      >
        {user.isAuth ? (
          <>
            <MenuItem onClick={handleClose}>
              <NavLink to={BASKET_ROUTE} className="hover:underline w-full">
                Корзина
              </NavLink>
            </MenuItem>
            {user.hasRole("ADMIN") && (
              <MenuItem onClick={handleClose}>
                <NavLink to={ADMIN_ROUTE} className="w-full">
                  Панель Администратора
                </NavLink>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                logOut();
                handleClose();
              }}
              className="w-full "
            >
              <GrButton variant="success" className="w-full ml-5 mr-5">
                Выйти
              </GrButton>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              navigate(LOGIN_ROUTE);
              handleClose();
            }}
          >
            <GrButton variant="success" className="w-full">
              Войти
            </GrButton>
          </MenuItem>
        )}
      </div>
    </>
  );
});

export default NavBar;
