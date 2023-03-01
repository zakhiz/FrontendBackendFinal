import React from 'react';
import {Link} from 'react-router-dom';
const ItemDetail = (props) => {
    const {detail} = props
    return (
        <div className='container__detail-component'>
            <div className='container__card-detail'>
                <img className='detail__foto' src={detail.image} alt="" />
                <h1 className='detail__model'>{detail.model}</h1>
                <div>
                    <h3 className='detail__caracteristica'>Caracteristicas</h3>
                    <p className='detail__caracteristica-detalle'>{detail.characteristics}</p>
                </div>
            </div>
            <div className='container__price-detail'>
                <h4 className='container__price-title'>Precio</h4>
                <p className='container__price-number'>💵 {detail.price}</p>
                <Link className='btn__price' to={'/'}>Seguir comprando</Link>
            </div>
        </div>
    );
}

export default ItemDetail;
