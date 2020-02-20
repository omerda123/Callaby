/* eslint-disable react/prop-types */
import React from 'react';
import ProductList from './ProductList';

export default function carousel({ onProductChange, products }) {
    return (
        <div className="carousel">
            <h2>
                {'<'}
Products
                {'>'}
            </h2>
            <ProductList products={products} onProductChange={onProductChange} />
        </div>
    );
}
