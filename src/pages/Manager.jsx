import React from "react";
import { useState,useEffect } from "react";

const Manager = () => {
  const [add, setAdd] = useState(false);
  const [read, setRead] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

  const handleSelect = (e) => {
    let value = e.target.value;
    if (value === "add") {
      setAdd(true);
      setDel(false);
      setRead(false);
      setUpdate(false);
    } else if (value === "read") {
      setRead(true);
      setAdd(false);
      setUpdate(false);
      setDel(false);
    } else if (value === "update") {
      setUpdate(true);
      setRead(false);
      setAdd(false);
      setDel(false);
    } else if (value === "delete") {
      setDel(true);
      setUpdate(false);
      setAdd(false);
      setRead(false);
    }
  };
  const handleCloseForm = () => {
    setAdd(false)
    setDel(false)
    setRead(false)
    setUpdate(false)
  };
 //! crud

 const urlDB = import.meta.env.VITE_APP_BASE_URL;
 const urlProduct = import.meta.env.VITE_APP_PRODUCT_ENDPOINT;
 const urlmodel = import.meta.env.VITE_APP_URL_PRODUCTS;
 //! Data
  const [md,setMd]= useState({})
 //! form dataa
 const [DataAdd, setDataAdd] = useState({
    model : "",
    characteristics :"",
    stock : "",
    price : "",
    image : ""
  });

  const [DataUp, setDataUp] = useState({
    model : "",
    newModel : "",
    characteristics :"",
    stock : "",
    price : "",
    image : ""
  });

  const [DataDel, setDataDel] = useState({
    model : ""
  });
  const [DataGet, setDataGet] = useState("");

  
  const handleInputChangeAdd = (e) => {
    setDataAdd({
      ...DataAdd,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeUp = (e) => {
    setDataUp({
        ...DataUp,
        [e.target.name]: e.target.value,
      });
  }

  const handleInputChangeDel = (e) => {
    setDataDel({
        ...DataDel,
        model : e.target.value,
      });
  };

  const handleInputChangeGet = (e) => {
    setDataGet(e.target.value)
  };
  
  

 const handleSubmitAdd = async (e) => {
   e.preventDefault();
   await fetch(`${urlDB}${urlProduct}`, {
     method: "POST",
     body: JSON.stringify(DataAdd),
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
 const handleSubmitGet = async (e) => {
    e.preventDefault();
        const fetchProduct = async () => {
        let result = await fetch(`${urlmodel}/search/${DataGet}`,{
            credentials: "include",
        });
        const data = await result.json();
        setMd(data.payload);
        };
    fetchProduct();
  };

  const handleSubmitUp = async (e) => {
    e.preventDefault();
    await fetch(`${urlDB}${urlProduct}`, {
      method: "PUT",
      body: JSON.stringify(DataUp),
      headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
    })
      .then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
          alert('Producto actualizado')
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        }
      });
  }

  const handleSubmitDel = async (e) => {
    console.log(DataDel);
    e.preventDefault();
    await fetch(`${urlmodel}/del`, {
      method: "DELETE",
      body: JSON.stringify(DataDel),
      headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
    })
      .then((result) => result.json())
      .then((json) => {
        if (json.status === "success") {
          alert('Producto Eliminado')
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        }
      });
  } 

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
      {
        user.role === "admin" ? <div>
          <div>
        <h1>Zona Administrativa</h1>
        <div>
          <button value={"add"} className="btn-crud" onClick={handleSelect}>
            Agregar
          </button>
          <button value={"read"} className="btn-crud" onClick={handleSelect}>
            Traer
          </button>
          <button value={"update"} className="btn-crud" onClick={handleSelect}>
            Actualizar
          </button>
          <button value={"delete"} className="btn-crud" onClick={handleSelect}>
            Borrar
          </button>
        </div>
      </div>

      <div style={add ? { display: "block" } : { display: "none" }}>
        <span  onClick={handleCloseForm}>
          <img className="icon-close" src="/prohibicion.png" alt="" />
        </span>
        <form onSubmit={handleSubmitAdd}>
            <h3>Agregar Productos</h3>
            <div>
                <label>Model</label>
                <input type="text" name="model" value={DataAdd.model} onChange={handleInputChangeAdd} />
            </div>
            <div>
                <label>Caracteristicas</label>
                <textarea name="characteristics" value={DataAdd.characteristics} onChange={handleInputChangeAdd}></textarea>
            </div>
            <div>
                <label>Stock</label>
                <input type="text" name="stock" value={DataAdd.stock} onChange={handleInputChangeAdd}/>
            </div>
            <div>
                <label>Price</label>
                <input type="text" name="price" value={DataAdd.price} onChange={handleInputChangeAdd}/>
            </div>
            <div>
                <label>Image</label>
                <input type="text" name="image" value={DataAdd.image} onChange={handleInputChangeAdd}/>
            </div>
            <button type="submit" className="btn-crud">enviar</button>
        </form>
      </div>

      <div style={read ? { display: "block" } : { display: "none" }}>
        <span  onClick={handleCloseForm}>
          <img className="icon-close" src="/prohibicion.png" alt="" />
        </span>
            <form onSubmit={handleSubmitGet}>
                <h3>Traer un vehiculo</h3>
                    <div>
                        <label>Ingrese el modelo</label>
                        <input type="text" value={DataGet.model} onChange={handleInputChangeGet} />
                    </div>
                    <button type="submit" className="btn-crud">enviar</button>
            </form>
             <div>
                {
                    md === null ? <p>no hay ningun vehiculo que mostrar</p> : 
                    <div className="container__crud-get">
                        <div className="container__get-content">
                            <h4 className="container__crud-title">{md.model}</h4>
                            <img className="crud__image" src={md.image} alt=""/>
                            <p className="container__crud-price" >💵 {md.price}</p>
                        </div>
                    </div>
                }
             </div>
      </div>

      <div style={update ? { display: "block" } : { display: "none" }}>
        <span  onClick={handleCloseForm}>
          <img className="icon-close" src="/prohibicion.png" alt="" />
        </span>
        <form onSubmit={handleSubmitUp}>
            <h3>Actualizar un vehiculo</h3>
            <div>
                <label>Ingrese el modelo actual</label>
                <input type="text" name="model" value={DataUp.model} onChange={handleInputChangeUp} />
            </div>
            <div>
                <label>Ingrese el nuevo modelo</label>
                <input type="text" name="newModel" value={DataUp.newModel} onChange={handleInputChangeUp} />
            </div>
            <div>
                <label>Caracteristicas</label>
                <textarea name="characteristics" value={DataUp.characteristics} onChange={handleInputChangeUp}></textarea>
            </div>
            <div>
                <label>Stock</label>
                <input type="text" name="stock" value={DataUp.stock} onChange={handleInputChangeUp}/>
            </div>
            <div>
                <label>Price</label>
                <input type="text" name="price" value={DataUp.price} onChange={handleInputChangeUp}/>
            </div>
            <div>
                <label>Image</label>
                <input type="text" name="image" value={DataUp.image} onChange={handleInputChangeUp}/>
            </div>
            <button type="submit" className="btn-crud">enviar</button>
        </form> 
      </div>

      <div style={del ? { display: "block" } : { display: "none" }}>
        <span  onClick={handleCloseForm}>
          <img className="icon-close" src="/prohibicion.png" alt="" />
        </span>
        <form onSubmit={handleSubmitDel}>
                <h3>Elimina un vehiculo</h3>
                    <div>
                        <label>Ingrese el modelo a eliminar</label>
                        <input type="text" name="model" value={DataDel.model} onChange={handleInputChangeDel} />
                    </div>
                    <button type="submit" className="btn-crud">enviar</button>
            </form>
          </div>
        </div> : <p>no eres admin</p>
      }

    </>
  );
};

export default Manager;
