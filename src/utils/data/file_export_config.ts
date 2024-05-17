import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
import Papa from "papaparse";

export const ExportConfig = {
  init: [] as any[],
  fileName: "output.csv",
  // fileType: "xlsx" as string | "jspdf",

  // exportToExcel() {
  //   const worksheet = XLSX.utils.json_to_sheet(ExportConfig.init);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "output.xlsx");
  // },

  exportToCSV: () => {
    const csv = Papa.unparse(ExportConfig.init);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, ExportConfig.fileName);
  },
};
