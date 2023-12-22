import React, { useState } from 'react'

const Player = ({initialName, symbol,isActive}) => {
  const [playerName, setPlayerName]= useState(initialName);
  const[ isEditing, setIsEditing]= useState(false);
  
  function onSelect()
  {
    setIsEditing(isEditing=>!isEditing);
  }
  let editablePlayerName=<span className="player-name">{playerName}</span>;
  function handleChange(event)
  {
    setPlayerName(event.target.value);
  }
  
  
  return (
    
         
        <li className={isActive? 'active':undefined}>
        {isEditing?<input type="text" required value={playerName} onChange={handleChange}/>:<span className='player'>
          <span className="player-name">{playerName}</span>
          <span className="player-symbol">{symbol}</span>
          
        </span>}
        
        <button onClick={onSelect}>{isEditing?'Save':'Edit'}</button>
        </li>
        
   
  )
}

export default Player