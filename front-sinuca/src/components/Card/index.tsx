import { useState } from 'react';
import './styles.css'

type playerCard = {
    name: string;
    points: number;
    imageUrl: string;
}

export default function Card(props: playerCard){

  const [player, setPlayer] = useState(props);

    return(
    <>
    <div className="main-container">
      <div className="cards">
        <div className="card">
        <div className="multi-button"><button className="fa-solid fa-plus" onClick={() => setPlayer({...player, points: player.points + 1})}></button><button className="fa-solid fa-minus" onClick={() => setPlayer({...player, points: player.points - 1})}></button></div>
        <img className="card__image" src={player.imageUrl} alt=""/>
        <div className="card__footer">
          <h2 className="card__title">{ player.name }</h2>
          <h3 className="card__points">{ player.points }</h3>
        </div>
        </div>
      </div>
    </div>
    </>
)
}