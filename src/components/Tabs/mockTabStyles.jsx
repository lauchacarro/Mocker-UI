import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => createStyles({
    gridContainer: {
        textAlign: "center"
    },
    gridSandbox: {
        height: "50%"
    },
    hidden: {
        visibility: "hidden"
    },
    buttonCreate: {
        textAlign: "center",
        width: "100%",
    }
}));

export default useStyles;