import { preguntas } from "../data/preguntas";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./Resultado.css";

import { useEffect } from "react";

function Resultado({ nombre, puntaje, respuestas }) {
  const estaInvitado = puntaje >= 2;

  const mensajeFinal =
    puntaje === preguntas.length
      ? `¡Wauw ${nombre}! Me conocés mejor que nadie 🧠💖`
      : estaInvitado
      ? `${nombre}, contestaste ${puntaje} de ${preguntas.length} 🎉 ¡Te espero en la fiesta!`
      : `Uhh ${nombre}... contestaste solo ${puntaje} 😅 Pero igual estás invitado 😜`;

  useEffect(() => {
    const enviarDatos = async () => {
      try {
        await fetch(`${BACKEND_URL}/api/participantes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            puntaje,
            respuestas,
          }),
        });
        console.log("✅ Datos enviados al backend");
      } catch (error) {
        console.error("❌ Error al enviar los datos:", error);
      }
    };

    enviarDatos();
  }, [nombre, puntaje, respuestas]);

  return (
    <div className="resultado">
      <h2>🎉 ¡Estás invitado! 🎉</h2>

      <p className="mensaje-final">{mensajeFinal}</p>

      <div className="detalles-fiesta">
        <h3>🗓️ Detalles del evento:</h3>
        <p>
          <strong>📍 Lugar:</strong> Salón Luna, Av. Principal 123
        </p>
        <p>
          <strong>🕒 Fecha:</strong> Sábado 20 de septiembre, 21:00 hs
        </p>
        <p>
          <strong>🎽 Dresscode:</strong> Ropa elegante pero cómoda 😉
        </p>
      </div>

      <a
        href={`https://wa.me/549XXXXXXXXXX?text=Hola! Soy ${nombre}, confirmo que voy al cumple de Valen 🎉`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
      >
        ✅ Confirmar asistencia por WhatsApp
      </a>

      <h3>🧠 Tus respuestas:</h3>
      <ul className="respuestas">
        {respuestas.map((r, idx) => (
          <li key={idx}>
            <strong>{r.pregunta}</strong>
            <br />
            Elegiste: {r.elegida} {r.esCorrecta ? "✅" : "❌"}
            <br />
            Correcta: {r.correcta}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resultado;
