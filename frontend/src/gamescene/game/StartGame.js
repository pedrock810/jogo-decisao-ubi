import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable'; 
import './assets/StartGame.css';

function Pontuacao({ pontuacao }) {
    return (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}>
            <p>Pontuação: {pontuacao}</p>
        </div>
    );
}

const StartGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.userId;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [count, setCount] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    // eslint-disable-next-line
    const [elapsedTime, setElapsedTime] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bonusMessage, setBonusMessage] = useState('');

    const bonusMessages = [
        "Bônus de 5 pontos! Excelente!",
        "Uau! +5 pontos de bônus pela sua streak!",
        "Parabéns! Sua streak lhe rendeu +5 pontos extras!"
    ];

    const fetchQuestions = useCallback(async () => {
        try {
            const response = await axios.get('http://backend-9g9r71q23-pedros-projects-d6d01913.vercel.app/admin/perguntas');
            setQuestions(response.data);
            if (response.data[currentQuestionIndex]) {
                setRespostaCorreta(response.data[currentQuestionIndex].resposta_correta);
            } else {
                console.error('Índice da pergunta fora dos limites:', currentQuestionIndex);
                setCurrentQuestionIndex(0);
            }
        } catch (error) {
            console.error('Erro ao buscar perguntas:', error);
        }
    }, [currentQuestionIndex]);

    const fetchPontuacao = useCallback(async () => {
        try {
            const response = await axios.get('http://backend-9g9r71q23-pedros-projects-d6d01913.vercel.app/user/pontuacao', {  
                headers: {
                    userid: userId
                }
            });
            setPontuacao(response.data);
        } catch (error) {
            console.error('Error fetching pontuacao:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchQuestions();
        fetchPontuacao();
    }, [currentQuestionIndex, fetchQuestions, fetchPontuacao]);

    useEffect(() => {
        let timer = null;
        if (timerRunning) {
            timer = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerRunning]); 

    useEffect(() => {
        if (bonusMessage) {
            const timeout = setTimeout(() => {
                setBonusMessage('');
            }, 5000); 
            return () => clearTimeout(timeout);
        }
    }, [bonusMessage]);

    useEffect(() => {
        setElapsedTime(0);
    }, [currentQuestionIndex]);

    const handleSwipeLeft = () => {
        console.log('Esquerda');
        setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
        if (respostaCorreta === 'Não') {
            atualizarPontuacao();
            setStreak(prevStreak => prevStreak + 1);
            console.log('Streak:', streak + 1);
        } else {
            setStreak(0);
        }
        setTimerRunning(true);
        setCount(0);
        setTimeout(() => {
            const card = document.querySelector('.card');
            card.classList.add('rotate-left');
            setTimeout(() => {
                card.classList.remove('rotate-left');
                card.classList.add('return'); 
            }, 300); 
    }, 300); 
    };
    
    const handleSwipeRight = () => {
        console.log('Direita');
        setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
        if (respostaCorreta === 'Sim') {
            atualizarPontuacao();
            setStreak(prevStreak => prevStreak + 1);
            console.log('Streak:', streak + 1);
        } else {
            setStreak(0);
        }
        setTimerRunning(true);
        setCount(0);
        setTimeout(() => {
            const card = document.querySelector('.card');
            card.classList.add('rotate-right');
            setTimeout(() => {
                card.classList.remove('rotate-right');
                card.classList.add('return'); 
            }, 300); 
        }, 300); 
    };
    
    const atualizarPontuacao = async () => {
        try {
            let pontuacaoAtualizada = pontuacao;
            const perguntaAtual = questions[currentQuestionIndex];
            
            if (count <= 10) { 
                pontuacaoAtualizada += perguntaAtual.pontuacao;
                if (streak > 0 && streak % 5 === 0) {
                    pontuacaoAtualizada += 5; 
                    const randomMessage = bonusMessages[Math.floor(Math.random() * bonusMessages.length)];
                    setBonusMessage(randomMessage);
                }
            } else if (count <= 15) { 
                pontuacaoAtualizada += (perguntaAtual.pontuacao - 3);
                if (streak > 0 && streak % 5 === 0) {
                    pontuacaoAtualizada += 5; 
                    const randomMessage = bonusMessages[Math.floor(Math.random() * bonusMessages.length)];
                    setBonusMessage(randomMessage);
                }
            } else { 
                pontuacaoAtualizada += (perguntaAtual.pontuacao - 5);
                if (streak > 0 && streak % 5 === 0) {
                    pontuacaoAtualizada += 5; 
                    const randomMessage = bonusMessages[Math.floor(Math.random() * bonusMessages.length)];
                    setBonusMessage(randomMessage);
                }
            }
            
            const response = await axios.put('http://backend-9g9r71q23-pedros-projects-d6d01913.vercel.app/user/pontuacao', {
                userId: userId,
                pontuacao: pontuacaoAtualizada
            });
            setPontuacao(response.data);
        } catch (error) {
            console.error('Erro ao atualizar pontuação:', error);
        }
    };
    
    const handleExitGame = () => {
        navigate('/home');
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
    });

    return (
        <div {...handlers} style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pontuacao pontuacao={pontuacao} />
            <button className="exit-button" onClick={handleExitGame} style={{ position: 'absolute', top: '10px', left: '10px' }}>Sair do Jogo</button>
            {bonusMessage && (
                <div className="bonus-message" style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999', background: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    {bonusMessage}
                </div>
            )}
            <div className="card-container">
                {questions.length > 0 && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length && (
                    <TinderCard
                        className="swipe"
                        key={questions[currentQuestionIndex].id}
                        preventSwipe={['up', 'down']}
                        onCardLeftScreen={handleSwipeLeft}
                        onCardRightScreen={handleSwipeRight}
                    >
                        <div className="card">
                            <h2>{questions[currentQuestionIndex].pergunta}</h2>
                        </div>
                    </TinderCard>
                )}
                <div className="arrows">
                    <div className="arrow left" onClick={handleSwipeLeft}>{'<'}</div>
                    <div className="arrow right" onClick={handleSwipeRight}>{'>'}</div>
                </div>
            </div>
        </div>
    );
};

export default StartGame;