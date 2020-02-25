import React, { useState, useEffect } from 'react';
import Product from './Product';

export default function ProductList(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products/')
            .then((products) => products.json())
            .then((products) => products.results)
            .then((products) => setProducts(products));
        console.log(products);
    }, []);

    return (
        <div className="products-list">
            {
                products.map((product, i) => (
                    <Product
                      key={i}
                      name={product.name}
                      imageUrl={product.image}
                      imageAlt={product.name}
                      price={product.price}
                      onClick={() => props.onProductChange(product)}
                    />
                ))
            }
        </div>
    );
}
