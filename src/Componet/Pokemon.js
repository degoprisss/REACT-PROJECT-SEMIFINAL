import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
    Link,
} from "react-router-dom";


const Pokemon = ({ name, url, type }) => {
    const [urlApi, setUrlApi] = useState()
    const [dataApi, setDataApi] = useState()
    const [proof, setProof] = useState()
    const [renderInfo, setRenderInfo] = useState()
    const [dataResults, setDataResults] = useState()
    useEffect(() => {
        axios.get(url)
            .then((dataApi) => {
                setUrlApi(dataApi.data.sprites.front_shiny)
                setProof(dataApi.data)
                setDataResults(dataApi.data)
            })
    }, [])

    useEffect(() => {
        if (dataResults) {
            // console.log(dataResults)
        }
    }, [dataResults])

    useEffect(() => {
        if (proof) {
            console.log(proof)
            const renderInfoArr = proof.stats.map((value, index) => (
                // <div key={index}>
                <span key={index}>{`${value.stat.name}: ${value.base_stat}, `} </span>
                // </div>
            ))
            setRenderInfo(renderInfoArr)
        }
    }, [proof])

    return (
        <div>
           <div className="containerCardsGeneral">
                <div className="containerCards" style={{ width: '18rem' }}>
                    <div className="cardImagen">
                        <img src={urlApi} alt={name} />
                    </div>
                    <div className="cardBody">
                        <div className="CardsName">
                            <Link to={`/pokedex/pokemon/${name}`}><h2>{name}</h2></Link>
                        </div>
                        <div className="type">
                            {proof &&
                                <p>Type: {proof.types.map((value, index) => (
                                    <span key={index}>{value.type.name}</span>
                                ))}</p>
                            }
                            {renderInfo && renderInfo}
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;