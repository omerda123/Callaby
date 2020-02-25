import React from 'react';

export default function Details(props) {
    const { customers } = props;
    const { activeChat } = props;


    return (
        <div className="details">
            <div className="details-item">
                <div style={{ fontWeight: 'bold', width: '110px', paddingLeft: '5px' }}>Customer</div>
                <div>
                    {
                        (customers[activeChat])
                            ? customers[activeChat].name
                            : 'None'
                    }
                </div>
            </div>
            <div className="details-item">
                {' '}
                <div style={{ fontWeight: 'bold', width: '110px', paddingLeft: '5px' }}>Skill</div>
                {' '}
                <div> Coffee machine</div>
            </div>
            <div className="details-item">
                <div style={{ fontWeight: 'bold', width: '110px', paddingLeft: '5px' }}>call duration</div>
                <div>
                    {(customers[activeChat]) ? customers[activeChat]['timer'] : '0:00'}
                </div>
            </div>

        </div>
    );
}
