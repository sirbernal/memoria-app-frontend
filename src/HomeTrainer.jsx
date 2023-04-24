import React from 'react';
import './home.css';
import { useState } from 'react';

function HomeTrainer() {
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Sesión de entrenamiento 1', description: 'Descripción de la sesión 1' },
    { id: 2, title: 'Sesión de entrenamiento 2', description: 'Descripción de la sesión 2' },
    { id: 3, title: 'Sesión de entrenamiento 3', description: 'Descripción de la sesión 3' },
  ]);

  const [activeSession, setActiveSession] = useState(null);

  const handleSessionClick = (id) => {
    setActiveSession(id === activeSession ? null : id);
  };

  return (
    <div>
      <div>
        <h1>Bienvenido entrenador: </h1>
        <ul>
          {sessions.map((session) => (
            <li key={session.id} onClick={() => handleSessionClick(session.id)} style={{ cursor: 'pointer' }}>
              {session.title}
              {session.id === activeSession && <p>{session.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeTrainer;