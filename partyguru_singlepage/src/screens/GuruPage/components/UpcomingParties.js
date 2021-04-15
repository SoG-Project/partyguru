import React, {useEffect, useState} from 'react'
import axios from "axios";
import {DataGrid} from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";


// Styling for togglebutton color when selected
const UpcomingParties = (props) => {

    const [parties, setParties] = useState([])
    const [nameArray, setNameArray] = useState([])
    const [rows, setRows] = useState([])


    // Setting up the columns for the Data Grid
    const columns = [
        { field: 'date', headerName: 'Date and time', width: 250 },
        { field: 'pPackage', headerName: 'Package', width: 150 },
        { field: 'guestAmount', headerName: '# of guests', width: 150 },
        { field: 'ppLink', headerName: 'Party Page', width: 150,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={()=>console.log(params.value)}
                    >
                        Open
                    </Button>
                </strong>
            ),  },
    ]

    useEffect(() => {

        axios.get('/api/parties').then(response => {
           setParties(response.data.filter(party => party.guruid === props.guruID))

        })
    }, [props.guruID]);


    // Hook that gets the names of the party packages based on id
    useEffect(() => {

        let namedParties = []
        parties.map((party, index) =>
            axios.get(`/api/packages/${party.packageid}`).then(response => {
                namedParties = namedParties.concat(response.data.name)
                console.log(namedParties)
                 setNameArray(namedParties)
            })
        )

    }, [parties]);



    // Hook to fill the data grid with party details
    useEffect(() => {
        const newParties = []
        parties.forEach((party, index) => {
                newParties.push({id: index, date: new Date(party.datetime).toString().split('(')[0], pPackage:
                        (nameArray[index]), guestAmount: party.num_attendees, ppLink: ("Clicky click" + index)
                })

            if (index===parties.length-1)
                setRows(newParties)
        }
    )

    }, [nameArray, parties]);



    return (
        <div className="upcomingParties">
            <h2>Your upcoming parties:</h2>
            <div style={{height:400, width: '80%', backgroundColor:"#F0FFFF"}}>
            <DataGrid rows={rows} columns={columns} />
            </div>

        </div>
    )

}



export default UpcomingParties