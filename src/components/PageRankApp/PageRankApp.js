import React, { useState, useEffect } from 'react';
import AddPageForm from './AddPageForm';
import PageList from './PageList';
import PageRankResults from './PageRankResults';
import NetworkVisualization from './NetworkVisualization';
import GeminiComponent from '../GeminiComponent/GeminiComponent';
import calculatePageRank from '../../utils/calculatePageRank';
import { downloadSummaryPDF } from '../../utils/pdfGenerator';
import './style/PageRankApp.css';

const PageRankApp = () => {
    const [pages, setPages] = useState({});
    const [pageRank, setPageRank] = useState({});

    useEffect(() => {
        const updatedPageRank = calculatePageRank(pages);
        setPageRank(updatedPageRank);
    }, [pages]);

    // Función para editar una página
    const handleEditPage = (oldPageName, newPageName) => {
        const updatedPages = { ...pages };

        // Actualizar el nombre de la página
        updatedPages[newPageName] = updatedPages[oldPageName];
        delete updatedPages[oldPageName];

        // Actualizar los enlaces internos
        Object.keys(updatedPages).forEach(page => {
            updatedPages[page] = updatedPages[page].map(link =>
                link === oldPageName ? newPageName : link
            );
        });

        setPages(updatedPages);
    };

    return (
        <div className="container-fluid bg-dark-95 p-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-5 mb-5 text-green-500 font-weight-bold">Simulador de PageRank</h1>
                    <p className="text-center text-gray-600">La finalidad de esta herramienta es simular la estructura de enlaces internos de un sitio web y calcular el PageRank de cada página. Esto permite a los especialistas en SEO identificar oportunidades de mejora en la estructura de enlaces y optimizar la autoridad de las páginas.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <AddPageForm pages={pages} setPages={setPages} />
                    <PageList pages={pages} setPages={setPages} onEditPage={handleEditPage} />
                    <PageRankResults pageRank={pageRank} />
                </div>
                <div className="col-md-6">
                    <NetworkVisualization pages={pages} />
                </div>
            </div>
            <GeminiComponent pages={pages} pageRank={pageRank} />
            <div className="text-center mt-5">
                <button
                    className="btn btn-green-500 shadow-sm"
                    onClick={() => downloadSummaryPDF(pages, pageRank)}
                >
                    Descargar Resumen en PDF
                </button>
            </div>
        </div>
    );
};

export default PageRankApp;