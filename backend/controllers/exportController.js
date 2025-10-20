const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generatePdfAndSend = async (historyItem, res) => {
  const doc = new PDFDocument();
  const filename = `report_${historyItem._id}.pdf`;
  const reportsDir = path.join(__dirname, '..', 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const filePath = path.join(reportsDir, filename);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text('LIFELOOP Simulation Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Simulation Name: ${historyItem.simulationName || ''}`);
  doc.text(`Risk Level: ${historyItem.riskLevel || ''}`);
  doc.text(`Event Type: ${historyItem.eventType || ''}`);
  doc.text(`File: ${historyItem.fileName || ''}`);
  doc.text(`Total Transactions: ${historyItem.totalTransactions || 0}`);
  doc.moveDown();
  doc.text('Result:', { underline: true });
  doc.moveDown(0.5);
  const result = historyItem.result || {};
  Object.keys(result).forEach((k) => {
    doc.text(`${k}: ${JSON.stringify(result[k])}`);
  });

  doc.end();

  stream.on('finish', () => {
    res.download(filePath, filename, (err) => {
      if (err) console.error('Download error', err);
      // optional: cleanup after sending
      // fs.unlinkSync(filePath);
    });
  });
};
