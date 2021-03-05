import axios from "axios";
import { useEffect, useState } from "react";
import {
    Link,
    useParams
} from "react-router-dom";

const LocationEncounters = () => {
    let { id, name } = useParams()
    const [encounters] = useState(id)
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
            <div class="containerGeneralDetails" style={{ padding: '10%' }}>
                <div class="ContainerDetails col-lg-10">
                    <div class="titles">
                        <h2 className='titleLocation'>Location del pokemon {name} </h2>
                        {dataRender && dataRender}
                    </div>
                    <div class="titles linkLocation">
                        <Link style={{ padding: '1%' }} className='btn btn-warning' to={`/pokedex/pokemon/${name}`}>Ir atras</Link>
                        <Link  style={{ padding: '1%', marginLeft: '2%'}} className='btn btn-warning' to='/'>Ir a el Listado</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationEncounters