import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import {
  fade,
  darken,
  lighten
} from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.teal500,
    primary2Color: colors.teal800,
    primary3Color: colors.orange900,
    textColor: colors.darkBlack,
  },
});

export default muiTheme;
