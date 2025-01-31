import React, { useState, useEffect } from 'react';
import Network from './Network';
import calculatePageRank from '../utils/calculatePageRank';
import './estilos.css'
import GeminiComponent from './new/GeminiComponent';

//Este componente PageRankApp es una aplicación React que simula el algoritmo PageRank 
// para calcular la importancia de páginas (o nodos) en una red de enlaces.
//  La aplicación permite a los usuarios agregar páginas,
//  definir sus enlaces salientes y visualizar el ranking de 
// importancia de cada página, así como una representación gráfica de la red de páginas.

const PageRankApp = () => {
    const [pages, setPages] = useState({});
    const [newPage, setNewPage] = useState('');
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [pageRank, setPageRank] = useState({});

    // Efecto para calcular el ranking de las páginas cuando cambia el estado de las páginas
    useEffect(() => {
        // Calcula el ranking de las páginas utilizando la función calculatePageRank
        const updatedPageRank = calculatePageRank(pages);

        // Actualiza el estado del ranking de las páginas
        setPageRank(updatedPageRank);
    }, [pages]); // Dependencia del efecto: cuando cambia el estado de las páginas

    // Sección de gestión de eventos
    const handleAddPage = () => {
        // Verifica si se ha ingresado un nombre para la nueva página
        if (newPage) {
            // Crea una copia del estado de las páginas
            const updatedPages = { ...pages };

            // Agrega la nueva página al estado de las páginas
            updatedPages[newPage] = selectedLinks;

            // Actualiza el estado de las páginas
            setPages(updatedPages);

            // Resetea el estado del nombre de la nueva página
            setNewPage('');

            // Resetea el estado de los enlaces seleccionados
            setSelectedLinks([]);
        }
    };

    // Ordena el ranking de las páginas en orden descendente
    const sortedPageRank = Object.entries(pageRank).sort((a, b) => b[1] - a[1]);
    return (
        // Sección de título y descripción
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
                                            placeholder="Nombre de la página"
                                            value={newPage}
                                            onChange={(e) => setNewPage(e.target.value)}
                                        />
                                    </div>
                                    {Object.keys(pages).length > 0 && (
                                        <div className="form-group">
                                            <label className="text-gray-600">Enlaces seleccionados</label>
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
                                        </li>
                                    ))}
                                </ul>
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
                    selectedLinks={selectedLinks}
                />
            </div>
        </>
    );
};

export default PageRankApp;