import React from 'react';

const PageRankResults = ({ pageRank }) => {
    const sortedPageRank = Object.entries(pageRank).sort((a, b) => b[1] - a[1]);

    return (
        <div className="card mt-5 border-0 bg-white shadow-sm">
            <div className="card-body">
                <h5 className="card-title font-weight-bold text-green-500">Resultados</h5>
                <ul>
                    {sortedPageRank.map(([page, rank]) => (
                        <li key={page}>
                            {page}: {rank.toFixed(4)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PageRankResults;