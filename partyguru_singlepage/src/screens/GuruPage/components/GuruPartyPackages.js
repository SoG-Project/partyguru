import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";


const GuruPartyPackages = ({guruID}) =>{



    const [pPackages, setPPackages] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [initialPackages, setInitialPackages] = useState([])



    useEffect(() => {

        axios.get('/api/packages').then(response => {

            //sorting the packages by ID using an inline compare function
            setPPackages(response.data.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
            )
        })
        

    }, [guruID]);


    const handleEditChange = () => {
        setEditMode(!editMode)
        console.log(pPackages)
    }


    // Change local state of checkboxes on click

    const handleChange = (id, isChecked) => {


        let tempPackages = pPackages.concat()

         if (isChecked === false) {

             tempPackages[id].guruid.push((guruID))
             setPPackages(tempPackages)
         }


        if (isChecked === true) {


            tempPackages[id].guruid.splice(tempPackages[id].guruid.indexOf((guruID)), 1)
            setPPackages(tempPackages)
        }
    }

    // Apply changes to party packages.
    const submitPackages = () => {

        pPackages.forEach(pPackage => {
                if (pPackage.guruid.includes((guruID))) axios.put('/api/packages/' + (pPackage._id) + '/gurus', {guruid: [guruID]}).then(response => {
                    console.log(response.data)
                    })
                if (!pPackage.guruid.includes((guruID))) axios.delete('/api/packages/' + (pPackage._id) + '/gurus', {data:{guruid: [guruID]}}).then(response => {
                    console.log(response.data)

                    })
            }
        )
        setEditMode(!editMode)
    }


    return (
        <div className="checkBoxes">
            <h2>Party packages you can host:</h2>
            <div className="guruFlexDiv">
            <ul>
            {pPackages && pPackages.map((pPackage, index) =>
                <li key={pPackage._id}><FormControlLabel  control=
                    {<Checkbox onChange={() => handleChange(index, pPackage.guruid.includes((guruID)))} name={pPackage.name} disabled={!editMode}
                               checked={pPackage.guruid.includes((guruID)) || false}/>} label={<span style={{fontSize: '2rem', fontWeight: 'bold'}}>{pPackage.name}</span>} /></li> )}
            </ul>
            </div>
            {editMode ? <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" className="flexAlignThis" onClick={submitPackages}>Save</Button>
                : <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" className="flexAlignThis" onClick={handleEditChange}>Edit</Button>}
        </div>
    )

}

export default GuruPartyPackages