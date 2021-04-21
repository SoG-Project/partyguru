import { React, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {Toolbar, AppBar, IconButton, Menu, MenuItem} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withRouter } from 'react-router-dom'
import { Theme } from '@fullcalendar/common';

const useStyles = makeStyles({
    headerLink:{
        fontSize: "2rem",
        color:"white",
    },
    menuElement: {
        padding: "2vh",
    },
    nobuttonjerk: {
        
    },
})

const Header = (props) => {
    //history is from withRouter. withRouter gives you access to props, which in turn contains, for example,
    //the history element. If you want to move to a different page, then it is done with history.push(url of page)
    const { history } = props
    const classes = useStyles();
    //anchorEl defines where the pop-up menu when clicking on a menu icon should open. null means that it
    //is not visible yet! Setting it to other than null will open the menu.
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    //history.push allows us to move to a set url. setAnchorEl(null) will hide the pop-up menu.
    const handleMenuClick = (url) => {
        history.push(url)
        setAnchorEl(null)
    }
    
    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Grid container 
                direction="row" 
                justify="space-between">
                    <Grid item>
                        <a href="/"> <img style={{width: "10%"}} src={'https://sog.gg/wp-content/uploads/2019/08/SOG_logo_black-01.png'} /> </a>
                    </Grid>

                    <Grid item className={classes.menuElement}>
                        <Link  underline="none" className={classes.headerLink} href="/cart">Cart</Link>
                    </Grid>

                    <Grid item className={classes.menuElement}>
                        <Link underline="none" className={classes.headerLink} href='/gurupage/'>Guru Page</Link>
                    </Grid>

                    <Grid item className={classes.menuElement}>
                        <Link underline="none" className={classes.headerLink} href="/login">Login</Link>
                    </Grid>
                    <Grid item xs={1} style={{marginTop: "0.5vh", marginLeft: "2vh"}}>
                        <IconButton 
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            <AccountCircle fontSize="large" />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem style={{width: "100%"}} onClick={() => handleMenuClick("/login")}>Login </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
//withRouter allows access to the history prop, which makes us able to move
//to the homepage with history.push.
export default withRouter(Header);