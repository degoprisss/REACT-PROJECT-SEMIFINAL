import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";

const LocationEncounters = () => {
    let { id } = useParams()
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
            const renderLocation = data.data.map((values) => (
                <p>{values.location_area.name}</p>
            ))
            setDataRender(renderLocation)
        }
    }, [data])

    return (
        <div>
            {/* <Link to={`${url}`}>en espera</Link> */}
            {dataRender && dataRender}
        </div>
    )
}

export default LocationEncounters