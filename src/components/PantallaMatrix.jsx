import { useEffect, useRef } from "react";
import "./PantallaMatrix.css";

function PantallaMatrix({ onFinalizar }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letras = "01";
    const fontSize = 16;
    const columnas = canvas.width / fontSize;
    const gotas = Array(Math.floor(columnas)).fill(1);

    const dibujar = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < gotas.length; i++) {
        const texto = letras[Math.floor(Math.random() * letras.length)];
        ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

        if (gotas[i] * fontSize > canvas.height && Math.random() > 0.975) {
          gotas[i] = 0;
        }

        gotas[i]++;
      }
    };

    const interval = setInterval(dibujar, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onFinalizar();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinalizar]);

  return <canvas ref={canvasRef} className="pantalla-matrix" />;
}

export default PantallaMatrix;
