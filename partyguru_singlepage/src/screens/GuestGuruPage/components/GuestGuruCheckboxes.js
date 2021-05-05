import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";


const GuruGuestCheckBoxes = (props) =>{



    const [pPackages, setPPackages] = useState([])

    // An useeffect hook for getting the packages and sorting them
    useEffect(() => {

        axios.get('/api/packages').then(response => {
            //sorting the packages by ID using an inline compare function
            setPPackages(response.data.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
            )
        })


    }, [props.guruID]);


    return (
        <div>
            <h2>Party packages {props.guruName} hosts:</h2>
                <ul className="checkBoxes">
                    {pPackages && pPackages.map((pPackage, index) =>
                        <li key={pPackage._id}><FormControlLabel control={<Checkbox color="primary" name={pPackage.name} checked={pPackage.guruid.includes((props.guruID)) || false}/>}
                                                                  label={<span style={{fontSize: '2rem', fontWeight: 'bold'}}>{pPackage.name}</span>} /></li> )}
                </ul>
        </div>
    )

}

export default GuruGuestCheckBoxes