import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
    palette:{
        primary: orange,
        secondary: purple,
    },
    status: {
        danger: 'red',
    },
});

export default theme;