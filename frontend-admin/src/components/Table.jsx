import React from 'react'

export default function Table(props) {
    const {data} = props
    return (
        <div className="table">
            {
                data.map ( item =>  {
                    return(
                        <div className="table-row"> {Object.values(item).map(key => <span className="table-col"> {key} </span> )}
                        </div>
                    )
                })
            }
        </div>)
    
}



