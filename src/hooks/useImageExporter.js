import { useState, useRef, useCallback } from "react";

import html2canvas from "html2canvas";
import toast from "react-hot-toast";

export const useImageExporter = () => {
  // const [exportMode, setExportMode] = useState("widget");
  const exportRef = useRef();
  const [exporting, setExporting] = useState(false);
  const [exportedURL, setExportedURL] = useState(null);
  const [exportedFile, setExportedFile] = useState(null);

  const exportImage = (element) => {
    if (!exportRef.current) return;
    if (exporting) return;
    htmlToPng(element);
  };

  const exportRefCallback = useCallback((node) => {
    exportRef.current = node;
    exportImage(node);
  }, []);

  const htmlToPng = async (element) => {
    if (!element) return;

    try {
      setExportedURL(null);
      setExportedFile(null);
      setExporting(true);

      const width = element.clientWidth;
      const height = element.clientHeight;

      const canvas = await html2canvas(element, {
        height,
        width,
        backgroundColor: null,
        useCORS: true,
      });

      // document.body.appendChild(canvas);

      // let a = document.createElement("a");
      // a.download = `inbox-${exportMode}-${inboxId}.png`;

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const file = new File([blob], 'image.png', { type: "image/png" });
        // a.href = url;
        // a.click();
        setExportedURL(url);
        setExportedFile(file);
      });
    } catch (err) {
      toast("Export failed", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return { exportRefCallback, exportImage, exportedURL, exportedFile };
};
