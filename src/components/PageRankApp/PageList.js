import React, { useState } from 'react';
import DeletePageConfirmation from './DeletePageConfirmation';

const PageList = ({ pages, setPages }) => {
    const [pageToDelete, setPageToDelete] = useState('');

    const handleDeletePage = () => {
        if (pageToDelete) {
            const updatedPages = { ...pages };
            delete updatedPages[pageToDelete];
            Object.keys(updatedPages).forEach(page => {
                updatedPages[page] = updatedPages[page].filter(link => link !== pageToDelete);
            });
            setPages(updatedPages);
            setPageToDelete('');
        }
    };

    return (
        <div className="card mt-5 border-0 bg-white shadow-sm">
            <div className="card-body">
                <h5 className="card-title font-weight-bold text-green-500">Páginas Agregadas</h5>
                <ul>
                    {Object.entries(pages).map(([page, links]) => (
                        <li key={page}>
                            {page}: {links.join(', ')}
                            <button
                                type="button"
                                className="btn btn-danger shadow-sm ml-2 m-2"
                                onClick={() => setPageToDelete(page)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
                <DeletePageConfirmation
                    pageToDelete={pageToDelete}
                    onConfirmDelete={handleDeletePage}
                    onCancelDelete={() => setPageToDelete('')}
                />
            </div>
        </div>
    );
};

export default PageList;