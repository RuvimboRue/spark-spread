// excelUtils.js

import XLSX from 'xlsx';

// Function to read Excel data
export const readExcelData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      resolve(data);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
