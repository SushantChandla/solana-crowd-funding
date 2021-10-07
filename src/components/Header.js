import React from 'react';
export default ({ setRoute }) => {
    return (
        <div className="ui menu black" style={{ 'marginTop': '5px' }}>
            <a href="/#" className="ui header item" onClick={() => setRoute(0)}>Funding</a>
            <a href="/#" className="ui item" onClick={() => setRoute(0)}>Campaigns</a>
            <div className="right menu">
                <a href="/#" className="item" onClick={() => setRoute(1)}>Create Campaign</a>
            </div>

        </div>
    );
};