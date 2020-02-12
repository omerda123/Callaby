import React from 'react'
import ProductList from './ProductList'

export default function carousel(props) {
    return (
        <div className="carousel">
            <h2> {'<'} Products ></h2>
            <ProductList products={props.products}/>
        </div>
    )
}
