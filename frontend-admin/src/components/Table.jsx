import React from 'react'

export default function Table(props) {
    const {data} = props
   
    return (
        <div>
            {   
            
            data.map ( item =>  {
                console.log(item);
                return(
                    Object.keys(item).map(key =>{ 
                        return(
                            <div className="table"> 
                                <span className="table-td"> {key} </span> 
                                <span className="table-td"> {item.key} </span> 
                            </div>
                        )
                    })
                )

            })
            }
        </div>
    )
}
