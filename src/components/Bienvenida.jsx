import { useState, useEffect } from "react";
import PantallaMatrix from "./PantallaMatrix";
import "./Bienvenida.css";
import { Howl } from "howler";
import robotGif from "../assets/robot.gif";
import sonidoClick from "../assets/click.mp3";
import inicio from "../assets/sonido-inicio.mp3";

function Bienvenida({ onComenzar }) {
  const [mostrarMatrix, setMostrarMatrix] = useState(true);

  const [nombre, setNombre] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [mensajes, setMensajes] = useState([
    "Desbloqueando acceso confidencial...",
    "Iniciando protocolo de cumpleaños ",
    "Escaneando invitados destacados...",
    "¡Uy! ¡Te encontré! ",
    "Soy Botsi, el asistente personal de Valen.",
    "Antes de seguir, ¿cómo te llamás?",
  ]);
  const sonido = new Howl({
    src: [sonidoClick],
    volume: 0.5,
  });
  const [mensajeIndex, setMensajeIndex] = useState(0);

  useEffect(() => {
    if (mostrarMatrix) {
      const bootSound = new Howl({
        src: inicio,
        volume: 0.4,
      });
      bootSound.play();
    }
  }, [mostrarMatrix]);

  useEffect(() => {
    if (!mostrarMatrix && mensajeIndex < mensajes.length && !finalizado) {
      const mensaje = mensajes[mensajeIndex];
      const utterance = new SpeechSynthesisUtterance(mensaje);
      utterance.lang = "es-AR";
      utterance.rate = 1.1;
      utterance.pitch = 1;

      utterance.onend = () => {
        if (mensajeIndex < mensajes.length - 1) {
          setTimeout(() => {
            setMensajeIndex((prev) => prev + 1);
          }, 300);
        } else {
          setFinalizado(true);
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [mensajeIndex, mostrarMatrix, finalizado]);

  const manejarClick = () => {
    if (nombre.trim()) {
      sonido.play();
      onComenzar(nombre.trim());
    }
  };

  if (mostrarMatrix) {
    return <PantallaMatrix onFinalizar={() => setMostrarMatrix(false)} />;
  }

  return (
    <div className="bienvenida">
      <section>
        <img
          src={robotGif}
          alt="Asistente Virtual de Valen"
          className="robot-ia"
        />
      </section>

      <div className="pantalla-ia">
        <p className="mensaje">{mensajes[mensajeIndex]}</p>

        {mensajeIndex === mensajes.length - 1 && (
          <>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribí tu nombre..."
            />
            <button
              onClick={() => {
                sonido.play();
                manejarClick();
              }}
            >
              Comenzar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Bienvenida;
