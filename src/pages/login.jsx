import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const urlDB = import.meta.env.VITE_APP_BASE_URL;
  const accion = import.meta.env.VITE_APP_SESSIONS_ENDPOINT;

  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${urlDB}${accion}/login`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
          window.location.replace("/");
        }
      });
  };

  return (
    <div className="container__login">
      <div className="container__global-form">
        <form className="container__form" onSubmit={handleSubmit}>
          <div className="group__form">
            <label className="group__name">Email</label>
            <input
              className="group__input"
              type="text"
              name="email"
              value={Data.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="group__form">
            <label className="group__name">Password</label>
            <input
              className="group__input"
              type="password"
              name="password"
              value={Data.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-login">
             enviar
            </button>
          </div>
        </form>
        <div className="register-text">
          <Link className="register__link"  to={"/registro"}>Registrese Aqui</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
