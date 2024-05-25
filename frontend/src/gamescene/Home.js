import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home({ userName, setIsLoggedIn, userId }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>Bem-vindo, {userName}!</h1>
            <div style={{ marginTop: "20px" }}>
                <Link to="/start-game" state={{ userId: userId }}>
                    <button style={buttonStyle}>Iniciar Jogo</button>
                </Link>
                <Link to="/ranking">
                    <button style={buttonStyle}>Ranking dos Jogadores</button>
                </Link>
                <Link to="/rewards" state={{ userId: userId }}>
                    <button style={buttonStyle}>Recompensas</button>
                </Link>
                <Link to="/user-rewards"> {/* Link para UserRewards */}
                    <button style={buttonStyle}>Suas Recompensas</button>
                </Link>
                <Link to="/tutorial">
                    <button style={buttonStyle}>Tutorial e Regras</button>
                </Link>
                <button style={logoutButtonStyle} onClick={handleLogout}>Sair</button>
            </div>
        </div>
    );
}

const buttonStyle = {
    marginRight: "10px",
    marginBottom: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#14233b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const logoutButtonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

export default Home;
