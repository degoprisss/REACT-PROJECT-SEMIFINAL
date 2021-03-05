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
                <span key={index}>{`${value.stat.name}: ${value.base_stat}`} </span>
            ))
            const renderMove = data.moves.map((value, index) => (
                <span key={index}>{`${value.move.name},  `} </span>
            ))

            const abilities = data.abilities.map((value, index) => (
                <span key={index}>{`${value.ability.name}, `}</span>
            ))

            setRenderAbilities(abilities)
            setRenderMoveState(renderMove)
            setRenderInfo(renderInfoArr)
        }
    }, [data])

    return (
        <div>
            <div className="containerGeneralDetails">
                <div className="ContainerDetails col-lg-10">
                    <h2 className="titles">{name}</h2>
                    {data && (
                        <div>
                            <div className="titles">
                                <img src={data.sprites.front_shiny} alt={name} />
                            </div>
                            <div className="containerInfoGeneral titles">
                                <h2 className="titles">Info General</h2>
                                {dataRender}
                            </div>
                            <div className='titles'>
                                <h2>Peso</h2>
                                <p>{data.weight} hectogramos</p>
                            </div>
                            <div className="titles">
                                <h2>Order</h2>
                                <p>{data.order}</p>
                            </div>

                            <div className="titles">
                                <h2>Move</h2>
                                {renderMoveState}
                            </div>
                            <div className="titles">
                                <h2>Abilities</h2>
                                {renderAbilities}
                            </div>
                            <div className="titles link">
                                <Link to='/' style={{ padding: '2%' }} className='btn btn-warning'>Ir a el Listado</Link>
                                {enconunters &&
                                    <Link to={`/pokedex/pokemon/${enconunters}/encounters/${name}`} 
                                    style={{ padding: '2%', marginLeft: '2%'}} className='btn btn-warning'>Location Encounters</Link>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default DetailsPokemon;