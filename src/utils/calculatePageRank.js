const calculatePageRank = (pages, iterations = 100, dampingFactor = 0.85) => {
    const pageRank = {};
    const numPages = Object.keys(pages).length;
  
    // Inicializar PageRank: asignar a cada página un valor inicial de 1/número de páginas
    for (const page in pages) {
      pageRank[page] = 1 / numPages;
    }
  
    // Realizar múltiples iteraciones para calcular el PageRank
    for (let i = 0; i < iterations; i++) {
      const newPageRank = {};
  
      // Calcular el nuevo PageRank para cada página
      for (const page in pages) {
        // Comenzar con el factor de amortiguamiento
        newPageRank[page] = (1 - dampingFactor) / numPages;
  
        // Sumar contribuciones de otras páginas que enlazan a esta página
        for (const otherPage in pages) {
          // Verificar si 'otherPage' enlaza a 'page'
          if (pages[otherPage].includes(page)) {
            // Actualizar el PageRank basado en el PageRank de 'otherPage' y su número de enlaces salientes
            newPageRank[page] += dampingFactor * (pageRank[otherPage] / pages[otherPage].length);
          }
        }
      }
  
      // Actualizar el PageRank con los nuevos valores calculados
      Object.assign(pageRank, newPageRank);
    }
  
    // Devolver el PageRank final de todas las páginas
    return pageRank;
  };
  
  export default calculatePageRank;