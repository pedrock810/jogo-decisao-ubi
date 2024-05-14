import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './style/Admin.css';

function Admin({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="admin-container">
            <button className="menu-toggle" onClick={toggleMenu}>
                <span className="menu-icon"></span>
            </button>
            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <h2>Admin Menu</h2>
                <ul>
                    <li><Link to="/admin">Página Inicial</Link></li>
                    <li><Link to="/admin/users">Gerenciar Usuários</Link></li>
                    <li><Link to="/admin/answers">Gerenciar Perguntas</Link></li>
                    <li><Link to="/admin/rewards">Gerenciar Recompensas</Link></li>
                    <li><button className="logout-btn" onClick={handleLogout}>Sair</button></li>
                </ul>
            </div>
            <div className="content">
                <h1>Bem vindo ao Backoffice!</h1>
                <p>Aqui você pode gerenciar usuários e perguntas do sistema.</p>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
