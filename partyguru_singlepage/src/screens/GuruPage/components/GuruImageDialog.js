import {makeStyles, TextField} from "@material-ui/core";
import {Dialog} from "@material-ui/core";
import {DialogTitle, DialogContentText, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

const useStyles = makeStyles((theme) => ({

    dialogTitle: {
        alignSelf:"center"
    },
    dialogActions:{
        alignSelf: 'center'
    },


    TextField: {
        marginRight:10,
        marginLeft:10,

    },


}));


const GuruImageDialog = (props) => {

    const classes = useStyles()


    return (

        <Dialog className={classes.dialog} open={props.dialogOpen} onClose={props.handleClose}>
            <DialogTitle className={classes.dialogTitle}>{props.text}</DialogTitle>
                <TextField className={classes.TextField} value={props.newAddress || ''} label="url" onChange={props.handleChange}  variant="outlined" />
                <DialogContentText>preview</DialogContentText>
                <img className="profilePic" src={props.newAddress} alt={"preview"}  />
                <DialogActions className={classes.dialogActions}>

                <Button style={{minWidth: "80px", minHeight: "30px"}} variant="contained" color="primary" onClick={props.confirmChanges}>Save</Button>
                    <Button style={{minWidth: "80px", minHeight: "30px",}} variant="contained" color="primary" onClick={props.handleClose}>Cancel</Button>

                </DialogActions>

        </Dialog>

    )




}


export default GuruImageDialog