import {
    cyan500,
    cyan700,
    cyan900,
    brown700,
    grey400,
    grey600,
    grey900,
    blueGrey400,
    // darkBlack,
    // white,
    // grey300,
    // fullBlack,
    fullWhite
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator'


const theme = {
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: cyan900,
        accent1Color: grey400,
        accent2Color: grey600,
        accent3Color: grey900,
        textColor: fullWhite,
        secondaryTextColor: fade(fullWhite, 0.7),
        alternateTextColor: brown700,
        canvasColor: blueGrey400,
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade(fullWhite, 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
    appBar: {
        height: 50,
    },
};

export default theme;
