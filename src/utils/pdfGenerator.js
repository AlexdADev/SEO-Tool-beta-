import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadSummaryPDF = async (pages, pageRank) => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Crear un nuevo PDF en formato A4
    const margin = 15; // Márgenes del PDF
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Ancho útil de la página
    let yPos = margin; // Posición Y inicial

    // Configuración de estilos
    const titleStyle = { fontSize: 18, fontStyle: 'bold', textColor: [0, 100, 0] }; // Verde oscuro
    const subtitleStyle = { fontSize: 14, fontStyle: 'bold', textColor: [0, 150, 0] }; // Verde medio
    const bodyStyle = { fontSize: 12, fontStyle: 'normal', textColor: [0, 0, 0] }; // Negro
    const referenceStyle = { fontSize: 12, fontStyle: 'italic', textColor: [0, 0, 255] }; // Azul para referencias
    const tableHeaderStyle = { fontSize: 12, fontStyle: 'bold', textColor: [255, 255, 255], fillColor: [0, 100, 0] }; // Fondo verde oscuro, texto blanco
    const tableRowStyle = { fontSize: 12, fontStyle: 'normal', textColor: [0, 0, 0] }; // Negro

    // Función para agregar texto con estilos
    const addText = (text, x, y, style) => {
        pdf.setFontSize(style.fontSize);
        pdf.setFont('helvetica', style.fontStyle);
        pdf.setTextColor(...style.textColor);
        pdf.text(text, x, y);
    };

    // 1. Agregar el título
    addText('Resumen de PageRank y Estructura de la Red', margin, yPos, titleStyle);
    yPos += 10;

    // 2. Agregar los valores de PageRank en una tabla
    addText('Valores de PageRank:', margin, yPos, subtitleStyle);
    yPos += 10;

    // Crear la tabla
    const columns = ['Página', 'PageRank'];
    const rows = Object.entries(pageRank).map(([page, rank]) => [page, rank.toFixed(4)]);

    // Encabezados de la tabla
    pdf.setFillColor(...tableHeaderStyle.fillColor);
    pdf.setTextColor(...tableHeaderStyle.textColor);
    pdf.setFontSize(tableHeaderStyle.fontSize);
    pdf.setFont('helvetica', tableHeaderStyle.fontStyle);
    pdf.rect(margin, yPos, pageWidth, 10, 'F'); // Fondo verde
    pdf.text(columns[0], margin + 2, yPos + 7);
    pdf.text(columns[1], margin + 100, yPos + 7);
    yPos += 10;

    // Filas de la tabla
    pdf.setFontSize(tableRowStyle.fontSize);
    pdf.setFont('helvetica', tableRowStyle.fontStyle);
    pdf.setTextColor(...tableRowStyle.textColor);
    rows.forEach((row) => {
        pdf.text(row[0], margin + 2, yPos + 7); // Nombre de la página
        pdf.text(row[1], margin + 100, yPos + 7); // Valor de PageRank
        yPos += 10;
    });

    yPos += 10; // Espacio después de la tabla

    

    // 4. Agregar la información proporcionada por la IA como texto
    const aiInfoElement = document.querySelector('.gemini-component');
    if (aiInfoElement) {
        addText('Información Proporcionada por la IA:', margin, yPos, subtitleStyle);
        yPos += 10;

        const aiText = aiInfoElement.innerText || aiInfoElement.textContent;
        const lines = pdf.splitTextToSize(aiText, pageWidth); // Divide el texto en líneas que caben en el ancho de la página

        // Agregar el texto línea por línea
        lines.forEach((line) => {
            if (yPos > pdf.internal.pageSize.getHeight() - margin) {
                pdf.addPage(); // Agregar una nueva página si no cabe
                yPos = margin;
            }
            addText(line, margin, yPos, bodyStyle); // Texto normal
            yPos += 10;
        });

    }
    // 3. Capturar el SVG de la red de nodos como imagen
    const networkElement = document.querySelector('.network-container');
    if (networkElement) {
        addText('Simulación de la Red de Nodos:', margin, yPos, subtitleStyle);
        yPos += 10;

        const canvas = await html2canvas(networkElement);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Verificar si la imagen cabe en la página actual
        if (yPos + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage(); // Agregar una nueva página si no cabe
            yPos = margin;
        }

        pdf.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 10;
    }

    // 5. Guardar el PDF
    pdf.save('resumen_pagerank.pdf');
};