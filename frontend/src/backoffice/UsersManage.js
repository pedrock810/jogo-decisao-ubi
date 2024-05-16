import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './style/Admin.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function UsersManage({ setIsLoggedIn }) {
    const [data, setData] = useState([]);
     // eslint-disable-next-line
    const [editingUser, setEditingUser] = useState(null);
    const [editedUserInfo, setEditedUserInfo] = useState({
        id: '',
        name: '',
        email: '',
        isAdmin: false
    });
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        fetch('https://jogo-decisao-backend.onrender.com/admin/users')
        //fetch('http://localhost:3306/admin/users')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditedUserInfo({
            id: user.id,
            name: user.nome,
            email: user.email,
            isAdmin: user.isAdmin
        });
        setOpenEditModal(true);
    };

    const handleSave = (event) => {
        event.preventDefault();
        axios.put(`https://jogo-decisao-backend.onrender.com/admin/users/${editedUserInfo.id}`, editedUserInfo)
        //axios.put(`http://localhost:3306/admin/users/${editedUserInfo.id}`, editedUserInfo)
            .then(res => {
                if (res.data === "Success") {
                    const updatedData = data.map(user => {
                        if (user.id === editedUserInfo.id) {
                            return editedUserInfo;
                        }
                        return user;
                    });
                    setData(updatedData);
                    setEditingUser(null);
                    setOpenEditModal(false);
                    toast.success("Usuário atualizado com sucesso!");
                } else {
                    toast.error("Ocorreu um erro ao tentar salvar as alterações. Por favor, tente novamente.");
                }
            })
            .catch(err => console.log(err));
    };    

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === "isAdmin") {
            if (value === "0" || value === "1" || value === "") {
                setEditedUserInfo(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                toast.error("O campo 'Admin' só pode aceitar valores '0', '1' ou vazio.");
            }
        } else {
            setEditedUserInfo(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    const handleDelete = (userId) => {
        setUserIdToDelete(userId);
        setOpenDeleteModal(true);
    };    

    const confirmDeleteUser = () => {
        axios.delete(`https://jogo-decisao-backend.onrender.com/admin/users/${userIdToDelete}`)
        //axios.delete(`http://localhost:3306/admin/users/${userIdToDelete}`)
            .then(res => {
                if (res.data === "Success") {
                    const updatedData = data.filter(user => user.id !== userIdToDelete);
                    setData(updatedData);
                    setOpenDeleteModal(false);
                    toast.success("Usuário excluído com sucesso!");
                } else {
                    toast.error("Ocorreu um erro ao tentar excluir o usuário. Por favor, tente novamente.");
                }
            })
            .catch(err => console.log(err));
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
                <h1>Gerenciar Usuários</h1>
                <p>Para a segurança de todos os usuários, as senhas estão cifradas.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin}</td>
                                <td><button className="edit-btn" onClick={() => handleEdit(user)}>Editar</button></td>
                                <td><button className="delete-btn" onClick={() => handleDelete(user.id)}>Deletar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Outlet />

                <Modal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Editar Usuário
                        </Typography>
                        <form onSubmit={handleSave}>
                            <div>
                                <label htmlFor="name">Nome:</label>
                                <input type="text" name="name" value={editedUserInfo.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" value={editedUserInfo.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="isAdmin">Admin:</label>
                                <input type="text" name="isAdmin" value={editedUserInfo.isAdmin} onChange={handleChange} />
                            </div>
                            <button type="submit">Salvar</button>
                        </form>
                    </Box>
                </Modal>

                <Modal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Confirmar exclusão de usuário
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tem certeza de que deseja excluir este usuário?
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
                            <Button onClick={confirmDeleteUser} variant="contained" color="error" style={{ marginLeft: '10px' }}>Excluir</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default UsersManage;