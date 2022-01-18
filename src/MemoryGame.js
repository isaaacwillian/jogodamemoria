import React, { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver'
import game from './game/game'

export default function MemoryGame() {

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCardsFromTechs());
    }, [])

    function handleFlip(card) {
        console.log("oi")
        if (game.setCard(card.id)) {
            card.flipped = true;
            setCards([...cards]);
            if (game.secondCard) {
                if (game.checkMatch()) {
                    game.clearCards();
                    if (game.checkGameOver()) {
                        setGameOver(true);
                    }
                } else {
                    setTimeout(() => {
                        game.unflipCards();
                        setCards([...cards]);
                    }, 700);
                }
            }

        }
    }

    function restart() {
        setGameOver(false);
        game.clearCards();
        setCards(game.createCardsFromTechs());
    }

    return (
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} onRestart={restart}></GameOver>
        </div>
    )
}
