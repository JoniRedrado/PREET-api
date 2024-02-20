const excel = require('exceljs');
const { metricUsers, 
  metricIncomesHotels, 
  metricBookingsHotels,
  metricRanking } = require('./metricsControllers');

const headerStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF00' } 
  },
  border: {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  }
};

const generateExcelUser = async (start_date, end_date) => {
  const userMetrics = await metricUsers(start_date, end_date);

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('User Metrics');

  worksheet.columns = [
    { header: 'Nationality', key: 'nationality', width: 20 },
    { header: 'User Count', key: 'user_count', width: 20 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    Object.assign(cell, headerStyle);
  });

  userMetrics
  .filter(metric => metric.dataValues.nationality)
  .forEach(metric => {
    worksheet.addRow({
      nationality: metric.dataValues.nationality,
      user_count: metric.dataValues.user_count
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const nativeBuffer = Buffer.from(buffer);

  const file = {
    originalName: `Number User By Nationality${start_date}-${end_date}.xlsx`,
    buffer: nativeBuffer,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fieldName: `file`,
    encoding: "utf-8",
    size: nativeBuffer.BYTES_PER_ELEMENT * nativeBuffer.length,
    stream: null,
    destination: "",
    fileName: `User reports.xlsx`,
    path: "",
  };

  return file;
};
const generateExcelIncomes = async (start_date, end_date) => {

  const incomesMetrics = await metricIncomesHotels(start_date, end_date);

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Incomes Metrics');

  worksheet.columns = [
    { header: 'Hotel', key: 'name', width: 40},
    { header: 'Incomes', key: 'incomes', width: 20 },
    { header: 'Net Incomes', key: 'net_incomes', width: 20 },
    { header: 'Hotel Id', key: 'id', width: 20 },
  ]
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    Object.assign(cell, headerStyle);
  });

  incomesMetrics
  .filter(metric => metric.dataValues.id)
  .forEach(metric => {
    console.log(metric.dataValues);
    worksheet.addRow({
      name: metric.dataValues.name,
      incomes: metric.dataValues.incomes +" USD",
      net_incomes: metric.dataValues.net_incomes +" USD",
      id: metric.dataValues.id,
    });
  })

const buffer = await workbook.xlsx.writeBuffer();
const nativeBuffer = Buffer.from(buffer);

const file = {
  originalName: `Incomes Metrics ${start_date}-${end_date}.xlsx`,
  buffer: nativeBuffer,
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  fieldName: `file`,
  encoding: "utf-8",
  size: nativeBuffer.BYTES_PER_ELEMENT * nativeBuffer.length,
  stream: null,
  destination: "",
  fileName: `Incomes reports.xlsx`,
  path: "",
}
return file;
}

const generateExcelBookings = async (start_date, end_date) => {

  const bookingsMetrics = await metricBookingsHotels(start_date, end_date);

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Bookings Metrics');

  worksheet.columns = [
    { header: 'Hotel', key: 'name', width: 40},
    { header: '# Bookings', key: 'total_bookings', width: 20 },
    { header: 'Hotel Id', key: 'id', width: 20 },
  ]
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    Object.assign(cell, headerStyle);
  });

  bookingsMetrics
  .filter(metric => metric.dataValues.id)
  .forEach(metric => {
    worksheet.addRow({
      name: metric.dataValues.name,
      total_bookings: metric.dataValues.total_bookings,
      id: metric.dataValues.id,
    });
  })

const buffer = await workbook.xlsx.writeBuffer();
const nativeBuffer = Buffer.from(buffer);

const file = {
  originalName: `Bookings Metrics ${start_date}-${end_date}.xlsx`,
  buffer: nativeBuffer,
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  fieldName: `file`,
  encoding: "utf-8",
  size: nativeBuffer.BYTES_PER_ELEMENT * nativeBuffer.length,
  stream: null,
  destination: "",
  fileName: `Bookings reports.xlsx`,
  path: "",
}
return file;
}

const generateExcelRankings = async (start_date, end_date) => {
  
  const rankingsMetrics = await metricRanking(start_date, end_date);

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Rankings Metrics');

  worksheet.columns = [
    { header: 'Hotel', key: 'name', width: 40},
    { header: 'Ranking', key: 'total_score', width: 20 },
    { header: 'Hotel Id', key: 'id', width: 20 },
  ]
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    Object.assign(cell, headerStyle);
  });

  rankingsMetrics
  .filter(metric => metric.dataValues.id)
  .forEach(metric => {
    worksheet.addRow({
      name: metric.dataValues.name,
      total_score: metric.dataValues.total_score,
      id: metric.dataValues.id,
    });
  })
  const buffer = await workbook.xlsx.writeBuffer();
  const nativeBuffer = Buffer.from(buffer);

  const file = {
    originalName: `Rankings Metrics ${start_date}-${end_date}.xlsx`,
    buffer: nativeBuffer,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fieldName: `file`,
    encoding: "utf-8",
    size: nativeBuffer.BYTES_PER_ELEMENT * nativeBuffer.length,
    stream: null,
    destination: "",
    fileName: `Rankings reports.xlsx`,
    path: "",
  }
  return file;
}


module.exports = {
  generateExcelUser,
  generateExcelIncomes,
  generateExcelBookings,
  generateExcelRankings
};