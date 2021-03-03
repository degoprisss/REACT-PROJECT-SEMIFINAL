import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DetailsPokemon from './DetailsPokemon.js'
import {
    Link,
    Switch,
    Route,
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
                <div key={index}>
                    <p>{`${value.stat.name}: ${value.base_stat}`} </p>
                </div>
            ))
            setRenderInfo(renderInfoArr)
        }
    }, [proof])

    return (
        <div>
            <Link to={`/pokedex/pokemon/${name}`}><h2>{name}</h2></Link>
            <img src={urlApi} alt={name} />
            {proof &&
                <p>Type: {proof.types.map((value) => (
                    `${value.type.name}. `
                ))}</p>
            }
            {renderInfo && renderInfo}
        </div>
    )
}

export default Pokemon;