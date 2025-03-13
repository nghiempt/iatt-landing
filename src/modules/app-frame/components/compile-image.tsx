import { useEffect, useRef } from "react";

export default function ImageComposer({
  foregroundImage,
  backgroundImage,
}: {
  foregroundImage: string | null;
  backgroundImage: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawImages = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = 500;
      canvas.height = 500;

      if (backgroundImage) {
        const bgImage = new Image();
        bgImage.crossOrigin = "anonymous";
        bgImage.src = backgroundImage;

        bgImage.onload = () => {
          canvas.width = bgImage.width;
          canvas.height = bgImage.height;
          ctx.drawImage(bgImage, 0, 0);
          drawForeground();
        };

        bgImage.onerror = () => {
          console.error("Failed to load background image");
          drawForeground();
        };
      } else {
        drawForeground();
      }
    };

    const drawForeground = () => {
      if (foregroundImage) {
        const fgImage = new Image();
        fgImage.crossOrigin = "anonymous";
        fgImage.src = foregroundImage;

        fgImage.onload = () => {
          if (!backgroundImage) {
            canvas.width = fgImage.width;
            canvas.height = fgImage.height;
          }
          const fgX = (canvas.width - fgImage.width) / 2;
          const fgY = canvas.height - fgImage.height;
          ctx.drawImage(fgImage, fgX, fgY, fgImage.width, fgImage.height);
        };

        fgImage.onerror = () => {
          console.error("Failed to load foreground image");
        };
      }
    };

    drawImages();
  }, [foregroundImage, backgroundImage]);

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "new-image.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div>
      <canvas
        className="h-[500px] w-full border-2 border-white rounded-xl"
        ref={canvasRef}
      />
      {/* <button onClick={downloadImage}>Download New Image</button> */}
    </div>
  );
}
