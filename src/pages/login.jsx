import React from 'react';
import { useState } from 'react';
const Login = () => {

const urlDB = import.meta.env.VITE_APP_BASE_URL;
const accion = import.meta.env.VITE_APP_SESSIONS_ENDPOINT



const [Data, setData] = useState({
    email : '',
    password : ''
});


const handleInputChange = (e) => {
  setData({
    ...Data,
    [e.target.name] : e.target.value
  })
}
  const handleSubmit = async (e) => {
      e.preventDefault()
      await fetch(`${urlDB}${accion}/login`, {
        method: "POST",
        body: JSON.stringify(Data),
        headers: {
         "Content-Type": "application/json",
      },
      credentials: "include"
    })
      .then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
          window.location.replace("/");
        }
      });
  
    }  

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name='email' value={Data.email} onChange={handleInputChange}/>
          <label>Password</label>
          <input type="password" name='password' value={Data.password} onChange={handleInputChange}/>
          <button type='submit' style={{color : "#fff"}}>ENVIAR</button>
        </form>
    </div>
  );
}

export default Login;
