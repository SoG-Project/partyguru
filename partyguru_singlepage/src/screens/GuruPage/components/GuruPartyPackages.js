import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const GuruPartyPackages = ({guruID}) =>{



    const [pPackages, setPPackages] = useState([])

    //array used to control the checked status of dynamically created checkboxes
    const [checked, setChecked] = useState([])


    useEffect(() => {

        axios.get('/api/partypack').then(response => {
            setPPackages(response.data)

            const newCheckedArray = []
            response.data.map(pPackage => newCheckedArray.push(pPackage.guru.includes(parseInt(guruID)))
            )
            console.log("check em" + newCheckedArray)
            setChecked(newCheckedArray)

        })
        

    }, [guruID]);


    const handleChange = (id) => {

        const newCheckedArray = (checked.concat())


        /* if (checked[id-1] === false)
        axios.put('/api/partypack/' + parseInt(id) + '/gurus', {gurus: [parseInt(guruID)]}).then(response => {
            console.log('täs response' + response.data)


             })

        if (checked[id-1] === true)
            axios.delete('/api/partypack/' + parseInt(id) + '/gurus', {gurus: [parseInt(guruID)]}).then(response => {
                console.log('täs response' + response.data)
n
            }) */

        newCheckedArray[id-1] = !checked[id-1]
        setChecked(newCheckedArray)

    }




    return (

        <div>
            {pPackages.map(pPackage =>
                <FormControlLabel key={pPackage._id}  control=
                    {<Checkbox onChange={() => handleChange(pPackage._id)} name={pPackage.name}
                               checked={checked[pPackage._id-1] || false}/>} label={pPackage.name} /> )}
        </div>
    )

}

export default GuruPartyPackages