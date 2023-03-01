import React from "react";
const Registrarse = () => {
  const urlDB = import.meta.env.VITE_APP_BASE_URL;
  const accion = import.meta.env.VITE_APP_SESSIONS_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch(`${urlDB}${accion}/register`, {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
          window.location.replace("/login");
        }
      });
  };

  return (
    <>
      <div className="container__register">
        <form className="container__register-form" onSubmit={handleSubmit}>
          <div className="group__register">
            <label className="group__text-register" >Nombre</label>
            <input className="group__input-register" type="text" name="first_name" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Apellido</label>
            <input className="group__input-register" type="text" name="last_name" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Email</label>
            <input className="group__input-register" type="text" name="email" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Password</label>
            <input className="group__input-register" type="password" name="password" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Edad</label>
            <input className="group__input-register" type="text" name="age" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Telefono</label>
            <input className="group__input-register" type="text" name="phone_number" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Direccion</label>
            <input className="group__input-register" type="text" name="address" />
          </div>

          <div className="group__register">
            <label className="group__text-register" >Avatar</label>
            <input className="group__input-register"  type="file" name="image" />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-login">
             enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registrarse;
