import { useEffect } from "react";
import "./ConfirmacionFinal.css";
import robotGif4 from "../assets/robot4.gif";

function ConfirmacionFinal({ nombre, dijoQueSi, onContinuar }) {
  useEffect(() => {
    const mensajeSi = `¡Sabía que podía confiar en vos! Pero para comprobar tu amistad, tenés que superar una trivia...!`;
    const mensajeNo = `Ups... no esperaba eso. Pero todo se puede remediar... te invito a un desafío que podría cambiarlo todo.`;

    const mensaje = dijoQueSi ? mensajeSi : mensajeNo;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(mensaje);
    utter.lang = "es-AR";
    utter.rate = 1.1;
    window.speechSynthesis.speak(utter);
  }, [nombre, dijoQueSi]);

  return (
    <div className="confirmacion-final">
      <img src={robotGif4} alt="Botsi pensando" className="robot-ia" />

      <div className="mensaje-final">
        {dijoQueSi ? (
          <p>
            ¡Sabía que podía confiar en vos! Pero para comprobar tu amistad,
            tenés que superar una trivia...
          </p>
        ) : (
          <p>
            Ups... no esperaba eso. Pero todo se puede remediar... te invito a
            un desafío que podría cambiarlo todo.
          </p>
        )}

        <button
          onClick={() => {
            window.speechSynthesis.cancel();
            onContinuar();
          }}
        >
          ¡Dale, vamos!
        </button>
      </div>
    </div>
  );
}

export default ConfirmacionFinal;
