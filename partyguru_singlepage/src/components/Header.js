import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Toolbar, AppBar} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    headerLink:{
        fontSize: "2rem",
        color:"white",
        
    }
})

const Header = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container 
                direction="row" 
                justify="space-between">
                    <Grid item>
                        <Link underline="none" className={classes.headerLink} href="/">Party Guru</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className={classes.headerLink} href="/cart">Cart</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className={classes.headerLink} href='/gurupage/'>Guru Page</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className={classes.headerLink} href="/login">Login</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
export default Header;