import React, { useState, useEffect } from 'react';
import Network from './components/Network';
import calculatePageRank from './utils/calculatePageRank';
import './style/estilos.css'
import GeminiComponent from './components/GeminiComponent';

const PageRankApp = () => {
    const [pages, setPages] = useState({});
    const [newPage, setNewPage] = useState('');
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [pageRank, setPageRank] = useState({});
    const [pageToDelete, setPageToDelete] = useState('');

    useEffect(() => {
        const updatedPageRank = calculatePageRank(pages);
        setPageRank(updatedPageRank);
    }, [pages]);

    const handleAddPage = () => {
        if (newPage) {
            const updatedPages = { ...pages };
            updatedPages[newPage] = selectedLinks;
            setPages(updatedPages);
            setNewPage('');
            setSelectedLinks([]);
            console.log('Agregando página:', newPage, selectedLinks);
        }
    };


    const handleDeletePage = () => {
        if (pageToDelete) {
            const updatedPages = { ...pages };
            delete updatedPages[pageToDelete];
            Object.keys(updatedPages).forEach(page => {
                updatedPages[page] = updatedPages[page].filter(link => link !== pageToDelete);
            });
            setPages(updatedPages);
            setPageToDelete('');
            console.log('Eliminando página:', pageToDelete);
        }
    };

    const sortedPageRank = Object.entries(pageRank).sort((a, b) => b[1] - a[1]);

    return (
        <>
            <div className="container-fluid bg-dark-95 p-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center mt-5 mb-5 text-green-500 font-weight-bold">Simulador de PageRank</h1>
                        <p className="text-center mb-5 text-gray-600">
                            "Simulador de PageRank: Medir el interlink interno y planificar la estructura de tu web"
                            <br /> La nueva página puede tener enlaces que salen hacia otras páginas que ya están en la red y de esta manera se hace una simulacion de interlinks
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card border-0 bg-white shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold text-green-500">Agregar Página</h5>
                                <form>
                                    <div className="form-group">
                                        <label className="text-gray-600">Nombre de la página</label>
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-sm"
                                            placeholder="Escribe el nombre de la página"
                                            value={newPage}
                                            onChange={(e) => setNewPage(e.target.value)}
                                        />
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
                                {pageToDelete && (
                                    <div className="mt-3 text-center">
                                        <p>¿Estás seguro de eliminar la página "{pageToDelete}"?</p>
                                        <button
                                            type="button"
                                            className="btn btn-danger shadow-sm mr-2"
                                            onClick={handleDeletePage}
                                        >
                                            Sí, eliminar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary shadow-sm m-1"
                                            onClick={() => setPageToDelete('')}
                                        >
                                            No, cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 bg-white shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold text-green-500">Red de Páginas</h5>
                                <div className="network-container" style={{ overflow: 'auto' }}>
                                    <Network pages={pages} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GeminiComponent
                    pages={pages}
                    pageRank={pageRank}
                />
            </div>
        </>
    );
};

export default PageRankApp;