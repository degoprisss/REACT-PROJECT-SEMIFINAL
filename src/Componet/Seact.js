import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Seact = ({ handleSeact, handleSeactSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searcSelect, setSearSelect] = useState();
    const [select, setSelect] = useState();
    const [saveSelect, setSaveSelect] = useState();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then((dataSelect) => {
                setSearSelect(dataSelect.data.results)
            })
    }, [])

    // const onSubmit = (data) => {
    //     console.log(data);
    //     // setNewTaks(data)
    // }

    useEffect(() => {
        if (searcSelect) {
            const renderSelect = searcSelect.map((value) => (
                <option key={value.name}>{value.name}</option>
            ))

            setSelect(renderSelect)
        }
    }, [searcSelect])

    const handleChange = (data) => {
        // console.log(data.target.value);
        setSaveSelect(data.target.value)
        console.log(saveSelect)
    }

    const handleSubmit = (data) => {
        console.log(saveSelect.value);
        data.preventDefault();
    }


    return (
        <div>
            <div>
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={() => handleSeact(searchTerm)} >Seact</button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <select name="" id="" onChange={handleChange}>
                            {select}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Seact;