import { PokeView } from "./PokeView";
import { useState, useEffect, useCallback } from "react"
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface PokeworkFromApi {
    id: number
    name: string
    types: { type: { name: string }}[]
    moves: { move: { name: string }}[]
    sprites: {
        front_default: string
    }
    height: number
    weight: number
    color: string   
}

interface Pokework {
    id: string
    name: string
    types: { type: { name: string }}[]
    moves: { move: { name: string }}[]
    img: string
    height: number
    weight: number
    color: string   

}

export const PokeController = () => {
    const [ pokeworks, setPokeworks ] = useState<Pokework[]>([])
    const [ offlineMessage, setOfflineMessage ] = useState<boolean>(false)
    const [ invalidMessage, setInvalidMessage ] = useState<boolean>(false)
    const [ pokemonId, setPokemonId ] = useState<string>('')

    const fetchPokework = useCallback(async () => {
        setOfflineMessage(false)
        setInvalidMessage(false)

        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const { data } = result
            const pokeList: PokeworkFromApi[] = [data]

            const pokework: Pokework[] = pokeList.map(poke => {
                const moves = poke.moves.slice(0, 4).map(move => ({
                    move: {
                        name: move.move.name
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join('-')
                    }
                }));

                const types = poke.types.map(type => ({
                    type: {
                        name: type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
                    }
                }));

                const capitalized_name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

                let gradient = '';
                    switch (poke.types.length > 0 ? poke.types[0].type.name : '') {
                        case 'fire':
                        gradient = 'radial-gradient(circle, #ffcc00, #ff6600)';
                        break;
                    case 'water':
                        gradient = 'radial-gradient(circle, #6699ff, #0033cc)';
                        break;
                    case 'grass':
                        gradient = 'radial-gradient(circle, #66cc33, #336600)';
                        break;
                    case 'electric':
                        gradient = 'radial-gradient(circle, #ffff66, #ffcc00)';
                        break;
                    case 'ice':
                        gradient = 'radial-gradient(circle, lightblue, lightcyan)';
                        break;
                    case 'fighting':
                        gradient = 'radial-gradient(circle, brown, saddlebrown)';
                        break;
                    case 'poison':
                        gradient = 'radial-gradient(circle, purple, darkslateblue)';
                        break;
                    case 'ground':
                        gradient = 'radial-gradient(circle, burlywood, sandybrown)';
                        break;
                    case 'flying':
                        gradient = 'radial-gradient(circle, skyblue, lightskyblue)';
                        break;
                    case 'psychic':
                        gradient = 'radial-gradient(circle, violet, mediumvioletred)';
                        break;
                    case 'bug':
                        gradient = 'radial-gradient(circle, greenyellow, darkolivegreen)';
                        break;
                    case 'rock':
                        gradient = 'radial-gradient(circle, gray, dimgray)';
                        break;
                    case 'ghost':
                        gradient = 'radial-gradient(circle, darkorchid, mediumorchid)';
                        break;
                    case 'dragon':
                        gradient = 'radial-gradient(circle, indigo, darkmagenta)';
                        break;
                    case 'dark':
                        gradient = 'radial-gradient(circle, darkslategray, dimgray)';
                        break;
                    case 'steel':
                        gradient = 'radial-gradient(circle, steelblue, lightskyblue)';
                        break;
                    case 'fairy':
                        gradient = 'radial-gradient(circle, pink, lightpink)';
                        break;
                    default:
                        gradient = 'radial-gradient(circle, #ffcc00, #ff6600)';
                }

                const convertedPokework: Pokework = {
                    id: `${poke.id}`,
                    name: capitalized_name,
                    types: types,
                    moves: moves,
                    img: poke.sprites.front_default,
                    height: poke.height,
                    weight: poke.weight,
                    color: gradient
                }

                return convertedPokework
            })

            setPokeworks(pokework)
        } catch (e) {
            const error = e as Error;
            
            if (error.message.includes('404')) {
                setInvalidMessage(true);
            }
            else {
                setOfflineMessage(true)
            }
            
            setPokeworks([])
        }
    }, [ pokemonId ])

    const handleSearch = () => {
        fetchPokework()
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setPokemonId(value)
    }

    //Keeping useEffect is triggering fetchPokework each time there is a change to the pokemonId input
    /*
    useEffect(() => {
        fetchPokework()
    })
    */

    return (
        <div style={{height: '100%'}}>
            <h1>Select a Pokémon!</h1>
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                placeholder="Enter Pokemon ID" 
                value={pokemonId} 
                onChange={handleInputChange} 
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br />
            <Button variant="contained" onClick={handleSearch} className="muiButton">Search</Button>
            {
                offlineMessage ? (<div>You are offline!</div>) : null
            }

            {
                invalidMessage ? (<div>Your Pokémon doesn't exists!</div>) : null
            }
            
            {
                pokeworks.map(poke => {
                    return(
                        <PokeView key={poke.id} {...poke}/>
                    )
                })
            }
        </div>
    )
}