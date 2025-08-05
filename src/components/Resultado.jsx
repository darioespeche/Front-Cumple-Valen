import { preguntas } from "../data/preguntas";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
      <h2>Resultado final</h2>
      <p>{mensajeFinal}</p>

      <h3>Tus respuestas:</h3>
      <ul>
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
