import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { formatDate } from "../utils";
import { addToast } from "@heroui/toast";

/**
 * A custom hook for exporting data to an Excel (.xlsx) file.
 *
 * @param data - A function that returns a promise resolving to data or the data itself.
 * @returns An object containing:
 * - `exportToExcel`: A function to generate and download an Excel file.
 * - `isGeneratingExcel`: A boolean indicating if the Excel file is currently being generated.
 */
export function useExcel<T>(data: () => Promise<T> | T) {
  // State to track whether the Excel file is being generated
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  /**
   * Generates and downloads an Excel (.xlsx) file from the provided data.
   *
   * @param excelDataFactory - A function that processes the data into an array format for Excel.
   * @param fileName - The base name for the exported file.
   */
  const exportToExcel = useCallback(
    async (excelDataFactory: (data: T) => Array<any>, fileName: string) => {
      setIsGeneratingExcel(true);

      try {
        // Fetch or use provided data
        const finalData = typeof data === "function" ? await data() : data;
        // Transform data into Excel-compatible format
        const excelData = excelDataFactory(finalData);

        // Create a worksheet from JSON data
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Adjust column widths dynamically based on content
        const columnWidths = Object.keys(excelData[0]).map((key) => {
          const maxLength = Math.max(
            key.length,
            ...excelData.map((item: any) =>
              item[key] ? item[key].toString().length : 0
            )
          );
          return { wch: maxLength + 4 };
        });

        worksheet["!cols"] = columnWidths;

        // Apply right-to-left (RTL) alignment styling
        const rtlStyle = {
          alignment: {
            readingOrder: 2, // Right-to-left text direction
            textRotation: 0,
            vertical: "center",
            horizontal: "right",
          },
        };

        // Apply RTL styles to all cells
        for (const cell in worksheet) {
          if (worksheet[cell] && cell[0] !== "!") {
            (worksheet[cell] as any).s = rtlStyle;
          }
        }

        // Create a new Excel workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Format the filename with a timestamp
        const excelName = `${fileName}-${formatDate(new Date().toISOString())}`;

        // Write and download the Excel file
        XLSX.writeFile(workbook, `${excelName}.xlsx`, {
          bookType: "xlsx",
          type: "binary",
          cellStyles: true,
          compression: true,
        });

        setIsGeneratingExcel(false);
      } catch (error) {
        // Handle errors and display a toast notification
        addToast({
          title: "مشکلی در ایجاد فایل اکسل پیش آمده",
          color: "danger",
        });

        setIsGeneratingExcel(false);
      }
    },
    [data, XLSX]
  );

  return {
    exportToExcel, // Function to trigger Excel export
    isGeneratingExcel, // Boolean indicating if the file is being generated
  };
}
