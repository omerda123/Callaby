import React, { useState, useEffect } from 'react'
import Table from './Table'

export default function Products() {
    
    const [Products, setProducts] = useState({Products:[]});
    useEffect(() => {
        fetch("/api/products/")
        .then(Products => Products.json())
        .then(Products => Products.results)
        .then(Products => setProducts( {Products }))
        console.log((Products));
    } , [Products])

    return (
        <div>
            <Table data={Products.Products}/>
        </div>
    )
}
