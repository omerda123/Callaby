import React from 'react';

export default function ProductList(props) {
    return (
        <div className="products-list">
            {
                props.products.map((product, index) => (
                    <>
                        <div className="product" key={index}>
                            <div className="product-pic">
                                <img src={product.image_url} alt={product.image_alt} className="product-image" />
                            </div>
                            <div className="product-details">
                                <div>
                                    {product.name}
                                    {' '}
                                </div>
                                <div>
                                    {product.price}
$
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </div>
    );
}
