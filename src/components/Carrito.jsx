import React from 'react';
import {Link} from 'react-router-dom';

const Carrito = (props) => {
    const {cart} = props
    return (
       <>
        <div className='container__general-carrito'>
            {
              Array.isArray(cart) ? cart.length !== 0  ? cart.map(cart => <div  className='cart__carrito' key={cart._id}>
              <img className='cart__foto' src={cart.image} alt=""/>
              <div className='cart__container-text'>
                <h2 className='cart__title-carrito cart__font-style'>{cart.model}</h2>
                <p className='cart__price-carrito cart__font-style'>💵 {cart.price}</p>
              </div>  
            
              </div>) : <div className='noProducts'>
                          <h3 className='cart__font-style carrito-vacio'>Carrito Vacio</h3>
                          <Link className='cart__font-style link-catalogo' to={'/'}>Mire los vehiculos disponibles Aqui</Link>
                        </div> :
                        <div className='noProducts'>
                          <h3 className='art__font-style carrito-vacio'>Logueate para usar esta funcion</h3>
                          <Link className='cart__font-style link-login ' to={'/login'}>Iniciar Sesion</Link>
                        </div>
            }
        </div>  
       </>
    );
}

export default Carrito;
