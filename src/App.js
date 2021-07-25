import React, { useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choices = [
  { id: 1, name: 'rock', icon: Rock, losesTo: 2 },
  { id: 2, name: 'paper', icon: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', icon: Scissors, losesTo: 1 },
]

export default function App() {

  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [gameState, setGameState] = useState(null) // win, lose, draw

  useEffect(() => {
    // computer random choice state
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    // console.log(randomChoice)
    setComputerChoice(randomChoice)
  }, [])

  function restartGame() {
    // reset computer random choice state
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)

    // reset game and userChoice state
    setGameState(null)
    setUserChoice(null)
  }

  function cheater() {
    return alert(`Don't cheat!`)
  }

  function handleUserChoice(choiceId) {
    // set userChoice state to clicked ID choices array
    const userPick = choices.find(c => c.id === choiceId)
    console.log(userPick)
    setUserChoice(userPick)

    // check for win, lose or draw state, compare choices.id with choices.losesTo 
    setGameState(() => {
      if (userPick.losesTo == computerChoice.id) {
        //lose
        setLosses(losses => losses + 1)
        setGameState('lose')
      } else if (computerChoice.losesTo == userPick.id) {
        //win
        setWins(wins => wins + 1)
        setGameState('win')
      } else if (computerChoice.id === userPick.id) {
        //draw
        setGameState('draw')
      }
    })
  }

  // get name of icon from choices array and pull Component from import
  function renderComponent(choice) {
    const Component = choice.icon // Paper, Rock, Scissors
    // console.log(Component)
    return <Component />
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock Paper Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? "Win" : "Wins"}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? "Loss" : "Losses"}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {/* if gameState exist, show overlay, i not, do now show overlay */}
      {gameState && (
        <div className={`game-state ${gameState}`} onClick={() => restartGame()}>
          <div >
            <div className="game-state-content" onClick={() => restartGame()}>
              <p>{renderComponent(userChoice)}</p>
              {/* three different options to show, depends of gameState */}
              {gameState === 'win' && <p>Congrats! You Won!</p>}
              {gameState === 'lose' && <p>Sorry! You Lost!</p>}
              {gameState === 'draw' && <p>It's a Draw!</p>}
              <p>{renderComponent(computerChoice)}</p>
            </div>
            {/* restart button, calls for restartGame func */}
            <button onClick={() => restartGame()}>Play Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button
            className="rock"
            // onClick pass the ID to handleUserChoice func
            onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button
            className="paper"
            onClick={() => handleUserChoice(2)} >
            <Paper />
          </button>
          <button
            className="scissors"
            onClick={() => handleUserChoice(3)} >
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice" onClick={() => cheater()}>?</button>
        </div>
      </div>
    </div>
  );
}
