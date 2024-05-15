import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Tutorial = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line
    const location = useLocation();

    const handleExitGame = () => {
        navigate('/home');
    };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className="exit-button" onClick={handleExitGame} style={{ position: 'absolute', top: '10px', left: '10px' }}>Sair do Jogo</button>
        <h2>Tutorial</h2>
        <p>Bem-vindo ao tutorial do Jogo de Decisão da Universidade da Beira Interior!</p>
    </div>
  );
};

export default Tutorial;