import { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import { formatDate } from "../utils";
import { addToast } from "@heroui/toast";

export function useExcel<T>(data: () => Promise<T> | T) {
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  const exportToExcel = useCallback(
    async (excelDataFactory: (data: T) => Array<any>, fileName: string) => {
      setIsGeneratingExcel(true);

      try {
        const finalData = typeof data === "function" ? await data() : data;

        const excelData = excelDataFactory(finalData);

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        const columnWidths = Object.keys(excelData[0]).map((key) => {
          const maxLength = Math.max(
            key.length,
            ...excelData.map((item: any) =>
              item[key] ? item[key].toString().length : 0,
            ),
          );
          return { wch: maxLength + 4 };
        });

        worksheet["!cols"] = columnWidths;

        const rtlStyle = {
          alignment: {
            readingOrder: 2,
            textRotation: 0,
            vertical: "center",
            horizontal: "right",
          },
        };

        for (const cell in worksheet) {
          if (worksheet[cell] && cell[0] !== "!") {
            worksheet[cell].s = rtlStyle;
          }
        }

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelName = `${fileName}-${formatDate(new Date().toISOString())}`;

        XLSX.writeFile(workbook, `${excelName}.xlsx`, {
          bookType: "xlsx",
          type: "binary",
          cellStyles: true,
          compression: true,
        });

        setIsGeneratingExcel(false);
      } catch (error) {
        addToast({
          title: "مشکلی در ایجاد فایل اکسل پیش آمده",
          color: "danger",
        });

        setIsGeneratingExcel(false);
      }
    },
    [data, XLSX],
  );

  return {
    exportToExcel,
    isGeneratingExcel,
  };
}
