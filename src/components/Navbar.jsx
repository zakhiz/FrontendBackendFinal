import { Link, json } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [user, setUser] = useState({});
  

  const [modalStyle, setModalStyle] = useState(false);


  const rutaPrincipal = import.meta.env.VITE_APP_BASE_URL;
  const ruta = import.meta.env.VITE_APP_SESSIONS_ENDPOINT;
  const nameCookie = import.meta.env.VITE_COOKIE;

  const handleShowModal = () => {
    setModalStyle(true);
  }

  const handleCloseModal = () => {
    setModalStyle(false);
  }

  let cookie = document.cookie.split(";").find((cookie) => cookie.startsWith(`${nameCookie}=`))
    
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
        setUser(data.payload);
      };
      fetchUser();
    }
  }, []);
  const handleCloseSession = () => {
    fetch(`${rutaPrincipal}${ruta}/logout`,{
      credentials: "include"
    })
     .then(res => res.json())
     .then(json => {
        if(json.status === "success"){
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
        }
     })
  }
  return (
    <>
      <div className="title__container">
        <h1 className="title">JDM STORE</h1>
      </div>
      <nav className="container__Navbar">
        <Link className="menu" to={"/"}>
          Home
        </Link>
        <Link className="menu" to={"/carrito"}>
          🛒 Carrito
        </Link>
        {user.id === 0 ? (
          <Link className="menu" to={"/login"}>
            iniciar sesion
          </Link>
        ) : (
            <button className="menu" onClick={handleShowModal}>perfil</button>
        )}
      </nav>
      <div className="box-modal">
        <div className='modal' style={modalStyle ? {display : "block"} : {display : "none"}}>
             <div className='modal-content'>
                <span className='close' onClick={handleCloseModal}><img className="icon-close" src="/prohibicion.png" alt=""  /></span>
                <div className="modal__content">
                <Link className="box-perfil btn-perfil cart__font-style
                  " to={'/perfil'}><img className="icon-perfil" src={user.avatar} alt=""/> Ver Perfil</Link>
                  {
                    user.role === "admin" ? <Link className="btn-manager cart__font-style" to={'/manager'}>Manager</Link> : <Link></Link>
                  }
                  <Link className="btn-perfil cart__font-style" onClick={handleCloseSession}>Cerrar Sesion</Link>
                </div>
             </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
