import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const GuruPartyPackages = ({guruID}) =>{



    const [pPackages, setPPackages] = useState([])

    //array used to control the checked status of dynamically created checkboxes
    const [checked, setChecked] = useState([])
    const [checkEditMode, setCheckEditMode] = useState(true)


    useEffect(() => {

        axios.get('/api/packages').then(response => {
            setPPackages(response.data)

            const newCheckedArray = []
            response.data.map(pPackage => newCheckedArray.push(pPackage.guru.includes(guruID))
            )
            console.log(newCheckedArray)
            setChecked(newCheckedArray)

        })
        

    }, [guruID]);


    const handleChange = (id) => {

        const newCheckedArray = (checked.concat())
        newCheckedArray[id] = !checked[id]
        setChecked(newCheckedArray)
    }

    const handleClick =() =>{
        setCheckEditMode(!checkEditMode)
    }


    return (

        <div>
            {pPackages.map(pPackage =>
                <FormControlLabel key={pPackage._id}  control=
                    {<Checkbox onChange={() => handleChange(pPackage._id-1)} name={pPackage.name}
                               checked={checked[pPackage._id-1] || false}/>} label={pPackage.name} disabled={checkEditMode}/> )}
                               <button onClick={handleClick}>Edit</button>
        </div>
    )

}

export default GuruPartyPackages