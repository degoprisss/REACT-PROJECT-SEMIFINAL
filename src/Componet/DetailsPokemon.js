import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailsPokemon = () => {
    let { name } = useParams()
    const [nameState, setNameState] = useState(name)
    const [data, setData] = useState()
    const [enconunters, setEnconunters] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${nameState}/`)
            .then((dataApi) => {
                setData(dataApi.data)
            })
    }, [nameState])

    useEffect(() => {
        if (data) {
            setEnconunters(data.id)
        }
    }, [data])

    return (
        <div>
            <h2>{name}</h2>
            <Link to='/'>Ir a el Listado</Link>
            {enconunters &&
                <Link to={`/pokedex/pokemon/${enconunters}/encounters`}>Location Encounters</Link>
            }
        </div>

    )
}

export default DetailsPokemon;