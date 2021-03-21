import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const GuruPartyPackages = ({guruID}) =>{



    const [pPackages, setPPackages] = useState([])



    useEffect(() => {

        axios.get('/api/partypack').then(response => {

            //sorting the packages by ID using an inline compare function
            setPPackages(response.data.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
            )
        })
        

    }, [guruID, pPackages]);


    const handleChange = (id, isChecked) => {



         if (isChecked === false)
        axios.put('/api/partypack/' + parseInt(id) + '/gurus', {gurus: [parseInt(guruID)]}).then(response => {
            console.log('täs response:' + response.data)


            })

        if (isChecked === true)
            axios.delete('/api/partypack/' + parseInt(id) + '/gurus',{data: {gurus: [parseInt(guruID)]}}).then(response => {
                console.log('täs response:' + response.data)

            })


    }




    return (

        <div className="checkBoxes">
            <ul>
            {pPackages && pPackages.map(pPackage =>
                <li><FormControlLabel key={pPackage._id}  control=
                    {<Checkbox onChange={() => handleChange(pPackage._id, pPackage.guru.includes(parseInt(guruID)))} name={pPackage.name}
                               checked={pPackage.guru.includes(parseInt(guruID)) || false}/>} label={<span style={{fontSize: '2rem'}}>{pPackage.name}</span>} /></li> )}

            </ul>
        </div>
    )

}

export default GuruPartyPackages