import React from 'react';

const ItemDetail = (props) => {
    const {detail} = props
    return (
        <div>
            <img src={detail.image} alt="" />
        </div>
    );
}

export default ItemDetail;
