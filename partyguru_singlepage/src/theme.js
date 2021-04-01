import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette:{
        /*Primary color for material ui. Here made orange from SoG site
        See: 
        https://material-ui.com/customization/color/
        and: 
        https://material.io/resources/color/#!/?view.left=0&view.right=0
        */ 
        primary: {
            main: '#f1961d',
        },

        /*Secondary color. SoG purple here */
        secondary: {
            main: '#8f00e2',
        }
    },
    breakpoints: {
        values:{
            xs: 0,
            sm: 550,
            md: 1000,
            lg: 1400,
            xl: 1920,
        }
    },
});

export default theme;