import React from 'react'

export default function Table(props) {
    const {data} = props
    return (
        <div className="table">
            {

                data.map ( item =>  {
                    return(
                        <div className="table-row"> {Object.keys(item).map(key =>{
                            if (key === "image"){
                              
                                return(
                                    <span className="table-col"> 
                                    <img src={item[key]} alt="product-item"></img>
                                     </span>
                                )
                            }
                            else
                                return( <span className="table-col"> {item[key]} </span>)
                            }
                         )}
                        </div>
                    )
                })
            }
        </div>)
    
}



