import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const GuruPartyPackages = ({guruID}) =>{



    const [pPackages, setPPackages] = useState([])
    const [editMode, setEditMode] = useState(false)



    useEffect(() => {

        axios.get('/api/packages').then(response => {


            //sorting the packages by ID using an inline compare function
            console.log("gurupaketit", response.data)
            setPPackages(response.data.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
            )
        })
        

    }, [guruID]);


    const handleEditChange = () => {
        setEditMode(!editMode)
        console.log(pPackages)
    }


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

    const submitPackages = () => {

        pPackages.map(pPackage => {
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
            <div className="buttonGrid">
            <ul>
            {pPackages && pPackages.map((pPackage, index) =>
                <li><FormControlLabel key={pPackage._id}  control=
                    {<Checkbox onChange={() => handleChange(index, pPackage.guruid.includes((guruID)))} name={pPackage.name} disabled={!editMode}
                               checked={pPackage.guruid.includes((guruID)) || false}/>} label={<span style={{fontSize: '2rem'}}>{pPackage.name}</span>} /></li> )}
            </ul>
            </div>

            {editMode ? <button className="flexAlignThis" onClick={submitPackages}>Save</button> : <button className="flexAlignThis" onClick={handleEditChange}>Edit</button>}
        </div>
    )

}

export default GuruPartyPackages