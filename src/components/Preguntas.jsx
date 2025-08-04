import { useState } from "react";
import { preguntas } from "../data/preguntas";

function Preguntas({ onFinalizar }) {
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const preguntaActual = preguntas[indice];

  const manejarRespuesta = (opcion) => {
    const esCorrecta = opcion === preguntaActual.correcta;

    if (esCorrecta) {
      setPuntaje(puntaje + 1);
    }

    const nuevaRespuesta = {
      pregunta: preguntaActual.texto,
      elegida: opcion,
      correcta: preguntaActual.correcta,
      esCorrecta,
    };

    setRespuestas([...respuestas, nuevaRespuesta]);

    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      onFinalizar(puntaje + (esCorrecta ? 1 : 0), [
        ...respuestas,
        nuevaRespuesta,
      ]);
    }
  };

  return (
    <div className="preguntas">
      <h2>{preguntaActual.texto}</h2>
      <ul>
        {preguntaActual.opciones.map((opcion, idx) => (
          <li key={idx}>
            <button onClick={() => manejarRespuesta(opcion)}>{opcion}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Preguntas;
