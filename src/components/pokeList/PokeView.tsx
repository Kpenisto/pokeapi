import React from "react"
import "./pokeCSS.css";

interface PokeProps {
    id: string
    name: string
    types: { type: { name: string }}[]
    moves: { move: { name: string }}[]
    img: string
    height: number
    weight: number
    color: string   

}

export const PokeView = ({
    name,
    types,
    moves,
    img,
    height,
    weight,
    color   
}: PokeProps) => {
    //No Logic

    return (
        <div className="pokemon-card" style={{background: color}}>
            <div className="pokemon-name">
                {name}
            </div>
            <div className="pokemon-profile">
                <img src={img} alt='' className="pokemon-image"/>
            </div>
            <div className="pokemon-info">Length: {height}", Weight: {weight} lbs.</div>
            <div className="pokemon-moves">
                <ul className="move-list">
                    {moves.map((move, index) => (
                        <li key={index} className="move">{move.move.name}</li>
                    ))}
                </ul>
            </div>
            <div className="pokemon-types">
                Type(s): 
                <ul className="type-list">
                    {types.map((type, index) => (
                        <li key={index} className="type">
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}