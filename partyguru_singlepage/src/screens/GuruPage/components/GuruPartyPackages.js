import React, {useState, useEffect} from 'react'
import axios from "axios";


const GuruPartyPackages = (props) =>{


    const [packages, setPackages] = useState({})

    useEffect(() => {


        let id=5;
        axios.get(`/api/packages/${id}`).then(response => {
            setPackages(response.data)
        })

        /* props.packages && props.packages.map(pPackage =>
            axios.get(`/api/packages/${pPackage}`).then(response => {
                console.log(response.data)
            })) */
        

    }, [props]);



    return (
        <div>

            {packages.products && packages.products.map(pPackage => <div> {pPackage.name} </div> )}
        </div>
    )

}

export default GuruPartyPackages