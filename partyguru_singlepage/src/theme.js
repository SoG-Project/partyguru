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
            light: '#ffc753',
            main: '#f1961d',
            dark: '#b96800',
        },

        /*Secondary color. SoG purple here */
        secondary: {
            light: '#c64dff',
            main: '#8f00e2',
            dark: '#5800af',
        }
    },
});

export default theme;