// @ts-ignore
import html2pdf from 'html2pdf.js';

export interface PDFGlobalOptions {
  filename?: string;
  margin?: number | [number, number, number, number];
}

export const generatePDFFromElement = async (
  element: HTMLElement, 
  options?: PDFGlobalOptions
): Promise<void> => {
  const opt = {
    margin: options?.margin || [15, 15, 15, 15],
    filename: options?.filename || 'saju_report.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  await html2pdf().set(opt).from(element).save();
};
