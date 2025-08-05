import "./ConfirmarAmistad.css";
import { useEffect, useState } from "react";
import robotGif2 from "../assets/robot2.gif";

function ConfirmarAmistad({ nombre, onRespuesta }) {
  const partes = [
    `Genial, ${nombre}! Justo te estaba buscando...`,
    `Valen me habló mucho de vos.`,
    `Pero antes de decirte dónde será la fiesta, necesito hacerte una pregunta...`,
    `Valen me dijo que sos uno de sus amigos más importantes.`,
    `¿Vos también lo sentís así?`,
  ];

  const [index, setIndex] = useState(0);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  useEffect(() => {
    if (index < partes.length) {
      const utter = new SpeechSynthesisUtterance(partes[index]);
      utter.lang = "es-AR";
      utter.rate = 1.1;

      utter.onend = () => {
        setTimeout(() => {
          setIndex((prev) => prev + 1);
        }, 300);
      };

      window.speechSynthesis.speak(utter);
    } else {
      setMostrarOpciones(true);
    }
  }, [index]);

  const opciones = [
    "Sí, ¡es un gran amigo! 💖",
    "La verdad que no tanto... 😅",
  ];

  return (
    <div className="confirmar-amistad">
      <img src={robotGif2} alt="Asistente" className="robot-ia" />

      <div className="mensaje-amistad">
        {partes.slice(0, index).map((frase, i) => (
          <p key={i}>{frase}</p>
        ))}

        {mostrarOpciones && (
          <div className="opciones">
            {opciones.map((texto, idx) => (
              <button
                key={idx}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  onRespuesta(idx === 0);
                }}
              >
                {texto}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmarAmistad;
