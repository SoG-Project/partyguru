import { React, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {Toolbar, AppBar, IconButton, Menu, MenuItem} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import LoginButton from "../screens/LandingPage/components/LoginButton";
import LogoutButton from "../screens/LandingPage/components/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles({
    headerLink:{
        fontSize: "2rem",
        color:"white",
    },
    menuElement: {
        padding: "2vh",
    },
    logo: {
        width: 60,
        marginTop: "1vh",
    },
    loginandoutbuttons: {
        maxHeight: "1vh",
        marginTop: "1vh",
    },
})

//props gives access to history, which is explained below.
const Header = (props) => {
    //history is from withRouter. withRouter gives you access to props, which in turn contains, for example,
    //the history element. If you want to move to a different page, then it is done with history.push(url of page)
    const { history } = props;
    const classes = useStyles();
    //anchorEl defines where the pop-up menu when clicking on a menu icon should open. null means that it
    //is not visible yet! Setting it to other than null will open the menu.
    const [anchorEl, setAnchorEl] = useState(null);
    //If the menu is open, then that means that anchorEl is true. Therefore, we can determine whether
    //the menu is open or not.
    const open = Boolean(anchorEl);

    //anchorEl is now applied to current event location, therefore visible.
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //history.push allows us to move to a set url. setAnchorEl(null) will hide the pop-up menu.
    const handleMenuClick = (url) => {
        history.push(url);
        setAnchorEl(null);
    };

    //AuthNav function decides should we render the login button or the logout button.
    //Since auth0 takes a sec to load, the login button might flash on the screen
    //even though you are logged in. This can be prevented by using a "isLoading"
    //variable extracted from useAuth0(). While isLoading is true, you could simply
    //display a loading icon instead of these buttons!
    const AuthNav = () => {
        const { isAuthenticated } = useAuth0();
    
        return(
          <div>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        );
      };
    
    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Grid container 
                direction="row" 
                justify="space-between">

                    <Grid item >    
                        <a href="/"> <img className={classes.logo} alt="Shool of Gaming logo" src={'https://sog.gg/wp-content/uploads/2019/08/SOG_logo_black-01.png'} /> </a>
                    </Grid>

                    <Grid item  className={classes.menuElement}>
                        <Link  underline="none" className={classes.headerLink} href="/cart">Cart</Link>
                    </Grid>

                    <Grid item className={classes.menuElement}>
                        <Link underline="none" className={classes.headerLink} href='/createnewguru/'>Create a Guru Profile</Link>
                    </Grid>

                    {/*<Grid item className={classes.menuElement}>
                        <Link underline="none" className={classes.headerLink} href="/login">Login</Link>
                    </Grid>*/}

                    <Grid item className={classes.loginandoutbuttons}>
                        <AuthNav />
                    </Grid>

                    <Grid item style={{marginTop: "0.5vh", marginLeft: "2vh"}}>
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
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={() => handleMenuClick("/login")}> Profile </MenuItem>
                            <MenuItem onClick={()=> handleMenuClick("/gurupage")}> Guru Page </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
//withRouter allows access to the history prop, which makes us able to move
//to the homepage with history.push.
export default withRouter(Header);