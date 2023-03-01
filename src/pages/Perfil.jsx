import React from 'react';
import {useState , useEffect} from 'react';
const Perfil = () => {
  const [user, setUser] = useState({});

  const rutaPrincipal = import.meta.env.VITE_APP_BASE_URL;
  const ruta = import.meta.env.VITE_APP_SESSIONS_ENDPOINT;
  useEffect(() => {
    let cookie = document.cookie.split(";").find((cookie) => cookie.startsWith("itZ2zXYh6X="))
    
    if(typeof cookie === "string" ){
     cookie = cookie.split('=')[1];
    }

    if (cookie === undefined) {
      setUser({
        id: 0,
      });
    } else {
      const fetchUser = async () => {
        let result = await fetch(`${rutaPrincipal}${ruta}/${cookie}`);
        const data = await result.json();
        setUser(data.payload);
      };
      fetchUser();
    }
  }, []);

    return (
        <>
          <div className="container__perfil">
            <div className="container__cart-perfil">
              <img className="foto__perfil"  src={user.avatar} alt=""/>
              <h1 className="perfil__title cart__font-style">{user.first_name} {user.last_name}</h1>
              <p className="cart__font-style perfil__description">🥳 {user.age}</p>
              <p className="cart__font-style perfil__description">📱 {user.phone_number}</p>
            </div>  
          </div>
        </>
    );
}

export default Perfil;
