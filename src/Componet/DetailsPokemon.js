import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailsPokemon = () => {
    let { name } = useParams()
    const [nameState, setNameState] = useState(name)
    const [data, setData] = useState()
    const [enconunters, setEnconunters] = useState()
    const [dataRender, setRenderInfo] = useState()
    const [renderMoveState, setRenderMoveState] = useState()
    const [renderAbilities, setRenderAbilities] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${nameState}/`)
            .then((dataApi) => {
                setData(dataApi.data)
            })
    }, [nameState])

    useEffect(() => {
        if (data) {
            console.log(data)
            setEnconunters(data.id)
            const renderInfoArr = data.stats.map((value, index) => (
                <div key={index}>
                    <p>{`${value.stat.name}: ${value.base_stat}`} </p>
                </div>
            ))
            const renderMove = data.moves.map((value) => (
                <span>{`${value.move.name},  `} </span>
            ))

            const abilities = data.abilities.map((value) => (
                // <div style={{display: 'flex'}}>
                    <span>{`${value.ability.name}, `}</span>
                // </div>
            ))

            setRenderAbilities(abilities)
            setRenderMoveState(renderMove)
            setRenderInfo(renderInfoArr)
        }
    }, [data])

    return (
        <div>
            <h2>{name}</h2>
            <div>
                {data && (
                    <div>
                        <img src={data.sprites.front_shiny} alt={name} />
                        <h2>Info General</h2>
                        {dataRender}
                        <p>Peso: {data.weight} hectogramos</p>
                        <h2>Order</h2>
                        <p>Order: {data.order} </p>
                        <h2>Move</h2>
                        {renderMoveState}
                        <h2>Abilities</h2>
                        {renderAbilities}
                    </div>)}
            </div>
            <Link to='/' style={{ padding: '2%' }}>Ir a el Listado</Link>
            {enconunters &&
                <Link to={`/pokedex/pokemon/${enconunters}/encounters/${name}`}>Location Encounters</Link>
            }
        </div>

    )
}

export default DetailsPokemon;