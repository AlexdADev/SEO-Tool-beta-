import React from 'react';
import Network from '../Network/Network';

const NetworkVisualization = ({ pages }) => {
    return (
        <div className="card border-0 bg-white shadow-sm">
            <div className="card-body">
                <h5 className="card-title font-weight-bold text-green-500">Red de Páginas</h5>
                <div className="network-container" style={{ overflow: 'auto' }}>
                    <Network pages={pages} />
                </div>
            </div>
        </div>
    );
};

export default NetworkVisualization;