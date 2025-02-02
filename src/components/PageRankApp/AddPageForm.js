import React, { useState } from 'react';

const AddPageForm = ({ pages, setPages }) => {
    const [newPage, setNewPage] = useState('');
    const [selectedLinks, setSelectedLinks] = useState([]);

    const handleAddPage = () => {
        if (newPage) {
            const updatedPages = { ...pages };
            updatedPages[newPage] = selectedLinks;
            setPages(updatedPages);
            setNewPage('');
            setSelectedLinks([]);
        }
    };

    return (
        <div className="card border-0 bg-white shadow-sm">
            <div className="card-body">
                <h5 className="card-title font-weight-bold text-green-500">Agregar Página</h5>
                <form>
                    <div className="form-group">
                        <label className="text-gray-600">Nombre de la página</label>
                        <input type="text" className="form-control border-0 shadow-sm" placeholder="Escribe el nombre de la página" value={newPage} onChange={(e) => setNewPage(e.target.value)} />
                    </div>
                    {Object.keys(pages).length > 0 && (
                        <div className="form-group">
                            <h5 className="card-title font-weight-bold text-green-500">Interlinks</h5>
                            <label className="text-gray-600">Si tu página tiene links de salida que apuntan a otra web dentro de tu sitio, seleccionala asi simulas la estructura de tu web</label>
                            <select
                                multiple
                                className="form-control border-0 shadow-sm"
                                value={selectedLinks}
                                onChange={(e) =>
                                    setSelectedLinks(
                                        Array.from(e.target.selectedOptions, (option) => option.value)
                                    )
                                }
                            >
                                {Object.keys(pages).map((page) => (
                                    <option key={page} value={page}>
                                        {page}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <br />
                    <button
                        type="button"
                        className="btn btn-green-500 shadow-sm"
                        onClick={handleAddPage}
                        disabled={newPage === ''}
                    >
                        Agregar Página
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPageForm;