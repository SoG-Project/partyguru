import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const GuruPartyPackages = (props) =>{



    const [pPackages, setPPackages] = useState([])
    const [checked, setChecked] = useState([])


    useEffect(() => {
        axios.get('/api/packages').then(response => {
            setPPackages(response.data)
        })

        pPackages.map(pPackage =>
        console.log(pPackage.guru))
    }, [props]);



    return (
        <div>
            {pPackages.map(pPackage =>
                <FormControlLabel key={pPackage._id} control={<Checkbox name={pPackage.name}/>} label={pPackage.name}/> )}
        </div>
    )

}

export default GuruPartyPackages