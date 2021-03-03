import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";

const LocationEncounters = () => {
    let { id, name } = useParams()
    const [encounters, setEncounters] = useState(id)
    const [data, setData] = useState()
    const [dataRender, setDataRender] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${encounters}/encounters`)
            .then((dataApi) => {
                setData(dataApi)
            })

    }, [encounters])

    useEffect(() => {
        if (data) {
            const renderLocation = data.data.map((values, index) => (
                <span key={index}>{`${values.location_area.name}, `}</span>
            ))
            setDataRender(renderLocation)
        }
    }, [data])

    return (
        <div>
            <div style={{ padding: '2%' }}>
                {dataRender && dataRender}
            </div>
            <div style={{ paddingTop: '2%' }}>
                <Link to={`/pokedex/pokemon/${name}`}>Ir atras</Link>
                <Link to='/' style={{ padding: '2%' }}>Ir a el Listado</Link>
            </div>
        </div>
    )
}

export default LocationEncounters