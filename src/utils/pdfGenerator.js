import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadSummaryPDF = async (pages, pageRank) => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Crear un nuevo PDF en formato A4
    const margin = 10; // Márgenes del PDF
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Ancho útil de la página

    // 1. Agregar el título
    pdf.setFontSize(18);
    pdf.text('Resumen de PageRank y Estructura de la Red', margin, margin + 10);

    // 2. Agregar los valores de PageRank
    pdf.setFontSize(12);
    let yPos = margin + 20;
    pdf.text('Valores de PageRank:', margin, yPos);
    yPos += 10;
    Object.entries(pageRank).forEach(([page, rank]) => {
        pdf.text(`${page}: ${rank.toFixed(4)}`, margin, yPos);
        yPos += 10;
    });

    // 3. Capturar el SVG de la red de nodos
    const networkElement = document.querySelector('.network-container');
    if (networkElement) {
        const canvas = await html2canvas(networkElement);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', margin, yPos, pageWidth, 100); // Ajusta el tamaño de la imagen
        yPos += 110; // Ajusta la posición Y para el siguiente contenido
    }

    // 4. Agregar la información proporcionada por la IA
    const aiInfoElement = document.querySelector('.gemini-component');
    if (aiInfoElement) {
        const canvas = await html2canvas(aiInfoElement);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', margin, yPos, pageWidth, 100); // Ajusta el tamaño de la imagen
    }

    // 5. Guardar el PDF
    pdf.save('resumen_pagerank.pdf');
};