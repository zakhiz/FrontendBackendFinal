import React from "react";
import { useState, useEffect } from "react";
import Carrito from "../components/Carrito";
const CarritoContainer = () => {
  const [user, setUser] = useState([]);
  const [buy,setBuy] = useState({});
  const rutaPrincipal = import.meta.env.VITE_APP_BASE_URL;
  const ruta = import.meta.env.VITE_APP_SESSIONS_ENDPOINT;
  const buyfinal = import.meta.env.VITE_FINAL_BUY;
  const nameCookie = import.meta.env.VITE_COOKIE;
  let pricess = []
  let lastId,newId
  lastId = !pricess.length ? 0 : pricess[pricess.length - 1].id;
  newId = lastId + 1;
  for (let i = 0; i < user.length; i++) {
    
    pricess.push({
      id : newId++,
      price : user[i].price
    })
  }
  let cookie = document.cookie.split(";").find((cookie) => cookie.startsWith(`${nameCookie}=`));
    
  if(typeof cookie === "string" ){
   cookie = cookie.split('=')[1];
  }
  useEffect(() => {
    if (cookie === undefined) {
      setUser({
        id: 0,
      });
    } else {
      const fetchUser = async () => {
        let result = await fetch(`${rutaPrincipal}${ruta}/${cookie}`);
        const data = await result.json();
        setUser(data.payload.cart);
        setBuy(data.payload);
      };
      fetchUser();
    }
  }, []);
  const handleBuy = async (e) => {
    if(cookie === undefined ){
      alert(`inicie sesion para comenzar a comprar`)
      window.location.replace("/login");
    }else{
      let id = e.target.dataset
      await fetch(`${rutaPrincipal}${buyfinal}`, {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
       "Content-Type": "application/json",
      },
      credentials: "include"
    }
    ).then((result) => result.json())
     .then((json) => {
        if (json.status === "success") {
            alert('compra realizada');
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
        }
      });
    }
  } 




  return (
    <div className="container__global-carrito">
        <Carrito cart={user}/>
      <div className="ticket__container">
        <h2 className="ticket__title cart__font-style">Ticket</h2>
            {
              pricess.map(price => <p key={price.id} className="valor cart__font-style">
                  valor / u  : {price.price}
              </p>)
            }
            <p className="valor cart__font-style">Valor Total : </p>
            <button className="btn-final cart__font-style" data-id={buy._id} onClick={handleBuy}>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default CarritoContainer;
