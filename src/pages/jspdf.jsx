import { jsPDF } from 'jspdf';

const exportToPDF = () => {
  const doc = new jsPDF();
  screenshots.forEach((screenshot, index) => {
    doc.text(`Category: ${screenshot.category}`, 10, 10 + index * 20);
    doc.addImage(screenshot.url, 'JPEG', 10, 20 + index * 20, 50, 50);
    doc.text(`Uploaded: ${screenshot.date}`, 70, 20 + index * 20);
  });
  doc.save('screenshots.pdf');
};

<button onClick={exportToPDF}>Export as PDF</button>
