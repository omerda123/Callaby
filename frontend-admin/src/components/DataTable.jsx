import React from 'react';

export default function DataTable({ data }) {
    return (

        <div className="data-table">
            <table className="table">
                {
                    (data[0])
                        ? (
                            <tr>
                                {
                                    Object.keys(data[0]).map((th) => (
                                        <th style={{ width: (100 / data.length) }}>{th}</th>))
                                }
                            </tr>
                        ) : null


                }
                {

                    (data)
                        ? Object.values(data).map((row) => (
                            <tr>
                                {
                                    Object.keys(row).map((col) => (
                                        <td>
                                            {
                                                typeof (row[col]) === 'object'
                                                    ? JSON.stringify(row[col])
                                                    : row[col]
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        )) : null

                }


            </table>
        </div>
    );
}
