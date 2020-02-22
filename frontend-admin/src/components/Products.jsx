import React, { useState, useEffect } from 'react'
import Table from './Table'

export default function Products() {
    
    const getEntName = (products) =>{
        const newProd =[...products]
        products.map( product =>{
            product.enterprise = product.enterprise.name
        })        
        return newProd
    }
    const [Products, setProducts] = useState({Products:[]});
    useEffect(() => {
        fetch("/api/products/")
        .then(Products => Products.json())
        .then(Products => Products.results)
        .then(Products => getEntName(Products))
        .then(Products => setProducts( {Products }))
        console.log((Products));
    } , [])

    return (
        <div>
            <Table data={Products.Products}/>
        </div>
    )
}
