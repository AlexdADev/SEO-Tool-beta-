import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactMarkdown from 'react-markdown';

function GeminiComponent({ pages, pageRank }) {
    const [answers, setAnswers] = useState([]);
    const [generate, setGenerate] = useState(false);
    ///////////Recuerda eliminar la apikey

    useEffect(() => {
        if (generate) {
            generateAnswer();
        }
    }, [generate, pages, pageRank]);

    async function generateAnswer() {
        setAnswers((prevAnswers) => [...prevAnswers, 'Loading ...']);
        const response = await axios({
            method: 'post',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDWnCjjcKfxA6ze48_oWZtAppC1uISYyNw`,
            data: {
                "contents": [{
                    "parts": [
                        {
                            "text": `### Análisis de Red de Páginas  
                    Se ha detectado una estructura de red con las siguientes páginas:  
                    📌 **Páginas:** ${Object.keys(pages).join(', ')}  
                    🔗 **Enlaces entre páginas:** ${Object.keys(pages).map((page) => pages[page].join(', ')).join(', ')}  
                    
                    📊 **Valores de PageRank:**  
                    ${Object.entries(pageRank).map(([page, rank]) => `- ${page}: ${rank.toFixed(4)}`).join('\n')}
                    
                    ### **Instrucciones:**  
                    Genera una crítica detallada sobre la estructura de la red, identificando posibles problemas en la distribución de PageRank y sugerencias para mejorar la conectividad y la eficiencia del flujo de autoridad entre páginas.  
                    Proporciona recomendaciones claras y prácticas para optimizar la red.  
                    
                    ### **Enlaces entre páginas:**  
                    ${Object.keys(pages).map((page) => `- ${page}: ${pages[page].join(', ')}`).join('\n')}`
                        }
                    ]
                }]
            }
        });

        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[newAnswers.length - 1] = response['data']['candidates'][0]['content']['parts'][0]['text'];
            return newAnswers;
        });
    }

    return (
        <div className="container-fluid bg-dark-95 p-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-5 mb-5 text-green-500 font-weight-bold">Análisis de la Red de Páginas IA</h1>
                    <p className="text-center mb-5 text-gray-600">
                        "Análisis de la red de páginas: identificar oportunidades de mejora y optimizar la estructura de la web"
                    </p>
                </div>
            </div>
            <div className="row">
                <div >
                    <div className="card border-0 bg-white shadow-sm h-100">
                        <div className="card-body d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-green-500 shadow-sm btn-sm"
                                onClick={() => setGenerate(true)}
                            >
                                Sugerencias
                            </button>
                        </div>
                        <div className="card-body overflow-auto">
                            <h5 className="card-title font-weight-bold text-green-500">Resultados del Análisis</h5>
                            <hr/>
                            {answers.map((answer, index) => (
                                <div key={index}>
                                    <ReactMarkdown children={answer} />
                                    {index < answers.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeminiComponent;