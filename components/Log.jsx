import React from 'react'

const Log = ({ turns }) => {
  return <ol id="log">
    {turns.map(turn => <li key={`${turn.square.reow}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>)}

  </ol>
}

export default Log
