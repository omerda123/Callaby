import React from 'react';

export default function product(props) {
    const { name } = props;
    const { imageUrl } = props;
    const { imageAlt } = props;
    const { price } = props;
    return (

        <div className="product" onClick={props.onClick}>
            <div className="product-pic">
                <img src={imageUrl} alt={imageAlt} className="product-image" />
            </div>
            <div className="product-details">
                <div>
                    {name}
                </div>
                <div>
                    {price}
                </div>
            </div>
        </div>
    );
}
