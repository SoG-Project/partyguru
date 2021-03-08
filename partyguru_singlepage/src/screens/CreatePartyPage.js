import React from 'react';
import Product from '../components/Product';
import data from '../data';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";

const CreatePartyPage = () => {
    return(
        <div>
            <p>Here be Party Page Creation page</p>
             <Link to ="/invitetoparty">To invitation creation</Link> 
        </div>
    )
}

export default CreatePartyPage