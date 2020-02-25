/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ProductList from './ProductList';
import FormList from './FormList';

export default function Carousel({ onProductChange, products, onFormPress }) {
    const items = ['Products', 'Forms'];
    const [active, setActive] = useState('Products');

    const next = () => {
        const current = items.indexOf(active);
        const next = current === items.length - 1 ? 0 : current + 1;
        console.log(next);
        setActive(items[next]);
    };


    const prev = () => {
        const current = items.indexOf(active);
        const prev = current === 0 ? items.length - 1 : current - 1;
        console.log(next);
        setActive(items[prev]);
    };

    return (
        <div className="carousel">
            <h2>
                <span onClick={prev}>{'<  '}</span>
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
