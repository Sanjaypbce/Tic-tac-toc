import React,{useState} from 'react'

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const[playerName, setPlayerName] = useState(initialName)
    const [ isEditing,setisEditing] = useState(false);
    function handleEditclick(){
        setisEditing(editing =>!editing);
        if(isEditing){
          onChangeName(symbol, playerName)
        }

        
    }
    function handleChange(event){ 
        setPlayerName(event.target.value)
    }
    let editablePlayerName = <span className="player-name" >{playerName}</span> 
    // let btnCaption = "Edit"
    if(isEditing){
        editablePlayerName = <input type='text' value={playerName} required onChange={handleChange}/>
        // let btnCaption = "Edit" 
    }
  return (
    <li className={isActive ? "active" : undefined}>
    <span className="player">
        {editablePlayerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditclick}>{isEditing?"save":"Edit"}</button>
  </li>
  )
}

export default Player
