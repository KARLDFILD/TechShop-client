import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main.jsx";
import { check } from "./http/userAPI.js";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer.jsx";

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  });
  if (loading) {
    return <Spinner animation={"grow"} className="spinner" />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
