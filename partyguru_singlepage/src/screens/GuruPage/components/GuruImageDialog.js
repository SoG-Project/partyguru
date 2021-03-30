import React, {useEffect, useState} from 'react'
import {makeStyles, TextField} from "@material-ui/core";
import {Dialog} from "@material-ui/core";
import {DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    dialogTitle: {
        alignSelf:"center"
    },
    dialogActions:{
        alignSelf: 'center'
    },

    previewPic: {

        padding:10,
        minWidth:150,
        maxWidth:300,
        minHeight:150,
        maxHeight:300,
        alignSelf:'center'

},


}));


const GuruImageDialog = (props) => {

    const classes = useStyles()


    return (
        <Dialog className={classes.dialog} maxWidth={'xs'} open={props.dialogOpen} onClose={props.handleClose}>

            <DialogTitle className={classes.dialogTitle}>{props.text}</DialogTitle>
                <TextField maxWidth value={props.newAddress || ''} label="url" onChange={props.handleChange}  variant="outlined" />
               <DialogContentText>preview</DialogContentText>
                <img className={classes.previewPic} src={props.newAddress} alt={"preview"}  />
            <DialogActions className={classes.dialogActions}>
                <button onClick={props.confirmChanges}>Save</button>
            </DialogActions>

        </Dialog>

    )




}


export default GuruImageDialog