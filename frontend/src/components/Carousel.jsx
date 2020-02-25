/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ProductList from './ProductList';
import FormList from './FormList';

export default function Carousel({ onProductChange, products, onFormPress }) {
    const [items, setItems] = useState(['Products', 'Forms']);
    const [active, setActive] = useState('Products');

    const next = () => {
        const current = items.indexOf(active);
        console.log(current);
        setActive(items[current + 1]);
    };

    return (
        <div className="carousel">
            <h2>
                {'<  '}
                {active}
                <span onClick={next}>{'  >'}</span>
            </h2>

            {(() => {
                switch (active) {
                case 'Products': return <ProductList products={products} onProductChange={onProductChange} />;
                case 'Forms': return <FormList onFormPress={onFormPress} />;
                default: return <ProductList products={products} onProductChange={onProductChange} />;
                }
            })()}

        </div>
    );
}
