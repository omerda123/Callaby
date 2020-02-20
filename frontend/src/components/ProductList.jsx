import React from 'react';
import Product from './Product';

export default function ProductList(props) {
    return (
        <div className="products-list">
            {
                props.products.map((product, i) => (
                    <Product
                      key={i}
                      name={product.name}
                      imageUrl={product.imageUrl}
                      imageAlt={product.imageAlt}
                      price={product.price}
                      onClick={() => props.onProductChange(product)}
                    />
                ))
            }
        </div>
    );
}
