import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Toolbar, AppBar} from '@material-ui/core';
import Link from '@material-ui/core/Link';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container 
                direction="row" 
                justify="space-between">
                    <Grid item>
                        <Link underline="none" className="brand" href="/">Party Guru</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className="brand" href="/cart">Cart</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className="brand" href='/gurupage/'>Guru Page</Link>
                    </Grid>

                    <Grid item>
                        <Link underline="none" className="brand" href="/login">Login</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
export default Header;