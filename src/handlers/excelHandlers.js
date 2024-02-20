const { generateExcelUser, 
  generateExcelIncomes,
  generateExcelBookings,
  generateExcelRankings } = require('../controllers/excelControllers');

const generateExcelUserHandler = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const file = await generateExcelUser(start_date, end_date);
    res.set({
      'Content-Type': `${ file.mimeType  }`,
      'Content-Disposition': `attachment; filename="${file.originalName}"`
    });
    res.send(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el archivo Excel' });
  }
};

const generateExcelIncomesHandler = async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const file = await generateExcelIncomes(start_date, end_date);
    res.set({
      'Content-Type': `${ file.mimeType  }`,
      'Content-Disposition': `attachment; filename="${file.originalName}"`
    });
    res.send(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el archivo Excel' });
  }
}

const generateExcelBookingsHandler = async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const file = await generateExcelBookings(start_date, end_date);
    res.set({
      'Content-Type': `${ file.mimeType  }`,
      'Content-Disposition': `attachment; filename="${file.originalName}"`
    });
    res.send(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el archivo Excel' });
  }
}

const generateExcelRankingsHandler = async (req, res) => {
  const { start_date, end_date } = req.query;
  try {
    const file = await generateExcelRankings(start_date, end_date);
    res.set({
      'Content-Type': `${ file.mimeType  }`,
      'Content-Disposition': `attachment; filename="${file.originalName}"`
    });
    res.send(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el archivo Excel' });
  }
}
module.exports = {
  generateExcelUserHandler,
  generateExcelIncomesHandler,
  generateExcelBookingsHandler,
  generateExcelRankingsHandler
};  
